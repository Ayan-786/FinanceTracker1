import React, { useState } from 'react';
import { getDateNotRU } from '../utils/date';
import { format } from '../utils/number';
import { useDeleteRequest } from '../hooks/request';
import EditExpense from './EditExpense';

export default function ExpenseItem({ item, expense, category }) {
    const expenseRemove = useDeleteRequest({
        url: '/main/expense/{id}'.replace('{id}', item?.id),
    });

    async function onDelete() {
        if (global.confirm('Are you sure you want to delete it?')) {
            await expenseRemove.request();
            expense.request();
            category.request()
        }
    }

    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

    const handleAddExpenseOpen = () => {
        setIsAddExpenseOpen(true);
    };

    const handleAddExpenseClose = () => {
        setIsAddExpenseOpen(false);
    };

    return (
        <>
            {isAddExpenseOpen ? (
                <EditExpense
                    category={category}
                    initialValues={item}
                    expenseId={item?.id}
                    expense={expense}
                    handleAddExpenseClose={handleAddExpenseClose}
                    setIsAddExpenseOpen={setIsAddExpenseOpen}
                />
            ) : (
                ''
            )}
            <tr>
                <td>{item.name}</td>
                <td className="category">{item.selectCategory?.name}</td>
                <td className="amount">{format(item.amount)}$</td>
                <td className="date">{getDateNotRU(item.date)}</td>

                <td className="action">
                    <div className="btns-block d-flex align-items-center">
                        <button
                            onClick={handleAddExpenseOpen}
                            className="edit d-flex align-items-center"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.47918 15.4999C1.18752 15.5694 0.934044 15.4964 0.718766 15.2812C0.503488 15.0659 0.430571 14.8124 0.500016 14.5208L1.33335 10.5416L5.45835 14.6666L1.47918 15.4999ZM5.45835 14.6666L1.33335 10.5416L10.875 0.999919C11.1945 0.680474 11.5903 0.520752 12.0625 0.520752C12.5347 0.520752 12.9306 0.680474 13.25 0.999919L15 2.74992C15.3195 3.06936 15.4792 3.4652 15.4792 3.93742C15.4792 4.40964 15.3195 4.80547 15 5.12492L5.45835 14.6666ZM12.0625 2.16659L3.43752 10.7916L5.20835 12.5624L13.8333 3.93742L12.0625 2.16659Z"
                                    fill="#519C29"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={onDelete}
                            className="delete d-flex align-items-center"
                        >
                            <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.8335 11.75L7.00016 9.58333L9.16683 11.75L10.3335 10.5833L8.16683 8.41667L10.3335 6.25L9.16683 5.08333L7.00016 7.25L4.8335 5.08333L3.66683 6.25L5.8335 8.41667L3.66683 10.5833L4.8335 11.75ZM2.8335 15.5C2.37516 15.5 1.9828 15.3368 1.65641 15.0104C1.33002 14.684 1.16683 14.2917 1.16683 13.8333V3H0.333496V1.33333H4.50016V0.5H9.50016V1.33333H13.6668V3H12.8335V13.8333C12.8335 14.2917 12.6703 14.684 12.3439 15.0104C12.0175 15.3368 11.6252 15.5 11.1668 15.5H2.8335ZM11.1668 3H2.8335V13.8333H11.1668V3Z"
                                    fill="#FC766A"
                                />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
