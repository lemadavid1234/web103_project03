import { pool } from '../config/database.js';



const getGyms = async (req, res) => {
    
    try {
        const results = await pool.query('SELECT * FROM gyms ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } );
    }
}


const getGymsById = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM gyms WHERE id = $1', [req.params.gymId])
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json( {error: error.message } )
    }
}

export default {
    getGyms,
    getGymsById
}