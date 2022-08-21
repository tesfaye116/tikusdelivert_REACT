import React from 'react'
import './App.css';

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-white shadow-lg mb-5">
                <div className="container">
                    <a href="#" className="navbar-brand">
                        <img src="https://tikusdelivery.com/static/media/redLogo.a1dfcaa2.svg" alt="" className="d-inline-block picture mr-1" />
                        <span className="text-uppercase font-weight-bold">Tikus Delivery</span>
                    </a>
                </div>
            </nav>
        </>
    )
}

export default NavBar