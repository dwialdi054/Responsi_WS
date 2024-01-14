import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { desktopOutline } from 'ionicons/icons';
import { person } from 'ionicons/icons';

const VDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [dataUserCount, setDataUserCount] = useState(0);
  const [dataProductCount, setDataProductCount] = useState(0);

  useEffect(() => {
    fetchDataUserCount();
    fetchDataProductCount();
  }, []);

  const fetchDataUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setDataUserCount(response.data.length);
    } catch (error) {
      console.error("Error mengambil data pengguna:", error);
    }
  };

  const fetchDataProductCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setDataProductCount(response.data.length);
    } catch (error) {
      console.error("Error mengambil data produk:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Dasbord</h1>
      <h2 className="subtitle">Selamat Kembali <strong>{user && user.name}</strong></h2>
      <div className="card-container" style={{ display: 'flex'}}>
        <div className="card" style={{ width: "255px", backgroundColor: "white", textAlign: "center" }}>
          <div className="card-content">
          <div className="media">
              <div className="media-content">
                <div>
                  <p className="title is-3">Product</p>
                  <p className="title is-4">{dataProductCount}</p>
                </div>
              </div>
              <IonIcon icon={desktopOutline} style={{ width: '60px', height: '60px', marginTop:"20px" }}/>
            </div>
          </div>
          <footer className="card-footer">
            <Link to={`/product/`} className="card-footer-item">Lihat Data</Link>
          </footer>
        </div>
        {user && user.role === "admin" && (
        <div className="card" style={{ width: "255px", backgroundColor: "white", textAlign: "center",marginLeft: "20px" }}>
          <div className="card-content">
          <div className="media">
              <div className="media-content">
                <div>
                  <p className="title is-3">Users</p>
                  <p className="title is-4">{dataUserCount}</p>
                </div>
              </div>
              <IonIcon icon={person} style={{ width: '50px', height: '50px', marginTop:"20px" }} />
            </div>
          </div> 
          <footer className="card-footer">
            <Link to={`/users/`} className="card-footer-item">Lihat Data</Link>
          </footer>
        </div>
        )}
      </div>
    </div>
  );
};

export default VDashboard 