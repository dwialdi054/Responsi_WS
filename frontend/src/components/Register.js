import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('user'); // Setel peran default ke 'user'
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
           <div className="columns is-centered">
               <div className="column is-4">
                   <form onSubmit={saveUser} className='box'>
                   <h1 className="title is-2" style={{ textAlign:"center" }}>Register</h1>
                       <div className="field">
                           <label className="label">Nama</label>
                           <div className="control">
                           <input
                            type='text'
                            className='input'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Nama'
                            />
                           </div>
                       </div>
                       <div className="field">
                           <label className="label">Email</label>
                           <div className="control">
                           <input
                            type='text'
                            className='input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            />
                           </div>
                       </div>
                       <div className="field">
                           <label className="label">Password</label>
                           <div className="control">
                           <input
                            type='password'
                            className='input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='******'
                            />
                           </div>
                       </div>
                       <div className="field">
                           <label className="label">Konfirmasi Password</label>
                           <div className="control">
                           <input
                            type='password'
                            className='input'
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            placeholder='******'
                          />
                           </div>
                           <input
                            type='hidden'
                            value={role}
                            onChange={(e) => setRole("user")}
                            />
                       </div>
                       <div className="field">
                           <button className="button is-success is-fullwidth">Register</button>
                       </div>
                       <div style={{ textAlign:"center" }}>
                        <p>Sudah Punya Akun? <Link to={`/`}>Login</Link></p>
                        
                       </div>
                   </form>
               </div>
           </div> 
        </div>
      </div>
    </section>
  )
}

export default Register