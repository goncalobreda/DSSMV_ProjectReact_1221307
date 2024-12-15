import {
    getLibraries,
    createLibrary,
    getLibraryBooks,
    createBook,
    deleteLibrary,
    editLibrary,
    getCheckedOutBooks,
    checkInBook,
    extendCheckout, checkoutBook,
} from '../services/api';

// Action Types
export const FETCH_LIBRARIES = 'FETCH_LIBRARIES';
export const ADD_LIBRARY = 'ADD_LIBRARY';
export const REMOVE_LIBRARY = 'REMOVE_LIBRARY';
export const EDIT_LIBRARY = 'EDIT_LIBRARY';

export const FETCH_LIBRARY_BOOKS = 'FETCH_LIBRARY_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';

export const FETCH_CHECKED_OUT_BOOKS = 'FETCH_CHECKED_OUT_BOOKS';
export const CHECK_IN_BOOK = 'CHECK_IN_BOOK';
export const EXTEND_CHECKOUT = 'EXTEND_CHECKOUT';
export const CHECKOUT_BOOK = 'CHECKOUT_BOOK';

// Actions

// Fetch all libraries
export const fetchLibraries = () => async (dispatch) => {
    try {
        const libraries = await getLibraries();
        dispatch({ type: FETCH_LIBRARIES, payload: libraries });
    } catch (error) {
        console.error('Erro ao buscar bibliotecas:', error);
        throw error;
    }
};

// Add a new library
export const addLibraryAction = (libraryData) => async (dispatch) => {
    try {
        const library = await createLibrary(libraryData);
        dispatch({ type: ADD_LIBRARY, payload: library });
    } catch (error) {
        console.error('Erro ao adicionar biblioteca:', error);
        throw error;
    }
};

// Remove a library
export const deleteLibraryAction = (libraryId) => async (dispatch) => {
    try {
        await deleteLibrary(libraryId);
        dispatch({ type: REMOVE_LIBRARY, payload: libraryId });
    } catch (error) {
        console.error('Erro ao remover biblioteca:', error);
        throw error;
    }
};

// Edit a library
export const editLibraryAction = (libraryId, updatedData) => async (dispatch) => {
    try {
        const updatedLibrary = await editLibrary(libraryId, updatedData);
        dispatch({ type: EDIT_LIBRARY, payload: updatedLibrary });
    } catch (error) {
        console.error('Erro ao editar biblioteca:', error);
        throw error;
    }
};

// Fetch books of a specific library
export const fetchLibraryBooks = (libraryId) => async (dispatch) => {
    try {
        const books = await getLibraryBooks(libraryId);
        dispatch({ type: FETCH_LIBRARY_BOOKS, payload: { libraryId, books } });
    } catch (error) {
        console.error('Erro a encontrar livros da biblioteca:', error);
        throw error;
    }
};

// Create a book in a library
export const addBookAction = (libraryId, isbn, stock) => async (dispatch) => {
    try {
        const newBook = await createBook(libraryId, isbn, stock);
        dispatch({ type: CREATE_BOOK, payload: newBook });
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        throw error;
    }
};

// Fetch checked-out books for a user
export const fetchCheckedOutBooks = (userId) => async (dispatch) => {
    try {
        const books = await getCheckedOutBooks(userId);
        dispatch({ type: FETCH_CHECKED_OUT_BOOKS, payload: { userId, books } });
    } catch (error) {
        console.error('Erro ao buscar livros emprestados:', error);
        throw error;
    }
};

// Check in a book
export const checkInBookAction = (libraryId, bookId, userId) => async (dispatch) => {
    try {
        await checkInBook(libraryId, bookId, userId);
        dispatch({ type: CHECK_IN_BOOK, payload: { libraryId, bookId, userId } });
    } catch (error) {
        console.error('Erro ao devolver livro:', error);
        throw error;
    }
};

// Extend a checkout
export const extendCheckoutAction = (checkoutId) => async (dispatch) => {
    try {
        const updatedCheckout = await extendCheckout(checkoutId);

        dispatch({
            type: EXTEND_CHECKOUT,
            payload: {
                id: updatedCheckout.id,
                userId: updatedCheckout.userId,
                newDueDate: updatedCheckout.dueDate,
            },
        });
    } catch (error) {
        console.error('Erro ao estender prazo do empréstimo:', error.response?.data || error.message);
        throw error;
    }
};

export const checkoutBookAction = (libraryId, bookId, userId) => async (dispatch) => {
    console.log('Checkout Params:', { libraryId, bookId, userId }); // Verifica os parâmetros

    if (!libraryId || !bookId || !userId) {
        console.error('Parâmetros inválidos para checkout.');
        throw new Error('Parâmetros inválidos: libraryId, bookId ou userId estão undefined.');
    }

    try {
        const updatedBook = await checkoutBook(libraryId, bookId, userId);
        dispatch({
            type: CHECKOUT_BOOK,
            payload: {
                book: { ...updatedBook.book, id: updatedBook.book.id || Date.now() }, // Fallback para ID
                available: updatedBook.available,
                userId: userId,
                libraryId: libraryId,
            },
        });
    } catch (error) {
        console.error('Erro ao fazer checkout do livro:', error);
        throw error;
    }
};





export default {
    fetchLibraries,
    addLibraryAction,
    deleteLibraryAction,
    editLibraryAction,
    fetchLibraryBooks,
    addBookAction,
    fetchCheckedOutBooks,
    checkInBookAction,
    extendCheckoutAction,
    checkoutBookAction,
};
