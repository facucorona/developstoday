import React, { useEffect, useState } from 'react';

function Card({ countryCode, name }) {
    const [countryDetails, setCountryDetails] = useState(null);

    // Llamada a la API solo si recibe un código de país
    useEffect(() => {
        if (countryCode) {
            fetchCountryDetails(countryCode);
        }
    }, [countryCode]);

    async function fetchCountryDetails(code) {
        try {
            const response = await fetch(`http://localhost:3001/${code}`);
            const data = await response.json();
            console.log('data', data)
            setCountryDetails(data);
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    }

    return (
        <div style={cardStyle} className="card">
            <h2>{name}</h2>
            {/* Si hay detalles adicionales del país, los muestra */}
            {countryDetails && (
                <div>
                    <p>Common Name: {countryDetails.commonName}</p>
                    <p>Official Name: {countryDetails.officialName}</p>
                    <img src={countryDetails.flag} alt={`${name} flag`} />
                </div>
            )}
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
