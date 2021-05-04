import React, { useState, useContext } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import {RestaurantsContext} from '../context/restaurantsContext'



const AddRestaurants = () => {
    const [name, setName] = useState()
    const [location, setLocation] = useState()
    const [priceRange, setPriceRange] = useState('Price Range')
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post('/', {
                name,
                location,
                price_range: priceRange
            })

            setRestaurants([...restaurants, response.data.data.restaurant])
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="mb-4" >
            <form action="">
                <div className="form-row" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder='name' />
                    </div>
                    <div className="col" >
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder='location' />
                    </div>
                    <div className="col" >
                        <select
                            value={priceRange}
                            onChange={e => setPriceRange(e.target.value)}
                            className="custom-select my-1 mr-sm-2"
                            placeholder='location'
                            style={{ borderRadius: '4px', border: '1px solid rgb(206, 212, 218)', fontSize: '14px', height: '38px' }}
                        >
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Add</button>
                </div>
            </form>
        </div >
    )
}

export default AddRestaurants
