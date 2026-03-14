import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import AnalysisForm from './pages/AnalysisForm';
import Dashboard from './pages/Dashboard';

// Module Pages
import VehiclePage from './pages/modules/VehiclePage';
import StocksPage from './pages/modules/StocksPage';
import HealthInsurancePage from './pages/modules/HealthInsurancePage';
import LandPage from './pages/modules/LandPage';

// Feature Detail Pages
import RegimeComparison from './pages/features/RegimeComparison';
import TaxLeakage from './pages/features/TaxLeakage';
import TaxHealth from './pages/features/TaxHealth';
import Recommendations from './pages/features/Recommendations';
import SalaryAnalysis from './pages/features/SalaryAnalysis';
import SecurityDetail from './pages/features/SecurityDetail';
import CategorySelection from './pages/features/CategorySelection';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/analysis" element={<AnalysisForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category-selection" element={<CategorySelection />} />

            {/* Module Routes */}
            <Route path="/vehicle" element={<VehiclePage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/health-insurance" element={<HealthInsurancePage />} />
            <Route path="/land" element={<LandPage />} />

            {/* Feature Detail Routes */}
            <Route path="/feature/regime-comparison" element={<RegimeComparison />} />
            <Route path="/feature/tax-leakage" element={<TaxLeakage />} />
            <Route path="/feature/tax-health" element={<TaxHealth />} />
            <Route path="/feature/recommendations" element={<Recommendations />} />
            <Route path="/feature/salary-analysis" element={<SalaryAnalysis />} />
            <Route path="/feature/security" element={<SecurityDetail />} />
        </Routes>
    );
};

export default AppRoutes;
