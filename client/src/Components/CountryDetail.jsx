import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Line } from 'react-chartjs-2'; // Asegúrate de haber instalado chart.js y react-chartjs-2

function CountryDetail() {
  const { id } = useParams(); // Obtiene el ID del país de la URL
  const [countryDetails, setCountryDetails] = useState(null);
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    async function fetchCountryDetails() {
      try {
        const response = await fetch(`http://localhost:3001/${id}`); // Usa el id para hacer la petición
        const data = await response.json();
        setCountryDetails(data);
        setPopulationData(data.populationCounts); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    }

    fetchCountryDetails();
  }, [id]);



  return (
    <div>
      {countryDetails && (
        <>
          <h2>{countryDetails.name}</h2>
          <img src={countryDetails.flag} alt={`${countryDetails.name} flag`} />
          <h3>Población a lo largo del tiempo</h3>
        
        </>
      )}
    </div>
  );
}

export default CountryDetail;
