import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ProductList = ({ onUpdateDataProductCount }) => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);

      // Mengirim jumlah data ke parent component (VDashboard)
      if (onUpdateDataProductCount) {
        onUpdateDataProductCount(response.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Anda yakin ingin menghapus produk ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        getProducts();
        Swal.fire('Terhapus!', 'Produk berhasil dihapus.', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Terjadi kesalahan saat menghapus produk.', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Produk</h1>
      {user && user.role === "admin" && (
        <Link to="/product/add" className="button is-success mb-3">
          Tambah Produk Baru
        </Link>
      )}
      <div style={{ backgroundColor: "#3498db", padding: "10px" }}>
        <h2 className="subtitle" style={{ color: "#fff" }}>
          Daftar Produk
        </h2>
      </div>
      <div style={{ backgroundColor: "#F8F8FF", padding: "10px" }}>
        <div className="columns is-multiline">
          {products.map((product) => (
            <div className="column is-one-quarter" key={product.id}>
              <div className="card" style={{ width: "255px" }}>
                <div style={{ backgroundColor: "#3498db", height: "10px" }}></div>
                <div className="card-image" style={{ padding: "10px" }}>
                  <figure className="image is-4by3">
                    <img src={product.url} alt="Image" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4" style={{ marginTop: "-10px" }}>
                        {product.name}
                      </p>
                      <p className="desc is-6">{product.description}</p>
                      <p className="mt-5 title is-4">Rp. {product.harga}</p>
                    </div>
                  </div>
                </div>

                <footer className="card-footer">
                  {user && user.role === "admin" && (
                    <>
                      <Link
                        to={`/product/edit/${product.id}`}
                        className="card-footer-item"
                      >
                        Edit
                      </Link>
                      <a
                        onClick={() => deleteProduct(product.id)}
                        className="card-footer-item"
                      >
                        Delete
                      </a>
                    </>
                  )}
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
