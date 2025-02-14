import ExpensesPage from './pages/ExpensesPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import BaseContextWrapper from './components/common/BaseContext';
import axios from 'axios';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <BaseContextWrapper>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<RegisterPage />} />
                        <Route path="/account" element={<ExpensesPage />} />
                    </Routes>
                </BaseContextWrapper>
            </BrowserRouter>
        </div>
    );
}

export default App;

const API_URL = process.env.REACT_APP_API_URL;

axios.get(`${API_URL}/api/endpoint`)
  .then(response => console.log(response.data))
  .catch(error => console.error("Error:", error))