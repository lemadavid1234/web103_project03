import { pool } from '../config/database.js';



const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}


const getGymsByLocation = async (req, res) => {
    try {
        //Get every gym in the requested borough (e.g /api/locations/brooklyn/gyms)
        //JOIN links each gym to its borough via gyms.location_id = locations.id
        //so we can filter by the borough's name instead of its id.
        //LOWER() on both sides makes the match-case insensitive ("brooklyn" = "Brooklyn")
        //$1 is filled in safely by pg with req.params.borough
        const results = await pool.query(`
            SELECT gyms.* FROM gyms
            JOIN locations ON gyms.location_id = locations.id
            WHERE LOWER(locations.name) = LOWER($1)
            ORDER BY gyms.id ASC
        `,
            [req.params.borough]
        )
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}



export default {
    getLocations,
    getGymsByLocation
}
