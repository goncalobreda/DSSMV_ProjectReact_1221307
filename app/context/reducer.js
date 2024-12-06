import { ADD_LIBRARY, REMOVE_LIBRARY } from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_LIBRARY:
            return { ...state, libraries: [...state.libraries, action.payload] };
        case REMOVE_LIBRARY:
            return { ...state, libraries: state.libraries.filter(lib => lib.id !== action.payload) };
        default:
            return state;
    }
};

export default reducer;
