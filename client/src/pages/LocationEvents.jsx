import React, { useState, useEffect } from 'react'
import Gym from '../components/Gym'
import '../css/LocationEvents.css'
import LocationsAPI from '../services/LocationsAPI'

const LocationEvents = ( {borough} ) => {
    const [gyms, setGyms] = useState([])


    useEffect(() => {
        const loadGyms = async () => {
            try {
                const gymsData = await LocationsAPI.getGymsByLocation(borough)
                setGyms(gymsData)
            } catch (error) {
                console.error(error)
            }
        }

        loadGyms()
    }, [borough])

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>{borough}</h2>
                </div>
            </header>

            <main>
                {
                    gyms && gyms.length > 0 ? gyms.map((gym) =>
                        <Gym
                            key={gym.id}
                            name={gym.name}
                            address={gym.address}
                            image_url={gym.image_url}
                            website={gym.website}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No gyms in this borough yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
