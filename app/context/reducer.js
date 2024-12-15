import {
    ADD_LIBRARY,
    REMOVE_LIBRARY,
    FETCH_LIBRARIES,
    ADD_BOOK,
    FETCH_BOOKS,
    CREATE_BOOK,
    CHECK_IN_BOOK,
    EXTEND_CHECKOUT,
} from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        // Libraries
        case ADD_LIBRARY:
            return { ...state, libraries: [...state.libraries, action.payload] };

        case REMOVE_LIBRARY:
            return { ...state, libraries: state.libraries.filter(lib => lib.id !== action.payload) };

        case FETCH_LIBRARIES:
            return { ...state, libraries: action.payload };

        // Books
        case ADD_BOOK:
            return { ...state, books: [...state.books, action.payload] };

        case FETCH_BOOKS:
            return { ...state, books: action.payload };

        case CREATE_BOOK:
            return { ...state, books: [...state.books, action.payload] };

        // Checkouts
        case CHECK_IN_BOOK:
            return {
                ...state,
                checkedOutBooks: state.checkedOutBooks.filter(book => book.id !== action.payload),
            };

        case EXTEND_CHECKOUT:
            return {
                ...state,
                checkedOutBooks: state.checkedOutBooks.map(book =>
                    book.id === action.payload
                        ? { ...book, dueDate: new Date(new Date(book.dueDate).getTime() + 7 * 24 * 60 * 60 * 1000) }
                        : book
                ),
            };

        default:
            return state;
    }
};

export default reducer;
