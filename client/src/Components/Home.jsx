// Home.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card'; // Importar el componente Card

function Home() {
    const [allCountries, setAllCountries] = useState([]);

    // Función asíncrona para obtener todos los países
    async function fetchAllCountries() {
        try {
            const response = await fetch('http://localhost:3001/');
            const data = await response.json();
            setAllCountries(data); // Guardar los datos en el estado
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    useEffect(() => {
        fetchAllCountries();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {/* Renderiza las tarjetas de los países si hay datos */}
            <div style={cardsContainerStyle}>
                {allCountries.map((country, index) => (
                    <Card key={index} country={country} /> // Pasar la información del país al componente Card
                ))}
            </div>
        </div>
    );
}

// Estilo para el contenedor de tarjetas (opcional)
const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
};

export default Home;
