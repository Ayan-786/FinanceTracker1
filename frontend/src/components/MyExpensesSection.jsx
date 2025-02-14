import React, { useState } from 'react';
import ExpenseTableListSection from './ExpenseTableListSection';
import ExpenseGraphSection from './ExpenseGraphSection';
import AddNewExpense from './AddNewExpense';
import { useLoad } from '../hooks/request';

function MyExpensesSection() {
    const [activeTab, setActiveTab] = useState('table');
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

    const handleActiveTab = (tabName) => {
        setActiveTab(tabName);
    };

    const handleAddExpenseOpen = () => {
        setIsAddExpenseOpen(true);
    };

    const handleAddExpenseClose = () => {
        setIsAddExpenseOpen(false);
    };
    const expense = useLoad({ url: '/main/expense' });
    const items = expense.response ? expense.response.results : [];

    const category = useLoad({ url: '/main/category' });
    const categories = category.response ? category.response.results : [];
    const total = category.response ? category.response.totalExpense : 0;
    const firstDate = category.response
        ? category.response.firstExpenseDate
        : {};
    const lastDate = category.response ? category.response.lastExpenseDate : {};
    return (
        <>
            {isAddExpenseOpen ? (
                <AddNewExpense
                    category={category}
                    expense={expense}
                    handleAddExpenseClose={handleAddExpenseClose}
                    setIsAddExpenseOpen={setIsAddExpenseOpen}
                />
            ) : (
                ''
            )}
            <section className="my-expenses-section">
                <div className="my-expenses-box px-primary d-flex">
                    <div className="my-expenses-header d-flex">
                        <h2 className="my-expenses-header-text">My Expenses</h2>

                        <div className="my-expenses-header-box d-flex justify-content-between align-items-center">
                            <div className="my-expenses-header-input-box">
                                <input
                                    className="my-expenses-header-input"
                                    placeholder="Search"
                                    type="text"
                                />
                            </div>

                            <div className="my-expenses-header-btns d-flex align-items-center">
                                <button
                                    className="my-expenses-btn"
                                    onClick={() => handleAddExpenseOpen()}
                                >
                                    Add New
                                </button>
                                <button className="my-expenses-btn export">
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="my-expenses-main d-flex">
                        <div className="my-expenses-main-header d-flex align-items-center justify-content-between">
                            <div className="my-expenses-main-tabs d-flex align-items-center">
                                <button
                                    className={
                                        activeTab === 'table'
                                            ? 'tab-btn blue'
                                            : 'tab-btn '
                                    }
                                    onClick={() => handleActiveTab('table')}
                                >
                                    List
                                </button>
                                <button
                                    className={
                                        activeTab !== 'table'
                                            ? 'tab-btn blue'
                                            : 'tab-btn '
                                    }
                                    onClick={() => handleActiveTab('graph')}
                                >
                                    Graphs
                                </button>
                            </div>
                            <div className="my-expenses-main-drop-down">
                                <select name="" id="">
                                    <option value="">Last 6 months</option>
                                </select>
                            </div>
                        </div>

                        <div className="my-expenses-main-table">
                            {activeTab === 'table' ? (
                                <ExpenseTableListSection
                                    expense={expense}
                                    items={items}
                                    category={category}
                                />
                            ) : (
                                <ExpenseGraphSection
                                    total={total}
                                    firstDate={firstDate}
                                    lastDate={lastDate}
                                    categories={categories}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyExpensesSection;
