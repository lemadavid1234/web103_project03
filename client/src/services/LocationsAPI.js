const getAllLocations = async () => {
    const response = await fetch('/api/locations')
    const data = await response.json()
    return data
}

const getGymsByLocation = async (borough) => {
    const response = await fetch(`/api/locations/${borough}/gyms`)
    const data = await response.json()
    return data
}

export default { getAllLocations, getGymsByLocation }
