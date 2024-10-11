import React from 'react';
import CountryDetail from './CountryDetail';

function Card({ countryCode, name, flag, onClick }) {
    // console.log('name', name)
    return (
        <div style={cardStyle} className="card" onClick={onClick}>
            <h2>{name}</h2>
            <CountryDetail />

            {flag && <img src={flag} alt={`${name} flag`} style={flagStyle} />}
        </div>
    );
}

// Estilo básico para la card (opcional, puedes personalizarlo)
const cardStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer', // Cambia el cursor para indicar que es clickeable
};

const flagStyle = {
    maxWidth: '100%',
    height: 'auto',
};

export default Card;
