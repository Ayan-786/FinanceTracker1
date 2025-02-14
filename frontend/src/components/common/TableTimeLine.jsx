import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import React from 'react'

import Loader from './Loader'

export default function TableTimeLine({
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
            <div className='inner'>
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
        position:'relative',
        ":nth-child(1n) .inner":{
            marginLeft:'150px',
            overflowY: 'visible',
            overflowX:'scroll'
        },
        ":nth-child(1n) table":{
            tableLayout:'fixed',
            width:'100%',
        },
        ":nth-child(1n) th":{
            width:'250px',
            ':first-child': {
                position:'absolute',
                marginLeft:'-150px',
                width:'150px',
            }
        },
        ":nth-child(1n) td":{
            height:'200px',
            overflow:'auto',
            ':first-child': {
                position:'absolute',
                marginLeft:'-150px',
                width:'150px',
            }
        },
    },
    space: {
        marginTop: '2rem',
    },
})