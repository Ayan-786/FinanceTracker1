import React from 'react';
import { ErrorMessage } from 'formik';

export default function ValidationErrorMessage({ name, ...attributes }) {
    return (
        <ErrorMessage
            name={name}
            {...attributes}
            render={(msg) => (
                <div style={{ color: 'red', marginTop: 5 }} className="">
                    {msg}
                </div>
            )}
        />
    );
}
