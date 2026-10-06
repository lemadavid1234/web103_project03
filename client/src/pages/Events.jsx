import React, { useState, useEffect } from 'react'
import Gym from '../components/Gym'
import GymsAPI from '../services/GymsAPI'
import '../css/Events.css'

const Gyms = () => {
    const [gyms, setGyms] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const gymsData = await GymsAPI.getAllGyms()
                setGyms(gymsData)
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className='gyms'>
            {
                gyms && gyms.length > 0 ? gyms.map((gym) =>
                    <Gym
                        key={gym.id}
                        name={gym.name}
                        address={gym.address}
                        image_url={gym.image_url}
                        website={gym.website}
                    />
                ) : <h2>No gyms found!</h2>
            }
        </div>
    )
}

export default Gyms
