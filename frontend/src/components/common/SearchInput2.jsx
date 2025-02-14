import React, { useCallback } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'

export default function SearchInput2({ name = 'search', pageKey = 'page', setSearchParams, searchParams, ...attributes }) {
    const defaultValue = searchParams?.[name] || ''

    const debouncedSearch = debounce((search) => {
        setSearchParams((prev) => ({ ...prev, [name]: search || undefined, [pageKey]: undefined }))
    }, 500)
    const onChange = useCallback((({ target: { value } }) => {
        debouncedSearch(value)
    }), [debouncedSearch])

    return (
            <input
                type="search"
                defaultValue={defaultValue}
                onChange={onChange}
                className={cn('input')}
                placeholder="Поиск..."
                {...attributes}
            />
    )
}
