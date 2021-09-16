import React, { useEffect, useState } from 'react'
import { getPropertyDetails } from '../../api/apiProperty';
import { showError } from '../../utils/message';
import { API } from '../../utils/config';
import Layout from '../Layout';
import { Link } from 'react-router-dom';

const PropertyDetails = (props) => {
    const [property, setProperty] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const id = props.match.params.id;
        getPropertyDetails(id)
            .then(response => setProperty(response.data))
            .catch(err => setError('Failed to load property'))
    }, [])

    const home = () => {
        return (
            <div className="form-body">
                <div className="row">
                    <div className="col-6">
                        <img className="card-img"
                            src={`${API}/property/photo/${property._id}`}
                            alt="" />
                    </div>
                    <div className="col-6">
                        <h5 className="mb-4 font-weight-bold text">Flat Rent For {property.area}</h5>
                        <p><span className="font-weight-bold mr-2">Property Type:</span>{property.type}</p>
                        <p><span className="font-weight-bold mr-2">Rent Price:</span>{property.rent_price}</p>
                        <p><span className="font-weight-bold mr-2">Area:</span>{property.feet} square feet</p>
                        <p><span className="font-weight-bold mr-2">Total Room:</span>{property.bed}</p>
                        <p><span className="font-weight-bold mr-2">Tital Bathroom:</span>{property.bath}</p>
                        <p><span className="font-weight-bold mr-2">Total Belcony:</span>{property.belcony}</p>
                        <p><span className="font-weight-bold mr-2">Address:</span>{property.address}</p>
                        <p><span className="font-weight-bold mr-2">Description:</span>{property.description}</p>
                        <br />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            {home()}
        </Layout>
    )
}
export default PropertyDetails;
