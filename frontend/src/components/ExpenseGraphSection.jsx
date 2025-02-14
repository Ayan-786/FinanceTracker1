import React from 'react';
import { format } from '../utils/number';
import { getDateNotRU } from '../utils/date';

function ExpenseGraphSection({ categories, total, firstDate, lastDate }) {
    return (
        <>
            <div className="graphs-box d-flex">
                <div className="expenses-chart d-flex align-items-center">
                    <div className="chart-icon">
                        <svg
                            width="322"
                            height="322"
                            viewBox="0 0 322 322"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M161 23C85.1 23 23 85.1 23 161C23 236.9 85.1 299 161 299C200.867 299 236.9 282.133 261.433 255.3L161 161V23Z"
                                fill="#43BBE6"
                            />
                            <path
                                d="M299 161C299 85.1 236.9 23 161 23V161H299Z"
                                fill="#0B3879"
                            />
                            <path
                                d="M161 161L261.433 255.3C284.433 230.767 299 197.8 299 161H161Z"
                                fill="#05074A"
                            />
                            <circle
                                cx="161.5"
                                cy="161.5"
                                r="94.5"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <div className="chart-info d-flex">
                        <h2 className="header-text">All expenses</h2>
                        <p className="info-text">{format(total)}$</p>
                        <p className="date-text">
                            {getDateNotRU(firstDate)} - {getDateNotRU(lastDate)}
                        </p>
                    </div>
                </div>

                <div className="categories-box">
                    <div className="categories-header">
                        <h2 className="category-header-text">Categories</h2>
                    </div>

                    {categories.map((category, index) => (
                        <div key={index} className="categories-body">
                            <div className="categories-item d-flex align-items-center justify-content-between">
                                <h2 className="category-body-text">
                                    {category.name}
                                </h2>
                                <div className="category-price-box d-flex align-items-center">
                                    <span className="category-price-text">
                                        {format(category?.totalExpense)}$
                                    </span>
                                    <svg
                                        width="8"
                                        height="14"
                                        viewBox="0 0 8 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.70611 7.70611C8.09666 7.31556 8.09666 6.68131 7.70611 6.29076L1.70728 0.291934C1.31674 -0.0986147 0.682484 -0.0986147 0.291935 0.291934C-0.0986137 0.682483 -0.0986137 1.31673 0.291935 1.70728L5.58465 7L0.295059 12.2927C-0.0954896 12.6833 -0.0954896 13.3175 0.295059 13.7081C0.685608 14.0986 1.31986 14.0986 1.71041 13.7081L7.70924 7.70924L7.70611 7.70611Z"
                                            fill="#090D11"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ExpenseGraphSection;
