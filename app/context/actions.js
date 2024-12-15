export const ADD_LIBRARY = 'ADD_LIBRARY';
export const REMOVE_LIBRARY = 'REMOVE_LIBRARY';
export const FETCH_LIBRARIES = 'FETCH_LIBRARIES';

export const addLibrary = (library) => ({
    type: ADD_LIBRARY,
    payload: library,
});

export const removeLibrary = (id) => ({
    type: REMOVE_LIBRARY,
    payload: id,
});

export const fetchLibraries = (libraries) => ({
    type: FETCH_LIBRARIES,
    payload: libraries,
});


export default {
    addLibrary,
    removeLibrary,
    fetchLibraries,
};
