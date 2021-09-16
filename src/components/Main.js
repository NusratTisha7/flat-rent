import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import createProperty from './propery/createProperty';
import propertyDetails from './home/propertyDetails';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/" strict exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/create-property" exact component={createProperty}/>
                <Route path="/property/:id" exact component={propertyDetails}/>
            </Switch>
        </div>
    )
}

export default Main;
