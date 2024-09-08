import Kategori from "../models/KategoriModel.js";
import path from "path";
import fs from "fs";

export const getKategori = async(req, res)=>{
    try {
        const response = await Kategori.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getKategoriById = async(req, res)=>{
    try {
        const response = await Kategori.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveKategori = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No file Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid image"});
    if(fileSize > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Kategori.create({name: name, image: fileName, url: url});
            res.status(201).json({msg: "product created succesfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateKategori = async(req, res)=>{
    const kategori = await Kategori.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!kategori) return res.status(404).json({msg: "no data found"});

    let fileName = "";
    if (req.files === null) {
        fileName = Kategori.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid image"});
        if(fileSize > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});

        const filepath = `./public/images/${kategori.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
            
        });

    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Kategori.update({name: name, image: fileName, url: url},{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "updated successfuly"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deleteKategori = async(req, res)=>{
    const kategori = await Kategori.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!kategori) return res.status(404).json({msg: "no data found"});
    try {
        const filepath = `./public/images/${kategori.image}`;
        fs.unlinkSync(filepath);
        await Kategori.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "kategori deleted succesfuly"});
    } catch (error) {
        console.log(error.message);
    }
}
