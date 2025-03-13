import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';

export default function Meals() {

    const [loadedMeals, setLoadedMeal] = useState([]);

    useEffect(() => {
		async function fetchMeals() {
			const response = await axios.get('http://localhost:3000/meals')
			if (!response.ok) {
				///..
            }
            
			const meals = response.data
            console.log(meals)

			setLoadedMeal(meals)
		}

		fetchMeals()
	}, [])

    return (
        <ul id='meals'>
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    )
}
