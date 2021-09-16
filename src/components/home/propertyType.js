import './propertyType.css'

const PropertyType = ({ type }) => {
    return (
        <div class="col-lg-3 col-md-6 d-block d-lg-flex">
            <div class="property-type-card">
                <img src={type.img} className="icon rounded-circle" />
                <h4>{type.type}</h4>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.At voluptates commodi velit
                    nam!Sunt, veniam.</p>
            </div>
        </div>
    )
}
export default PropertyType;