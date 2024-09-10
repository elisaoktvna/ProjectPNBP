import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id','uuid','name','username','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    

}

export const getUserByid = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid','name','username','role'],
            where: {
                uuid: req.params.id
        }
    });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createUser = async(req, res) => {
    const {name, username, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "password dan confirm password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = (req, res) => {
    
}

export const deleteUser = (req, res) => {
    
}