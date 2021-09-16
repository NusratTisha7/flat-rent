import { useState, useEffect } from "react";
import { getDistrict, getProperties } from "../../api/apiProperty";
import { HashLink } from "react-router-hash-link";

const Banner = ({ handleFilters}) => {
    const [districts, setDistricts] = useState([]);
    const [properties, setProperties] = useState([]);
    const [checked, setChecked] = useState('');
    var [click, setClick] = useState(false);

    useEffect(() => {
        getProperties()
            .then(response => setProperties(response.data))
            .catch(err => ("Something Wrong!"))
        getDistrict()
            .then(response => setDistricts(response.data))
            .catch(err => ("Something Wrong!"))
    }, [])

    const handleToggle = (selectId) => () => {
        var select = document.getElementById(selectId);
        let id = '';

        if (selectId === 'btn-id') {
            click = true;
        }
        else if (selectId === 'district_id') {
            id = select.options[select.selectedIndex].value;
        } else {
            id = select.options[select.selectedIndex].text;
            if(id=='Select Area' && 'Select Type'){
                id='';
            }

        }

        var filterBy = select.name;
        const checkedIds = id;
        setChecked(checkedIds);
        handleFilters(checkedIds, filterBy, click)
    }

    return (
        <section id="banner">
            <div className="banner-heading d-flex justify-content-center text-white">
                <h1>Find Your Dream Home</h1>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="search col-12 col-lg-3">
                    <select className="form-control" id="district_id" name="district" onChange={handleToggle('district_id')} >
                        <option>Select district</option>
                        {districts && districts.map(district => (
                            <option value={district._id} key={district._id}>{district.name}</option>
                        ))}
                    </select>
                </div>
                <div className="search col-12 col-lg-3">
                    <select className="form-control" id="area_id" name="area" onChange={handleToggle('area_id')}>
                        <option>Select Area</option>
                        {properties && properties.map(property => (
                            <option value={property._id} key={property._id}>{property.area}</option>
                        ))}
                    </select>
                </div>
                <div className="search col-12 col-lg-3">
                    <select className="form-control" id="type_id" name="type" onChange={handleToggle('type_id')}>
                        <option >Select Type</option>
                        {properties && properties.map(property => (
                            <option value={property._id} key={property._id}>{property.type}</option>
                        ))}
                    </select>
                </div>
                <HashLink to="/#properties" style={{ textDecoration: 'none',color:'white'}}><button className="search-btn" id="btn-id" onClick={handleToggle('btn-id')}>Search</button></HashLink>
            </div>
        </section>
    )
}
export default Banner;