import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BannerSection from '../components/BannerSection';
import TrustedSection from '../components/TrustedSection';
import CompanyInfoSectionLandingPage from '../components/CompanyInfoSectionLandingPage';
import AboutSection from '../components/AboutSection';

function LandingPage() {
    const [loggedUser, setLoggedUser] = useState(false);
    const [isHome, setIsHome] = useState(true);
    return (
        <>
            <Header loggedUser={loggedUser} />
            <BannerSection />
            <TrustedSection />
            <CompanyInfoSectionLandingPage />
            <AboutSection />
            <Footer />
        </>
    );
}

export default LandingPage;
