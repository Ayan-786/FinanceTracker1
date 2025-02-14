import React, { useEffect } from 'react'
import cn from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import {useHistory} from 'react-router-dom'
import { useQueryParams } from '../../hooks/queryString'
import  queryString from 'query-string'

export default function DateFilter({ name = '', isClearable = true, className = '', defaultValue,  ...props } ) {
    const history = useHistory()
    const params = useQueryParams()
    const val = params[name] || defaultValue || ''
    function onChange(e) {
        const { value } = e.target
        history.push(`?${queryString.stringify({ ...params, [name]: value })}`)
    }

    return (
        <div className={css(styles.inputDiv)} >
            <input
                type="date"
                defaultValue={val}
                onChange={onChange}
                className={cn("input", isClearable && val &&  css(styles.input))}
                {...props}
            />
            {isClearable && val && <i onClick={() => {
                history.push(`?${queryString.stringify({ ...params, [name]: undefined })}`)
            }} className="icon ion-md-close"></i>}
        </div>
    )
}

const styles = StyleSheet.create({
    inputDiv: {
        position:'relative',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',

        ":nth-child(1n) .icon":{
            position:'absolute',
            right:10,
            cursor:'pointer'
        }
    },
    input: {
        paddingRight: '40px'
    },
    
})
