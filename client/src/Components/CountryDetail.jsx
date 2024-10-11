import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
                setPopulationData(data.populationCounts);
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
                    <h1>Country Details</h1>
                    <h2>{countryDetails[1].name}</h2>
                    <img width={'400px'} height={'300px'} src={countryDetails[1].flag} alt={`${countryDetails[1].name} flag`} />
                    <h3>Border Countries</h3>
                    {countryDetails[0].borders.map(b => {
                        return (
                            <h4><Link to={`/${b.countryCode}`}>{b.commonName}</Link></h4>
                        )
                    })}
                    <Link to={`/`}><button>Go back</button></Link>

                </>
            )}
        </div>
    );
}

export default CountryDetail;
