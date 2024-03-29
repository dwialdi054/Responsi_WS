import Product from "../models/ProductModel.js";
import path from "path";
import fs from"fs";

export const getProduct = async(req, res)=>{
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductByid = async(req, res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }   
}

export const saveProduct = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "no files uploaded"});
    const name = req.body.name;
    const harga = req.body.harga;
    const desc = req.body.desc;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/image/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({ image: fileName, name, harga, description: desc, url });
            const newProduct = await Product.findOne({
                where: { name, harga, description: desc, url }
            });
            res.status(201).json({ msg: "Produk Berhasil Disimpan", product: newProduct });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    })

}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!product) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        let fileName = product.image; // Gunakan nama file yang ada secara default

        if (req.files !== null) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Format Gambar Tidak Valid" });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ msg: "Gambar harus kurang dari 5 MB" });
            }

            const filepath = `./public/image/${product.image}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/image/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        const name = req.body.name;
        const harga = req.body.harga;
        const desc = req.body.desc;
        const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;

        await Product.update(
            { image: fileName, name, harga, description: desc, url },
            { where: { id: req.params.id } }
        );

        const updatedProduct = await Product.findOne({
            where: { id: req.params.id }
        });

        res.status(200).json({ msg: "Produk Berhasil DiUpdate", product: updatedProduct });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!product) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const filepath = `./public/image/${product.image}`;

        // Periksa apakah file ada sebelum mencoba menghapus
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        await Product.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ msg: "Produk berhasil dihapus", deletedProduct: product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error Server Internal" });
    }
};
