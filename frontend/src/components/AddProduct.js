import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const AddProduct = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [harga, setHarga] = useState("");
    const [desc, setdesc] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
    
        // SweetAlert untuk memberitahu bahwa file telah dipilih
        Swal.fire({
          icon: 'info',
          title: 'File Dipilih!',
          text: 'Anda telah memilih file.',
        });
    
        setPreview(URL.createObjectURL(image));
      };
    

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("harga", harga);
        formData.append("desc", desc);
        try {
          await axios.post("http://localhost:5000/products", formData, {
            headers: {
              "Content-type": "multipart/form-data"
            }
          });
          // Tampilkan SweetAlert keberhasilan
          Swal.fire({
            icon: 'success',
            title: 'Produk Ditambahkan Berhasil!',
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            navigate("/product");
          });
        } catch (error) {
          // Tampilkan SweetAlert kesalahan
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Menambahkan Produk',
            text: 'Terjadi kesalahan!',
          });
        }
      };
      
  return (
    <div>
         <h1 className='title'>Produk</h1>
        <h2 className='subtitle'>Tambah Produk Baru</h2>
        <div className="card is-shadowless">
        <div className="card-content">
        <form onSubmit={saveProduct}>
                <div className="field">
                    <label className="label">Product Name</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Product Name"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={desc} 
                            onChange={(e) => setdesc(e.target.value)} 
                            placeholder="Description Product"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Harga</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={harga} 
                            onChange={(e) => setHarga(e.target.value)} 
                            placeholder="Harga Product"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <div className="file">
                            <label className="file-label">
                            <input 
                            type="file" 
                            className="file-input" 
                            onChange={loadImage} />
                            <span className="file-cta">
                                <span className="file-label">Pilih File...</span>
                            </span>
                            </label>
                        </div>
                    </div>
                </div>

                {preview ? (
                    <figure className="image is-128x128">
                        <img src={preview} alt="Preview Image" />
                    </figure>
                ): (
                    ""
                )}

                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-success">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default AddProduct