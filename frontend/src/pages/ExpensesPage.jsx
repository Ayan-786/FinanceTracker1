import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyExpensesSection from '../components/MyExpensesSection';

function ExpensesPage() {
    const [isLoggedInUser, setLoggedUser] = useState(true);
    const [isNavExisted, setIsNavExisted] = useState(false);

    return (
        <>
            <Header
                isLoggedInUser={isLoggedInUser}
                isNavExisted={isNavExisted}
            />
            <MyExpensesSection />
            <Footer />
        </>
    );
}

export default ExpensesPage;
