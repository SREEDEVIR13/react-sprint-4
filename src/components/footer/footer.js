import React from "react";
import "./footer.css"
import { Link } from 'react-router-dom';


export default function Footer(props) {
    return (
        <>

            <div className='bottom'>
                <div className='bottomLeft'>
                    RIDE BUDDY
                </div>

                <div className='bottomCenter'>
                    <ul className='bottomList'>
                        <li className='bottomListItem'><Link className='link' to="/">ABOUT US</Link></li>
                        <li className='bottomListItem'><Link className='link' to="/">CONTACT US</Link></li>
                        <li className='bottomListItem'><Link className='link' to="/">SERVICES</Link></li>
                        <li className='bottomListItem'><Link className="link" to="/">PRIVACY</Link></li>

                    </ul>
                </div>

                <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} RIDE BUDDY | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>


            </div>
            <div>
                {props.children}
            </div>
        </>
    );
}