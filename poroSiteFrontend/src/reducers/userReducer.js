export default function reducer(state={
        user: null,
        loggedin: false,
        session: null,
        fetching: false,
        message: null,
        error: null
    }, action) {

        switch(action.type) {
            case "FETCH_USER": {
                return {...state, fetching: true}
            }
            case "FETCH_USER_FULFILLED": {
                return {...state, fetching: false, user: action.payload, loggedin: true}
            }
            case "FETCH_USER_REJECTED": {
                window.localStorage.clear()
                return {...state, fetching: false, error: action.payload}
            }
            case "SET_MAINPORO_FULFILLED": {
                var u = state.user
                u.mainporo=action.payload
                return {...state, fetching: false, user: u}
            }
            case "CHANGE_USER": {
                return {...state, user: action.payload, loggedin: true}
            }
            case "REMOVE_USER": {
                return {...state, user: null, loggedin: false, error: null}
            }
        }
        return state
}