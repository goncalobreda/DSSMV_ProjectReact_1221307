import { ADD_LIBRARY, REMOVE_LIBRARY, FETCH_LIBRARIES } from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_LIBRARY:
            return { ...state, libraries: [...state.libraries, action.payload] };
        case REMOVE_LIBRARY:
            return { ...state, libraries: state.libraries.filter(lib => lib.id !== action.payload) };
        case FETCH_LIBRARIES:
            return {...state, libraries: action.payload,};
        default:
            return state;
    }
};

export default reducer;
