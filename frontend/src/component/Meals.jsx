import useHttp from '../hooks/useHttp';
import MealItem from './MealItem';
import Error from './Error';

const requestConfig = {}

export default function Meals() {
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp(`${apiUrl}/meals`,requestConfig,[])

    if (isLoading) {
        return <p className='center'>Fetching Meals...</p>
    }
    if (error) {
        return <Error title='failed to fetch meals' message={error} />
    }
    return (
        <ul id='meals'>
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    )
}
