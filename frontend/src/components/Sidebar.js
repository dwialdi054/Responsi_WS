import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {IoPerson, IoPricetag, IoHome, IoLogOut} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset} from "../features/authSlice";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Sidebar = () => {
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
        }
      });
    };

    return (
    <div>
     <aside className ="menu pl-2 has-shadow" style={{position: 'fixed'}}>
        <p className ="menu-label">General</p>
        <ul className ="menu-list">
            <li><NavLink to={"/dashboard"}><IoHome/> Dashboard</NavLink></li>
            <li><NavLink to={"/product"}><IoPricetag/> Products</NavLink></li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className ="menu-label">Admin</p>
            <ul className ="menu-list">
                <li><NavLink to ={"/users"}><IoPerson/> Users</NavLink></li>    
            </ul>
          </div>
        )}
        <p className ="menu-label">Settings</p>
        <ul className ="menu-list">
            <li><button onClick={logout} className="button is-white"><IoLogOut/> Logout</button></li>
            
        </ul>
    </aside>
    </div>
  )
}

export default Sidebar