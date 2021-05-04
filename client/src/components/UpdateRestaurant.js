import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RestaurantFinder from '../api/RestaurantFinder'

const UpdateRestaurant = () => {
    let history = useHistory()
    const [name, setName] = useState()
    const [location, setLocation] = useState()
    const [priceRange, setPriceRange] = useState('Price Range')
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range: priceRange
        })
        history.push('/')
    }
    return (
        <div>
            <form>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name"
                        className="form-control"
                        type='text'
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="Location">Location</label>
                    <input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        id="location"
                        className="form-control"
                        type='text'
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="price_range">Price Range</label>
                    <select
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}
                        className="custom-select my-1 mr-sm-2"
                        placeholder='location'
                        style={{ borderRadius: '4px', border: '1px solid rgb(206, 212, 218)', fontSize: '25.5px' }}
                        type="text"
                        >
                        

                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} className='btn btn-primary'>Update</button>
            </form>


        </div>
    )
}

export default UpdateRestaurant
