import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css';


const SearchComponent = () => {

    const [restaurantName, setRestaurantName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [listDishes, setListDishes] = useState([])
    const [isOpenDishes, setIsOpenDishes] = useState(true)
    const [isOpenRestaurants, setIsOpenRestaurants] = useState(false)


    const getRestaurantName = (e) => {
        setRestaurantName(e.target.value)
    }

    const searchRestaurant = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('https://staging.tikusdelivery.com/api/searchDishesAndRestaurants', {
            longitude: 38.780127,
            latitude: 9.003869,
            pageNumber: 1,
            restaurantName: restaurantName
        }).then(res => {
            setRestaurants(res.data.listRestaurants)
            setListDishes(res.data.listDishes)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        }
        )
    }

    const openDishes = () => {
        setIsOpenDishes(true)
        setIsOpenRestaurants(false)
    }
    const openRestaurants = () => {
        setIsOpenRestaurants(true)
        setIsOpenDishes(false)
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={searchRestaurant}>
                            <div className="col-md-12 col-lg-12 col-xl-8 mx-auto">
                                <div className="card mb-2">
                                    <div className="card-body p-2">
                                        <div className="input-group input-group-lg">
                                            <input type="text" className="form-control rounded" placeholder="What do you want to eat ?" onChange={getRestaurantName} />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ul className="nav nav-tabs mb-2 ml-5" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="ex1-tab-1" data-mdb-toggle="tab" href="#ex1-tabs-1" role="tab"
                        aria-controls="ex1-tabs-1" aria-selected="true"
                        onClick={openDishes}>Dishes</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="ex1-tab-2" data-mdb-toggle="tab" href="#ex1-tabs-2" role="tab" aria-controls="ex1-tabs-2"
                        aria-selected="false" onClick={openRestaurants}>Restaurants</a>
                </li>
            </ul>
            <div className="container" hidden={!isOpenDishes}>
                <div className="row">
                    {isLoading ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        listDishes.map((listDishe, index) => {
                            return (
                                listDishe.dishesList.map((dish, index) => {
                                    return (
                                        <div className="col-md-2 mt-5" key={index}>
                                            <div className="card h-100" role="button">
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <img src={dish.image} alt="food image" className="img-fluid" />
                                                        <small className="card-title">{dish.name}</small>
                                                    </div>

                                                </div>
                                                <div className="card-footer">
                                                    <p><b>{dish.price} </b>ETB</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            )
                        }
                        )}

                </div>
            </div>

            <div className="container" hidden={!isOpenRestaurants}>
                <div className="row">
                    {isLoading ?
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        :
                        restaurants.map((restaurant, index) => {
                            return (
                                <div className="col-md-4 mt-5" key={index}>
                                    <div className="card h-100" role="button">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img src={restaurant.restaurantImage} alt="food image" className="img-fluid" />
                                            </div>
                                            <div className="text-center">
                                                <h5 className="font-weight-bold">{restaurant.restaurantName}</h5>
                                                <p>{restaurant.displayTime}</p>
                                                <p>{restaurant.cuisines}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SearchComponent