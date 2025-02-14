import React, { useCallback } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { useQueryParams } from '../../hooks/queryString'

export default function SearchInput({ name = 'search', pageKey = 'page', ...attributes }) {
    const history = useHistory()
    const queryParams = useQueryParams()
    const defaultValue = queryParams[name] || ''

    const debouncedFunction = debounce((value) => {
        const newParams = { ...queryParams }
        if (value.trim() !== '') {
            newParams[name] = value.trim()
        } else {
            delete newParams[name]
        }
        const queryStringified = queryString.stringify({ ...newParams, [pageKey]: undefined })
        history.push(`?${queryStringified}`)
    }, 500)

    const onChange = useCallback((({ target: { value } }) => {
        debouncedFunction(value)
    }), [debouncedFunction])

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
