import { useEffect } from "react"
import { useWorkoutsContext } from "./hooks/useWorkoutsContext"

//components
import WorkoutDetails from '../pages/components/WorkoutDetails'
import WorkoutForm from '../pages/components/WorkoutForm'

const backendBaseURL="https://workout-buddy-backend-pmfl.onrender.com/"

const Home = () => {
  const {workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${backendBaseURL}api/workouts`)
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    fetchWorkouts()
  }, [dispatch])

    return (
      <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        </div>
        <WorkoutForm/>
      </div>
    )
  }
  
  export default Home