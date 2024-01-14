import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const UserList = ({ onUpdateDataUserCount }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      if (onUpdateDataUserCount) {
        onUpdateDataUserCount(response.data.length); // Mengirim jumlah data ke parent component
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUsers = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Anda yakin ingin menghapus pengguna ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getUsers();
        Swal.fire('Terhapus!', 'Pengguna berhasil dihapus.', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Terjadi kesalahan saat menghapus pengguna.', 'error');
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <Link to="/users/add" className="button is-success mb-3">Tambah User Baru</Link>
      <div style={{ backgroundColor: "#3498db", padding: "10px" }}>
        <h2 className="subtitle" style={{ color: "#fff" }}>Daftar Users</h2>
      </div>
      <div style={{ backgroundColor:"#F0F8FF", padding:"10px" }}>
        {/* Tabel disini */}
        <table className="table is-striped is-fullwidth" >
          <thead>
            <tr style={{ backgroundColor: "#3498db" }}>
              <th style={{ color:"#fff" }}>No</th>
              <th style={{ color:"#fff" }}>Name</th>
              <th style={{ color:"#fff" }}>Email</th>
              <th style={{ color:"#fff" }}>Role</th>
              <th style={{ color:"#fff" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                  <button onClick={() => deleteUsers(user.id)} className='button is-small is-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
