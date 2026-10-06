import './dotenv.js'
import { pool } from "./database.js"
import locationData from '../data/locations.js'
import gymData from '../data/gyms.js'

    // {
    //     id: 1,
    //     name: 'The Post',
    //     borough: 'Brooklyn',
    //     address: '53 Knickerbocker Ave, Bushwick, Brooklyn',
    //     image_url: 'https://images.squarespace-cdn.com/content/v1/64d451b81358c050d2fe7f4e/f8322336-847f-40d8-936e-f7afd4511a18/IMG_2898.jpg',
    //     website: 'https://www.thepostbk.com/'
    // },


const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS gyms;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS gyms (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id),
            address VARCHAR(255) NOT NULL,
            image_url TEXT,
            website TEXT
        )
    `

    try {
        await pool.query(createTablesQuery);
        console.log('locations and gyms tables created successfully');
    } catch (error) {
        console.log('error creating tables', error)
    }
}

const seedLocationsTable = async () => {
    for (const location of locationData) {
        try {
            await pool.query('INSERT INTO locations (name) VALUES ($1)', [location.name])
            console.log(`${location.name} added successfully`)
        } catch (err) {
            console.log('error inserting location', err)
        }
    }
}

const seedGymsTable = async () => {
    for (const gym of gymData) {
        const insertQuery = {
            // look up the borough's id in the locations table by name
            text: 'INSERT INTO gyms (name, location_id, address, image_url, website) VALUES ($1, (SELECT id FROM locations WHERE name = $2), $3, $4, $5)',
            values: [gym.name, gym.borough, gym.address, gym.image_url, gym.website]
        }

        try {
            await pool.query(insertQuery)
            console.log(`${gym.name} added successfully`)
        } catch (err) {
            console.log('error inserting gym', err)
        }
    }
}

const resetDatabase = async () => {
    await createTables()
    await seedLocationsTable()
    await seedGymsTable()
    await pool.end()
}


resetDatabase()
