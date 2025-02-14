import React, { createContext, useContext } from 'react'
import { Field } from 'formik'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import ValidationErrorMessage from './ValidationErrorMessage'

const Context = createContext()

export function Radio({ label = '', value, style }) {
    const { name } = useContext(Context)

    return (
        <label className="radio" style={style}>
            <Field type="radio" name={name} value={value} className={css(styles.input)} />
            {label}
        </label>
    )
}


export function RadioGroup({ name, children, style }) {
    return (
        <div style={style} className={cn('control', css(styles.group))}>
            <Context.Provider value={{ name }}>
                {children}
            </Context.Provider>

            <ValidationErrorMessage name={name} />
        </div>
    )
}

const styles = StyleSheet.create({
    input: {
        marginRight: '0.3rem',
    },
    group: {
        marginBottom: '1rem',
    },
})
