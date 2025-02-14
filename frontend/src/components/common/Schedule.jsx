import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import React from 'react'

import Loader from './Loader'

export default function Schedule({
    loading = false,
    emptyMessage = 'Пусто',
    showEmptyMessage = true,
    items,
    columns,
    renderItem,
    className = 'table is-bordered is-fullwidth',
    emptyMessageColor = null,
}) {
    if (loading) {
        return (
            <div className={css(styles.space)}>
                <Loader large center />
            </div>
        )
    }

    if (isEmpty(items) && showEmptyMessage) {
        const style = cn(
            emptyMessageColor || 'has-text-grey',
            'is-size-5 has-text-centered',
            css(styles.space),
        )
        return (
            <div
                className={style}>
                {emptyMessage}
            </div>
        )
    }

    return (
        <main className={css(styles.parent)}>
            <div className='table-container'>
                <table className={className}>
                    <tbody>
                        {columns ? (
                                <tr>
                                    {Object.entries(columns).map(([key, value]) => (
                                        <th key={key}>{value}</th>
                                    ))}
                                </tr>
                        ) : null}

                        {items.map(renderItem)}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

const styles = StyleSheet.create({
    parent: {
        ":nth-child(1n) .table-container":{
            position:'relative',
            overflow:'scroll',
            height: '80vh',
            ":nth-child(1n) table":{
                tableLayout:'fixed',
                ":nth-child(1n) tr>th":{
                    position:'sticky',
                    background:'whitesmoke',
                    left:0,
                    zIndex:1
                },
                ":nth-child(1n) tr>td:first-child":{
                    position:'sticky',
                    background:'whitesmoke',
                    left:0,
                    zIndex:1
                },
                ":nth-child(1n) th":{
                    top:0,
                    zIndex:2,
                    width:'250px'
                },
                ":nth-child(1n) th:first-child":{
                    zIndex:3,
                    background:'white',
                    fontWeight:400
                },
                ":nth-child(1n) td":{
                    overflow:'auto'
                },
            },
        },
    },
    space: {
        marginTop: '2rem',
    },
})
