import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import Dashboard from './pages/Dashboard';
import CategorySelection from './pages/features/CategorySelection';
import AnalysisForm from './pages/AnalysisForm';
import VehiclePage from './pages/modules/VehiclePage';
import StocksPage from './pages/modules/StocksPage';
import TaxHealth from './pages/features/TaxHealth';
import TaxLeakage from './pages/features/TaxLeakage';
import Recommendations from './pages/features/Recommendations';
import RegimeComparison from './pages/features/RegimeComparison';
import SalaryAnalysis from './pages/features/SalaryAnalysis';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Main Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Feature Routes */}
                <Route path="/category-selection" element={<CategorySelection />} />
                <Route path="/analysis" element={<AnalysisForm />} />
                <Route path="/vehicle" element={<VehiclePage />} />
                <Route path="/stocks" element={<StocksPage />} />
                
                {/* Deep Analysis Feature Routes */}
                <Route path="/feature/tax-health" element={<TaxHealth />} />
                <Route path="/feature/tax-leakage" element={<TaxLeakage />} />
                <Route path="/feature/recommendations" element={<Recommendations />} />
                <Route path="/feature/regime-comparison" element={<RegimeComparison />} />
                <Route path="/feature/salary-analysis" element={<SalaryAnalysis />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
