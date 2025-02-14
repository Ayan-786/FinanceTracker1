import React from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseTableListSection({ items,expense, category  }) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction name</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <ExpenseItem category={category} expense={expense} item={item} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ExpenseTableListSection;
