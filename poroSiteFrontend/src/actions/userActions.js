import axios from "axios"

export function validateSession(session, id){
    return function(dispatch){
        var conf = {
            "headers": {
              "Token": session,
              "Id": id
            }
          }
        axios.get("/validatesession", conf)
            .then(res => {
                if(res.data.valid){
                    dispatch({type: "FETCH_USER_FULFILLED", payload: res.data})
                }else{
                    dispatch({type: "FETCH_USER_REJECTED", payload: "Session not valid, please log in again. If this error persists, please, send a Twitch message to C0ok13."})
                }
            })
            .catch(error => {
                dispatch({type: "FETCH_USER_REJECTED", payload: error})
            })
    }
}

export function login(code){
    return function(dispatch){
        axios.get("/login?code="+code)
            .then(res => {
                if(res.data.session){
                    dispatch({type: "FETCH_USER_FULFILLED", payload: res.data.user})
                    window.localStorage.setItem('loggedUserData', JSON.stringify(res.data))
                }else{
                    dispatch({type: "FETCH_USER_REJECTED", payload: res.error})
                }
            })
            .catch(error => {
                dispatch({type: "FETCH_USER_REJECTED", payload: error})
            })
    }
}

export function logout(){ 
    return function(dispatch){
        window.localStorage.clear()
        dispatch({type: "REMOVE_USER"})
    }
}

export function set_user(user){
    return function(dispatch){
        dispatch({type: "CHANGE_USER", payload: user})
    }
}

export function changeMainPoro(session, id, poro){
    return function(dispatch){
        axios.get("/setmainporo", {
            "id": id,
            "session": session
        })
            .then(res => {
                if(res.data.message){
                    dispatch({type: "SET_MAINPORO_FULFILLED", payload: res.data})
                }else{
                    dispatch({type: "ERROR", payload: res.data.error})
                }
            })
            .catch(error => {
                dispatch({type: "ERROR", payload: error})
            })
    }
}