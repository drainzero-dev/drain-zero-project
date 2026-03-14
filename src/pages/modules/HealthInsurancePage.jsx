import React from 'react';
import AnalysisForm from '../AnalysisForm';

const HealthInsurancePage = () => {
    return (
        <div>
            <div style={{ padding: '20px', textAlign: 'center', background: '#fff', borderBottom: '1px solid #eee' }}>
                <h1 style={{ color: '#08457E', margin: 0 }}>Health Insurance Module</h1>
                <p style={{ color: '#666' }}>Content Loading...</p>
            </div>
            <AnalysisForm category="Health Insurance" subcategory="Family" />
        </div>
    );
};

export default HealthInsurancePage;
