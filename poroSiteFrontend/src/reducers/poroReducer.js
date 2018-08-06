export default function reducer(state={
        poros: [],
        fetching: false,
        message: null,
        error: null,
    }, action) {

        switch(action.type) {
            case "FETCH_POROS":{
                return {...state, fetching: true}
            }
            case "FETCH_PORO_FULFILLED": {
                return {...state, fetching: false, poros: state.poros.concat(action.payload)}
            }
            case "FETCH_PORO_REJECTED": {
                return {...state, fetching: false, error: action.payload}
            }
            case "ERROR": {
                return {...state, error: action.payload}
            }
        }
        return state
}