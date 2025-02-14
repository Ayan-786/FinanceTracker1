import React from 'react'
import { useDeleteRequest } from '../../hooks/request'
import Button from './Button'
import { useMessage } from '../../hooks/message'

export default function DeleteModal({ url, onCancel, refresh = () => {}, name = '' }) {
    const showMessage = useMessage()
    const { request, loading } = useDeleteRequest()
    const handleClick = async () => {
        const { success, error } = await request({ url })
        if (success) {
            refresh()
            onCancel()
        }
        if (error) {
            showMessage(error?.data?.detail || 'Ошибка' , 'is-danger')
        }
    }
    return (
        <main>
            <h4 className="is-size-4">Вы действительно хотите удалить <b>{name}</b>?</h4>

            <div style={{marginTop:'2rem'}} className="is-pulled-right">
                <Button
                    onClick={handleClick}
                    loading={loading}
                    text="Удалить"
                    icon="ion-md-trash"
                    className="is-danger"
                    disabled={loading} /> &nbsp;

                <Button
                    onClick={onCancel}
                    icon="ion-md-close"
                    text="Отмена"
                    className="is-outline"
                    disabled={loading} />
            </div>
        </main>
    )
}
