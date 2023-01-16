
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";

import "./navbar.css"


function Layout(props) {

    const navigate = useNavigate();
    const  logoutHandler = (e) => {
      e.preventDefault ()
      localStorage.clear();
      window.location.reload();
      navigate('/');  
    }


    return (
        <>

            <div className='navbar-css'>
                <div className='ImageContainerClassLayout'>
                    <img src="/img/rblogo (2).png" height="80px" width="200px"></img>
                </div>
                <div className='topCenter'>
                    {/* <div className='home-and-wheels'> */}
                    <ul className='topList'>
                        <li className='topListItem'>
                            <Link className='link' to="/home-page">HOME</Link>
                        </li>
                        <div class="dropdown">
                            <button class="dropbtn">TRIPS</button>
                            <i class="fa fa-caret-down"></i>
                            <div class="dropdown-content">
                                <Link className='ddlink' to="/">REQUESTS</Link>
                                <Link className='ddlink' to="/trip-hosted">HOSTED RIDES</Link>
                                <Link className='ddlink' to="/">TRIP HISTORY</Link>
                            </div>
                        </div>
                        <li className='topListItem'><Link className='link' to="/check-wheels">WHEELS</Link></li>
                    </ul>
                </div>
                <div className='topRight'>
                    <ul className='topList'>
                        <li className='topListItem'>
                        { localStorage.getItem('token')===null?
                            <Link className='link' to="/user-login">
                                LOGIN
                            </Link>:
                            <button className='link' onClick={logoutHandler}>Logout</button>
                        }   
                        </li>
                        <li className='topListItem'>
                            <Link className='link' to="/add-users">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                </div>


            </div>


            <div className='below-navbar-div' >

                {props.children}

            </div>

        </>

    )
}
export default Layout;