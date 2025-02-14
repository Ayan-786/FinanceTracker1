import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import Input from './common/Input';
import { required } from '../utils/validators';
import Select from './common/Select';
import { useLoad, usePutRequest } from '../hooks/request';

export default function EditExpense({
    handleAddExpenseClose,
    setIsAddExpenseOpen,
    expense,
    expenseId,
    initialValues,
                                        category,
}) {
    const categories = useLoad({ url: '/main/category' });
    const expenses = usePutRequest({
        url: '/main/expense/{id}'.replace('{id}', expenseId),
    });

    async function onSubmit(data) {
        const { success, error } = await expenses.request({ data });
        if (success) {
            setIsAddExpenseOpen(false);
            expense.request();
            category.request();
        }
        if (error) console.log(error?.data?.detail || 'Error', 'is-danger');
    }

    return (
        <>
            <section className="add-new-expense-section">
                <div className="add-new-expense-box">
                    <div className="expense-header d-flex align-items-center justify-content-between">
                        <h2 className="expense-header-text">Add New Expense</h2>
                        <span
                            className="close-icon"
                            onClick={() => handleAddExpenseClose()}
                        >
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </span>
                    </div>

                    <div className="add-new-expense-form-box">
                        <Formik
                            initialValues={{
                                name: '',
                                category: '',
                                amount: '',
                                date: '',
                                comment: '',
                                ...initialValues,
                            }}
                            onSubmit={onSubmit}
                        >
                            <Form
                                action=""
                                className="add-new-expense-form d-flex justify-content-between"
                            >
                                <div className="add-new-expense-forms-box d-flex ">
                                    <div className="add-new-expense-input-box d-flex">
                                        <label
                                            htmlFor=""
                                            className="add-new-expense-input-label"
                                        >
                                            Expense Name
                                        </label>
                                        <Input
                                            className="add-new-expense-input"
                                            name="name"
                                            style={{ width: '100%' }}
                                            validate={required}
                                            placeholder="Type..."
                                        />
                                    </div>
                                    <div className="add-new-expense-input-box d-flex">
                                        <label
                                            htmlFor=""
                                            className="add-new-expense-input-label"
                                        >
                                            Category
                                        </label>
                                        <Select
                                            optionValue="id"
                                            optionLabel="name"
                                            name="category"
                                            options={
                                                categories.response
                                                    ? categories.response
                                                          .results
                                                    : []
                                            }
                                            className="add-new-expense-input"
                                        />
                                    </div>
                                    <div className="add-new-expense-input-box d-flex">
                                        <label
                                            htmlFor=""
                                            className="add-new-expense-input-label"
                                        >
                                            amount ($)
                                        </label>
                                        <Input
                                            name="amount"
                                            style={{ width: '100%' }}
                                            validate={required}
                                            className="add-new-expense-input"
                                        />
                                    </div>
                                    <div className="add-new-expense-input-box d-flex">
                                        <label
                                            htmlFor=""
                                            className="add-new-expense-input-label"
                                        >
                                            date
                                        </label>
                                        <Input
                                            name="date"
                                            style={{ width: '100%' }}
                                            validate={required}
                                            className="add-new-expense-input"
                                            type="date"
                                        />
                                    </div>
                                    <div className="add-new-expense-input-box d-flex">
                                        <label
                                            htmlFor=""
                                            className="add-new-expense-input-label"
                                        >
                                            Comment
                                        </label>
                                        <Input
                                            component="textarea"
                                            style={{ width: '100%' }}
                                            validate={required}
                                            className="add-new-expense-input"
                                            name="comment"
                                            placeholder="Type..."
                                        />
                                    </div>
                                </div>

                                <div className="add-new-expense-form-btns d-flex align-items-center justify-content-between">
                                    <button
                                        onClick={() => {
                                            setIsAddExpenseOpen(false);
                                        }}
                                        className="add-new-expense-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="add-new-expense-btn save"
                                    >
                                        Save
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

                <div
                    className="shadow-box"
                    onClick={() => handleAddExpenseClose()}
                ></div>
            </section>
        </>
    );
}
