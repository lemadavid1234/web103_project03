const getAllGyms = async () => {
    const response = await fetch('/api/gyms')
    const data = await response.json()

    return data
}

//exports an object that holds the function
//shorthand for { getAllGyms: getAllGyms }
//
export default { getAllGyms }
