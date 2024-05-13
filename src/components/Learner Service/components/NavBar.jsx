import React, { useEffect, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';

function NavBar() {
    return (
        <nav class="navbar  navbar-expand-lg bg-body-tertiary px-2 py-4">
            <div class="container-fluid container">
                {/* <a class="navbar-brand" href="#">eLearner</a> */}
                <h2 className="nav-title px-4 py-2 mx-4">Course<span style={{color:'#5d00ff',fontWeight:'bolder'}}>Web</span></h2>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NavLink exact to="/" className="main-nav-link nav-link " activeClassName="active-link"> Home </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink exact to="/viewMyCourses" className="main-nav-link nav-link" activeClassName="active-link"> My Courses </NavLink>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;