export const ADD_LIBRARY = 'ADD_LIBRARY';
export const REMOVE_LIBRARY = 'REMOVE_LIBRARY';

export const addLibrary = (library) => ({
    type: ADD_LIBRARY,
    payload: library,
});

export const removeLibrary = (id) => ({
    type: REMOVE_LIBRARY,
    payload: id,
});

// Exportação padrão para evitar o aviso
export default {
    addLibrary,
    removeLibrary,
};
