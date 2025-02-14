import React from 'react'
import { Field } from 'formik'

export default function Checkbox({
    name,
    className,
    label,
    optional = false,
    validate,
    id = null,
    ...attributes
}) {
    return (
        <div className="mb-3">
            <Field
                type="checkbox"
                name={name}
                className={className}
                validate={validate}
                {...attributes}
                id={id || name} /> &nbsp;

            {label ? (
                <label htmlFor={id || name}>
                    {label} &nbsp;
                    {optional ? <span className="form-hint">не обязательно</span> : null}
                </label>
            ) : null}
        </div>
    )
}
