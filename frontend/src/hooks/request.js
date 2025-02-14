import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { auth, signOut } from '../utils/auth';
import baseAxios from '../utils/request';

import { useMessage } from './message';

export function usePostRequest(options = {}) {
    return useRequest({ method: 'POST', ...options });
}

export function usePutRequest(options = {}) {
    return useRequest({ method: 'PUT', ...options });
}

export function usePatchRequest(options = {}) {
    return useRequest({ method: 'PATCH', ...options });
}

export function useGetRequest(options = {}) {
    return useRequest({ method: 'GET', ...options });
}

export function useDeleteRequest(options = {}) {
    return useRequest({ method: 'DELETE', ...options });
}

export function useRequest(options = {}) {
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [showMessage] = useMessage();

    const navigate = useNavigate();

    async function request(overrideOptions = {}, sync = false) {
        setLoading(true);

        try {
            const { data } = await baseAxios({
                ...auth(),
                ...options,
                ...overrideOptions,
            });
            if (!sync) setResponse(data);
            return { response: data, success: true };
        } catch (e) {
            setError(e.response);
            if (e.response === undefined) {
                showMessage('Проверьте интернет соединение', 'is-danger');
            } else if (e.response.status >= 500) {
                showMessage('Ошибка сервера.', 'is-danger');
            } else if (e.response.status === 401) {
                signOut(navigate);
            }

            return { error: e.response, success: false };
        } finally {
            if (!sync) setLoading(false);
        }
    }

    return {
        loading,
        request,
        error,
        response,
        setResponse,
        setError,
        setLoading,
    };
}

export function useLoad(options, dependencies = []) {
    const request = useRequest({ method: 'GET', ...options });

    useEffect(() => {
        request.request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return request;
}

export function useInfiniteScroll(options, dependencies = []) {
    const [page, setPage] = useState(1);
    const items = useGetRequest({
        ...options,
        params: { ...options.params, page },
    });
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();

    useEffect(() => {
        loadItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, ...dependencies]);

    async function loadItems() {
        const { response } = await items.request();
        const oldItems = items.response ? items.response.results : [];
        const newItems = response ? response.results : [];

        if (!response) return;

        items.setResponse({
            count: response ? response.count : 0,
            results: uniqBy([...oldItems, ...newItems], 'id'),
        });
        setHasMore(oldItems.length + newItems.length !== response.count);
    }

    function reset() {
        items.setResponse({ count: 0, results: [] });
        setPage(1);
    }

    async function reload() {
        reset();
        await items.request({ params: { ...options.params, page: 1 } });
    }

    const ref = useCallback(
        (node) => {
            if (items.loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(page + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore, items.loading, page]
    );

    return {
        ref,
        ...items,
        hasMore,
        reload,
        reset,
    };
}

export function useInfiniteScroll2(options, dependencies = []) {
    const [page, setPage] = useState(1);
    const items = useGetRequest({
        ...options,
        params: { ...options.params, page },
    });
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();
    const isMountingRef = useRef(true);

    useEffect(() => {
        if (isMountingRef.current) {
            isMountingRef.current = false;
        } else {
            reload();
        }
    }, dependencies);

    useEffect(() => {
        loadItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const loadItems = async () => {
        const { response } = await items.request();
        const oldItems = items.response?.results || [];
        const newItems = response?.results || [];

        if (response) {
            items.setResponse({
                count: response?.count,
                results: uniqBy([...oldItems, ...newItems], 'id'),
            });
            setHasMore(oldItems.length + newItems.length < response.count);
        }
    };

    const reset = () => {
        items.setResponse({ count: 0, results: [] });
        setPage(1);
    };

    const reload = async () => {
        reset();
        await items.request({ params: { ...options.params, page: 1 } });
    };

    const ref = useCallback(
        (node) => {
            if (items.loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);

            return () => {
                if (observer.current) observer.current.disconnect();
            };
        },
        [hasMore, items.loading]
    );

    return {
        ref,
        ...items,
        hasMore,
        reload,
        reset,
    };
}
