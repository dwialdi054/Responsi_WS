import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/users", {
            name: name,
            email: email,
            password: password,
            confPassword: confPassword,
            role: role
          });
          // Tampilkan SweetAlert keberhasilan
          Swal.fire({
            icon: 'success',
            title: 'Pengguna Ditambahkan Berhasil!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            navigate("/users");
          });
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };

  return (
    <div>
         <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Tambah Users Baru</h2>
        <div className="card is-shadowless">
        <div className="card-content">
        <div className="content">
        <form onSubmit={saveUser}>
            <p className="has-text-centered">{msg}</p>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                </div>

                
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="******"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={confPassword}
                            onChange={(e)=> setConfPassword(e.target.value)}
                            placeholder="******"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Role</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select value={role} onChange={(e)=> setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-success">Save</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddUser