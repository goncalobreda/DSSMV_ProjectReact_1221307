// Action Types
export const ADD_LIBRARY = 'ADD_LIBRARY';
export const REMOVE_LIBRARY = 'REMOVE_LIBRARY';
export const FETCH_LIBRARIES = 'FETCH_LIBRARIES';

export const ADD_BOOK = 'ADD_BOOK';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';

export const CHECK_IN_BOOK = 'CHECK_IN_BOOK';
export const EXTEND_CHECKOUT = 'EXTEND_CHECKOUT';

// Library Actions
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

// Book Actions
export const addBook = (book) => ({
    type: ADD_BOOK,
    payload: book,
});

export const fetchBooks = (books) => ({
    type: FETCH_BOOKS,
    payload: books,
});

export const createBook = (book) => ({
    type: CREATE_BOOK,
    payload: book,
});

export const checkInBook = (bookId) => ({
    type: CHECK_IN_BOOK,
    payload: bookId,
});

export const extendCheckout = (checkoutId) => ({
    type: EXTEND_CHECKOUT,
    payload: checkoutId,
});

export default {
    addLibrary,
    removeLibrary,
    fetchLibraries,
    addBook,
    fetchBooks,
    createBook,
    checkInBook,
    extendCheckout,
};
