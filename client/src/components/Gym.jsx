import React from 'react'
import '../css/Events.css'

const Gym = ({ name, address, image_url, website }) => {
    return (
        <article className='gym-information'>
            <img src={image_url} alt={name} />

            <div className='gym-information-overlay'>
                <div className='text'>
                    <h3>{name}</h3>
                    <p>{address}</p>
                    <a href={website} target='_blank' rel='noreferrer'>Visit website</a>
                </div>
            </div>
        </article>
    )
}

export default Gym
