import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset} from "../features/authSlice";
import logo from "../logo.png";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Navbar = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const logout = () => {
      Swal.fire({
        title: 'Konfirmasi Logout',
        text: 'Anda yakin ingin keluar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(LogOut());
          dispatch(reset());
          navigate("/");
          Swal.fire('Logout Berhasil', 'Anda telah berhasil logout.', 'success');
        }
      });
    };
  return (
    <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation" style={{ backgroundColor:"#102c54" }}>
      <div className="navbar-brand">
        <NavLink to="/dashboard" className="navbar-item">
          <img 
           // src="https://bulma.io/images/bulma-logo.png" 
            src={logo}
            width="120" 
            height="30"
            alt="logo"/>
        </NavLink>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button 
                onClick={logout}
                className="button is-light">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar