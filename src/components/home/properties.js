import { API } from '../../utils/config';
import { Link } from 'react-router-dom';
import './properties.css';

const PropertyList = ({ property }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4">
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/property/${property._id}`} >
                <div className="card">
                    <div className="card-image">
                        <img className="card-img"
                            src={`${API}/property/photo/${property._id}`}
                            alt="" />
                        <p className="rent">For Rent</p>
                        <p className="price">{property.rent_price} BDT/month</p>
                    </div>
                    <div className="card-body">
                        <p className="card-body-paragraph">{property.type}</p>
                        <h5 className="address"><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
                            {property.address}</h5>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="area col-md-6 col-sm-8">
                                <p>Area: {property.feet} sq.ft</p>
                            </div>
                            <div className="property-icon col-md-6 col-sm-4">
                                <i className="fa fa-bed" aria-hidden="true"></i> {property.bed}
                                <i className="fa fa-bath ml-3" aria-hidden="true"></i> {property.bath}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    )
}
export default PropertyList;