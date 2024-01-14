import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res)=>{
    const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({msg: "Password Salah"});
    req.session.userid = user.id;
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({id, name, email, role});
}

export const Me = async (req, res)=>{
    if(!req.session.userid){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Users.findOne({
        attributes: ['id','name', 'email', 'role'],
        where:{
            id: req.session.userid
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logout = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak Dapat LogOut"});
        res.status(200).json({msg: "Anda Berhasil Logout"});
    });
}