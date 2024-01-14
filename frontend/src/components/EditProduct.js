import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [harga, setHarga] = useState("");
    const [desc, setdesc] = useState("");
    const [preview, setPreview] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductsById();
    },[]);

    const getProductsById = async () =>{
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setFile(response.data.image);
        setHarga(response.data.harga);
        setdesc(response.data.description);
        setPreview(response.data.url);
    };

    const loadImage = (e) =>{
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const updateProduct = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("harga", harga);
        formData.append("desc", desc);
        try {
            await axios.put(`http://localhost:5000/products/${id}`, formData, {
                headers:{
                    "Content-type": "multipart/form-data"
                },
            });
            navigate("/product");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <h1 className='title'>Produk</h1>
        <h2 className='subtitle'>Edit Produk</h2>
        <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
            <form onSubmit={updateProduct}>
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
                        <button type="submit" className="button is-success">Update</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default EditProduct