import React, { useEffect, useContext } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantsContext } from '../context/restaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from '../components/StarRating'

const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    let history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err)
            }
        }

        fetchData();

    }, [setRestaurants])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {

            await RestaurantFinder.delete(`/${id}`)

            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id

            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }
        return (<>
            <StarRating rating={restaurant.id} />
            <span className='text-warning ml-1'>({restaurant.count})</span>
        </>)
    }


    return (

        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((el) => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(el.id)} key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.location}</td>
                                <td>{"$".repeat(el.price_range)}</td>
                                <td>{renderRating(el)}</td>
                                <td><button onClick={(e) => handleUpdate(e, el.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, el.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    }
                    )}

                    {/* <tr className="bg-primary">
                        <td>mcdonalds</td>
                        <td>New York</td>
                        <td>$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>

        </div>
    )
}

export default RestaurantList
