import Menu from '../Menu';
import Banner from './Banner'
import Properties from './properties';
import PropertyType from './propertyType';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { getDistrict, getProperties, getFilteredProperties } from '../../api/apiProperty';
import Flat from '../../assests/img/home.png';
import Hostel from '../../assests/img/hostel.png';
import Mess from '../../assests/img/mess.png';
import Roommate from '../../assests/img/roommate.png';


const bgColor = {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
}
const Home = ({ history }) => {
    const [properties, setProperties] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [filters, setFilters] = useState({
        district: [],
        area: [],
        type: []
    })

    const state = {
        propertyType: [
            { type: 'Flat', img: Flat },
            { type: 'Hostel', img: Hostel },
            { type: 'Mess', img: Mess },
            { type: 'Roommate', img: Roommate },
        ],
    }

    useEffect(() => {
        history.push('/')
        getDistrict()
            .then(response => setDistricts(response.data))
            .catch()
        getProperties()
            .then(response => setProperties(response.data))
            .catch()
    }, [])

    const handleFilters = (myfilters, filterBy, click) => {
        const newFilters = { ...filters };
        if (filterBy === 'district') {
            newFilters[filterBy] = myfilters
        }
        if (filterBy === 'area') {
            newFilters[filterBy] = myfilters
        }
        if (filterBy === 'type') {
            newFilters[filterBy] = myfilters
        }
        setFilters(newFilters);
        
        if (click) {
            getFilteredProperties(newFilters)
                .then(response => setProperties(response.data))
                .catch();
        }
    }

    const home = () => {
        return (
            <div>
                <header>
                    <Menu bgColor={bgColor} />
                    <Banner properties={properties} handleFilters={(myfilters, filterBy, click) => handleFilters(myfilters, filterBy, click)} />
                </header>
                <main>
                    <section id="properties">
                        <div className="property-heading text-center">
                            <h2>Featured Properties</h2>
                            <hr className="hr-class" />
                        </div>
                        <div className="row">
                            {properties.map(property => <Properties property={property} key={property._id} />)}
                        </div>
                    </section >
                    <section id="property-type">
                        <div className="property-type-heading">
                            <h2>What Are You Looking For?</h2>
                            <hr className="hr-class" />
                        </div>
                        <div className="row">
                            {state.propertyType.map(type => <PropertyType type={type} />)}
                        </div>
                    </section>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
    return (
        <div>
            {home()}
        </div>
    )
}
export default Home;