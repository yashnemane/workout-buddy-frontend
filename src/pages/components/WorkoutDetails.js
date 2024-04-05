import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const backendBaseURL="https://workout-buddy-backend-pmfl.onrender.com/"

const WorkoutDetails = ({ workout }) => {
    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts' + workout._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
                'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
            }
      })

        /*const response = await fetch('https://workout-buddy-backend-pmfl.onrender.com/api/workouts/' + workout._id, {
            method: 'DELETE'
        })*/
        
        const json = await response.json()

        if(!response.ok){
            console.log('error')
        }
        if(response.ok){
            console.log(`Workout with id:${workout._id} deleted`,json)
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
         <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails
