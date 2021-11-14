const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{
    let listOffice = await pool.query('SELECT * FROM office');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listOffice: listOffice
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let office = await pool.query('SELECT * FROM office WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el dulce",
        office: office
    });
});

router.post('/create', async (req, res)=> {
    const { office_code, adress } = req.body;
    // var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const office ={
        office_code, adress
    };

    await pool.query('INSERT INTO office set ?', [office]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        office: office
    });
});
router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    const { office_code, adress } = req.body;

    const office = { office_code, adress };

     await pool.query('UPDATE office SET ? WHERE id = ?', [office, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            office: office
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('DELETE FROM office WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;