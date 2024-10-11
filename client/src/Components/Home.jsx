import React, { useEffect, useState } from 'react';

function Home() {
    const [allCountries, setAllCountries] = useState([]);

    // Definición correcta de la función asíncrona
    async function fetchAllCountries() {
        try {
            const response = await fetch('http://localhost:3001/');
            const data = await response.json()
            setAllCountries(data); // Guardar los datos en el estado
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    useEffect(() => {
        fetchAllCountries();
    }, []);

    console.log('allCountries', allCountries);

    return (
        <div>
            <h1>Home</h1>
            {/* Renderiza los países si hay datos */}
            <ul>
                {allCountries.map((country, index) => (
                    <li key={index}>{country.name}</li> // Asegúrate de que 'name' sea una propiedad válida
                ))}
            </ul>
        </div>
    );
}

export default Home;
