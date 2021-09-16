import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Link, Redirect } from 'react-router-dom';
import { showError, showSuccess, showLoading } from '../../utils/message';
import { userInfo } from '../../utils/auth';
import { createProperty, getDistrict } from '../../api/apiProperty';
import data from '../../assests/data/data';
import { roomNo, floorNo } from '../../assests/data/collectNo';
import { isAuthenticated } from '../../utils/auth';

const CreateProperty = ({ history }) => {
    const [values, setValues] = useState({
        district: '',
        districts: [],
        area: '',
        type: '',
        address: '',
        description: '',
        rent_price: '',
        bed: '',
        bath: '',
        belcony: '',
        floor_no: '',
        feet: '',
        loading: false,
        error: false,
        success: false,
        disabled: false,
        formData: '',
    });
    const {
        district,
        districts,
        area,
        type,
        address,
        description,
        rent_price,
        bed,
        bath,
        belcony,
        floor_no,
        feet,
        loading,
        error,
        success,
        disabled,
        formData,
    } = values;

    useEffect(() => {
        getDistrict()
            .then(response => {
                setValues({
                    ...values,
                    districts: response.data,
                    formData: new FormData() //formData k new FormData hisebe set kore nibo.jeta browser e build in ase ai FormData object ta.sekhetre amra set korte parbo ebong ai FormData tai basically amra pathabo jokhon amra post request korbo.amra json format e pathabo na.amra form data format e sob ghula data pathabo
                })
            })
            .catch(error => {
                setValues({
                    ...values,
                    error: "Something Wrong! Please try later",
                    formData: new FormData()
                })
            })
    }, [])

    const handleChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setValues({
            ...values,
            [e.target.name]: value,
            error: false,
            success: false,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
            success: false
        })
        const { token } = userInfo();
        createProperty(token, formData)
            .then(response => {
                setValues({
                    ...values,
                    district: '',
                    area: '',
                    type: '',
                    address: '',
                    description: '',
                    rent_price: '',
                    bed: '',
                    bath: '',
                    belcony: '',
                    floor_no: '',
                    feet: '',
                    loading: false,
                    disabled: false,
                    success: true,
                    error: false
                })
            })
            .catch(error => {
                let errMsg = "Something went wrong!";
                if (error.response) errMsg = error.response.data;
                setValues({
                    ...values,
                    error: errMsg,
                    loading: false,
                    success: false,
                    disabled: false
                })
            })
    }
    const propertyForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="property-form">
                <h4 >Create Property</h4>
                <hr className="mb-5" />
                <p>Upload Photo:</p>
                <div className="form-group">
                    <label className="btn btn-secondary border">
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">District:</label>
                    <select name="district" value={district} onChange={handleChange} className="form-control" required>
                        <option value="">Select district</option>
                        {districts && districts.map(district => (
                            <option value={district._id} key={district._id}>{district.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-muted">Area/Location:</label>
                    <input
                        name="area"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        value={area}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Propert type:</label>
                    <select name="type" value={type} onChange={handleChange} className="form-control" required>
                        <option value="">Select type</option>
                        {data.types.map(type => (
                            <option value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-muted">address:</label>
                    <input
                        name="address"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        value={address}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">description:</label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        className="form-control"
                        value={description}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">rent_price:</label>
                    <input
                        name="rent_price"
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        value={rent_price}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Total room:</label>
                    <select name="bed" value={bed} onChange={handleChange} className="form-control" required>
                        <option value="">Select</option>
                        {roomNo()}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-muted">Total bath:</label>
                    <select name="bath" value={bath} onChange={handleChange} className="form-control" required>
                        <option value="">Select</option>
                        {roomNo()}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-muted">Total belcony:</label>
                    <select name="belcony" value={belcony} onChange={handleChange} className="form-control" required>
                        <option value="">Select</option>
                        {roomNo()}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-muted">Floor no:</label>
                    <select name="floor_no" value={floor_no} onChange={handleChange} className="form-control" required>
                        <option value="">Select</option>
                        {floorNo()}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-muted">Square Feet:</label>
                    <input
                        name="feet"
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        value={feet}
                        required
                    />
                </div>
                <button className="submit-btn" type="submit" disabled={disabled}>Create Product</button>
            </div>
        </form>
    );
    return (
        <Layout title="Create a new property">
            <div>
                {!isAuthenticated() ?  <Redirect to='/login'/>: ''}
                {showLoading(loading)}
                {showSuccess(success, 'Product Added Successfully!')}
                {propertyForm()}
            </div>
        </Layout>
    );
}

export default CreateProperty;

