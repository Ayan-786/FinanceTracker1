import React, { Fragment } from 'react'

function ErrorItem({ field, error }) {
    if (field === 'nonFieldErrors' || field === 'detail') {
        return <li><strong>{error}</strong></li>
    }

    return (
        <li>
            {error}
        </li>
    )
}

export default function ServerErrorCustom({ error }) {
    if (!error || !error.data) return <Fragment />

    return (
        <div className="message is-danger">
            <div className="message-body">
                <ul>
                    {typeof error.data === 'string' ? (
                        <ErrorItem field="detail" error="Неизвестная ошибка" />
                    ) : Object.keys(error.data).map((key) => (
                        <ErrorItem key={key} field={key} error={error.data[key]} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
