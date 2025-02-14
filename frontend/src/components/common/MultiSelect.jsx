import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import React from 'react'
import Select from 'react-select'
import { Field } from 'formik'
import ValidationErrorMessage from './ValidationErrorMessage'

export default function MultiSelect({
    name,
    className,
    options,
    label,
    validate,
    help,
    optional,
    optionValue = 'value',
    optionLabel = 'label',
    ...attributes
}) {
    return (
        <div className="field">
            <div className="control">
                {label ? (
                    <label htmlFor={name}>
                        {label} &nbsp;
                        {optional ? <span className="form-hint">не обязательно</span> : null}

                        {help ? (
                            <p className={cn(css(styles.help), 'help has-text-grey-light')}>{help}</p>
                        ) : null}
                    </label>
                ) : null}

                <Field name={name} validate={validate}>
                    {({ form, field }) => (
                        <Select
                            styles={{
                                menu:(base) => ({
                                    ...base,
                                    zIndex:10
                                })
                            }}
                            isMulti
                            className={className}
                            onBlur={form.setFieldTouched}
                            value={field.value}
                            options={options}
                            getOptionValue={(opt => opt[optionValue])}
                            getOptionLabel={(opt => opt[optionLabel])}
                            {...attributes}
                            onChange={(values) => {
                                form.setFieldValue(name, values)
                            }}
                        />
                    )}
                </Field>

                <ValidationErrorMessage name={name} />
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    help: {
        marginTop: '-2px',
    },
})
