import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { DOTS, usePagination } from '../../hooks/usePagination'
import { Arrow24 } from '../Svgs'

export default function Pagination({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
}) {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })
    const pagesNumber = Math.ceil(totalCount / pageSize)

    if (currentPage === 0 || paginationRange?.length < 2) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }
    if (totalCount <= pageSize || totalCount === undefined) {
        return null
    }

    const current = parseInt(currentPage, 15)
    const lastPage = paginationRange[paginationRange?.length - 1]
    return (
        <nav className={css(styles.wrap)}>
            <div className="is-flex">

                <ul
                    className={cn('pagination-list', { [className]: className })}
                >
                    {current - 1 > 0 ? (

                        <li
                            className={cn('green-icon-hover rotate-180', css(styles.arrowLeft), {
                                disabled: currentPage === 1,
                            })}
                            onClick={onPrevious}
                        >
                            <Arrow24 className={cn('green-icon-hover', css(styles.test))} />
                        </li>
                    ) : null}

                    {paginationRange?.map((pageNumber) => {
                        if (pageNumber === DOTS) {
                            return <li key={pageNumber} className={css(styles.boxDots)}>&#8230;</li>
                        }

                        return (
                            <li
                                key={pageNumber}
                                className={cn('pointer', {
                                    selected: pageNumber === currentPage,
                                })}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                <span className={cn('', currentPage === pageNumber ? css(styles.boxActive) : css(styles.box))}>
                                    {pageNumber}
                                </span>
                            </li>
                        )
                    })}
                    {current < pagesNumber ? (
                        <li
                            onClick={() => {
                                if (currentPage < pagesNumber) {
                                    onPageChange(currentPage + 1)
                                }
                                onNext()
                            }}
                            className={cn('green-icon-hover', {
                                disabled: currentPage === lastPage,
                            }, css(styles.arrowLeft))}
                        >
                            <Arrow24 className="green-icon-hover" />
                        </li>
                    ) : null}

                </ul>
            </div>
        </nav>
    )
}

const styles = StyleSheet.create({
    wrap: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    arrowLeft: {
        width: 38,
        height: 38,
        borderRadius: 8,
        background: '#fcfcfc',
        border: 0,
        marginRight: 10,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
            border: '1px solid hsl(217, 71%, 53%)',
            // background: 'linear-gradient(0deg, rgba(125, 186, 40, 0.1), rgba(125, 186, 40, 0.1))',
        },
    },
    boxActive: {
        background: 'hsl(217, 71%, 53%)',
        color: '#fcfcfc',
        width: 38,
        height: 38,
        borderRadius: 8,
        border: 0,
        marginRight: 10,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
            border: '1px solid hsl(217, 71%, 53%)',
            // background: 'linear-gradient(0deg, rgba(125, 186, 40, 0.1), rgba(125, 186, 40, 0.1))',
        },

    },
    box: {
        width: 38,
        height: 38,
        borderRadius: 8,
        background: '#fcfcfc',
        color: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        ':hover': {
            background: 'hsl(217, 71%, 53%)',
            color: '#fcfcfc',
        },
    },
    boxDots: {
        width: 38,
        height: 38,
        borderRadius: 8,
        background: '#fcfcfc',
        color: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
})
