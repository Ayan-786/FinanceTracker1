import React, { useEffect } from 'react'
import Select from 'react-select'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useQueryParams } from '../../hooks/queryString'

export default function FilterSelect({
    name,
    options = [],
    pageKey = 'page',
    optionValueKey = 'id',
    optionLabelKey = 'name',
    ...props
}) {
    const history = useHistory()
    const params = useQueryParams()
    const currentVal = options.find((opt) => String(opt[optionValueKey]) === params[name])

    const handleChange = (newVal) => {
        history.push(`?${queryString.stringify({ ...params, [name]: newVal?.[optionValueKey], [pageKey]: undefined })}`)
    }

    return (
        <Select
            value={currentVal}
            onChange={handleChange}
            options={options}
            getOptionValue={(opt) => opt[optionValueKey]}
            getOptionLabel={(opt) => opt[optionLabelKey]}
            isClearable
            styles={{
                container: (base) => ({
                    ...base,
                    minWidth: '12rem',
                }),
                control: (base) => ({
                    ...base,
                    height: '40px',
                    }),
                placeholder: (base) => ({
                    ...base,
                    whiteSpace:'nowrap',
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display:'none'
                }),
                menu: (base) => ({
                    ...base,
                    zIndex:10,
                }) 
            }}
            {...props}
            isMulti={false}
        />
    )
}
