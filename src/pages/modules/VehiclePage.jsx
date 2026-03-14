import React from 'react';
import AnalysisForm from '../AnalysisForm';

const VehiclePage = () => {
    return (
        <div>
            <div style={{ padding: '20px', textAlign: 'center', background: '#fff', borderBottom: '1px solid #eee' }}>
                <h1 style={{ color: '#08457E', margin: 0 }}>Vehicle Module</h1>
                <p style={{ color: '#666' }}>Content Loading...</p>
            </div>
            <AnalysisForm category="Vehicle" subcategory="Car" ownership="First-hand" />
        </div>
    );
};

export default VehiclePage;
