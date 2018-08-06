import axios from "axios"

export function fetchPoro(id){
    return function(dispatch){
        axios.get("/api/users/"+id)
            .then(res => {
                dispatch({type: "FETCH_PORO_FULFILLED", payload: res.data})
            })
            .catch(error => {
                dispatch({type: "FETCH_PORO_REJECTED", payload: error})
            })
    }
}