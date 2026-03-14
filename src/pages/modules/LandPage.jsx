import React from 'react';
import AnalysisForm from '../AnalysisForm';

const LandPage = () => {
    return (
        <div>
            <div style={{ padding: '20px', textAlign: 'center', background: '#fff', borderBottom: '1px solid #eee' }}>
                <h1 style={{ color: '#08457E', margin: 0 }}>Land & Property Module</h1>
                <p style={{ color: '#666' }}>Content Loading...</p>
            </div>
            <AnalysisForm category="Land" subcategory="Residential" />
        </div>
    );
};

export default LandPage;
