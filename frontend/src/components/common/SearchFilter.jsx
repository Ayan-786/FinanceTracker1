import React, { useCallback, useEffect, useRef } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { useQueryParams } from '../../hooks/queryString'

export default function SearchFilter({ name = 'search', pageKey = 'page', ...attributes }) {
    const history = useHistory()
    const queryParams = useQueryParams()
    const defaultValue = queryParams[name] || ''
    const inputRef = useRef(null)

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus()
    //     }
    // }, [])

    const debouncedFunction = debounce((value) => {
        const newParams = { ...queryParams }
        if (value.trim() !== '') {
            newParams[name] = value.trim()
        } else {
            delete newParams[name]
        }
        const queryStringified = queryString.stringify({ ...newParams, [pageKey]: 1 })
        history.push(`?${queryStringified}`)
    }, 500)

    const onChange = useCallback((({ target: { value } }) => {
        debouncedFunction(value)
    }), [debouncedFunction])

    return (
        <div style={{flex:'auto'}}
            className="control has-icons-left is-expanded"
        >
            <input
                ref={inputRef}
                type="search"
                defaultValue={defaultValue}
                onChange={onChange}
                className={cn('input')}
                placeholder="Поиск..."
                {...attributes}
            />
            <span className="icon is-small is-left">
                <i className="icon ion-md-search" />
            </span>
        </div>
    )
}
