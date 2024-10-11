import React from 'react';

function Card({ country }) {
    return (
        <div style={cardStyle}>
            <h2>{country.name}</h2>
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
};

export default Card;
