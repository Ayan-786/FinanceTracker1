import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import React from 'react'
import { useQueryParams } from '../../hooks/queryString'

import Loader from './Loader'
import Pagination from './Pagination'


export default function Table({
    loading = false,
    emptyMessage = 'Пусто',
    showEmptyMessage = true,
    totalCount = 0,
    pageSize = 15,
    items,
    columns,
    renderItem,
    className = 'table is-striped is-fullwidth',
    onPageChange = () => { },
    activePage = 1,
    emptyMessageColor = null,
    style,
    children,
}) {
    const params = useQueryParams()

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
        <div className="table-parent" style={{ overflow:'auto', ...style }}>
            <table className={className}>
                <tbody>
                    {columns ? (
                        <tr>
                            {Object.entries(columns).map(([key, value]) => (
                                <th className={css(styles.th)} key={key}>{value}</th>
                            ))}
                        </tr>
                    ) : null}

                    {items.map(renderItem)}
                </tbody>
            </table>

            {loading && <Loader large center />}

            {children}

            <Pagination
                currentPage={params.page || activePage}
                totalCount={(totalCount)}
                pageSize={pageSize}
                onPageChange={(page) => {
                    if (typeof onPageChange === 'function') onPageChange(page)
                }}
            />
        </div>
    )
}

const styles = StyleSheet.create({
    space: {
        marginTop: '2rem',
    },
    th: {
        textTransform: 'lowercase',
        whiteSpace: 'nowrap',
        '::first-letter': {
            textTransform: 'uppercase',
        },
    },
})
