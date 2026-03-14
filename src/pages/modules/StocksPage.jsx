import React from 'react';
import AnalysisForm from '../AnalysisForm';

const StocksPage = () => {
    return (
        <div>
            <div style={{ padding: '20px', textAlign: 'center', background: '#fff', borderBottom: '1px solid #eee' }}>
                <h1 style={{ color: '#08457E', margin: 0 }}>Stocks & Investments Module</h1>
                <p style={{ color: '#666' }}>Content Loading...</p>
            </div>
            <AnalysisForm category="Stocks" subcategory="Equity Shares" />
        </div>
    );
};

export default StocksPage;
