import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../utils/auth';
import Logo from '../assests/img/Logo-white.png';

const Menu = ({ history, bgColor }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-md" style={bgColor}>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i class="fas fa-bars navbar-icon"></i></span>
                </button>
                <a class="navbar-brand" href="#"><img src={Logo} alt="logo" /></a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <Link className="nav-link text-center text-md-left" to="/">Home</Link>
                        </li>
                        {!isAuthenticated() && (<>
                            <li class="nav-item">
                                <Link className="nav-link text-center text-md-left" to="/login"><i class="fa fa-user icon mr-1"></i>Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link text-center text-md-left" to="/register"><i class="fa fa-user icon mr-1"></i>Register</Link>
                            </li></>)}
                        {isAuthenticated() && (<>
                            <li class="nav-item">
                                <Link className="nav-link text-center text-md-left" to="/dashboard">Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <span className="nav-link text-center" style={{ cursor: 'pointer' }} onClick={() => {
                                    signout(() => {
                                        history.push('/login')
                                    })
                                }}>
                                    Logout</span>
                            </li></>)}
                        <li class="nav-item">
                            <Link to="/create-property"><button class="nav-btn">Post your ad</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Menu);