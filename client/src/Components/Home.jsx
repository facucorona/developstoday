import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia aquí
import Card from './Card';

function Home() {
    const [allCountries, setAllCountries] = useState([]);
    const navigate = useNavigate(); // Cambia aquí

    async function fetchAllCountries() {
        try {
            const response = await fetch('http://localhost:3001/');
            const data = await response.json();
            setAllCountries(data);
            console.log('home fetch :>> ', allCountries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    useEffect(() => {
        fetchAllCountries();
    }, []);

    const handleCountryClick = (countryCode) => {
        navigate(`/${countryCode}`); // Cambia aquí
    };

    return (
        <div>
            <h1>Home</h1>
            <div style={cardsContainerStyle}>
                {console.log('allCountries', allCountries)}
                {allCountries.map((country, index) => (
                    <Card
                        key={index}
                        countryCode={country.countryCode}
                        name={country.name}
                        flag={country.flag}
                        onClick={() => handleCountryClick(country.countryCode)}
                    />
                ))}
            </div>
        </div>
    );
}

const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
};

export default Home;
