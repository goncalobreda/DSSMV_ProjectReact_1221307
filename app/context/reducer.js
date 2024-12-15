import {
    FETCH_LIBRARIES,
    ADD_LIBRARY,
    REMOVE_LIBRARY,
    EDIT_LIBRARY,
    FETCH_LIBRARY_BOOKS,
    CREATE_BOOK,
    FETCH_CHECKED_OUT_BOOKS,
    CHECK_IN_BOOK,
    EXTEND_CHECKOUT,
} from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        // Libraries
        case FETCH_LIBRARIES:
            return {
                ...state,
                libraries: action.payload,
            };

        case ADD_LIBRARY:
            return {
                ...state,
                libraries: [...state.libraries, action.payload],
            };

        case REMOVE_LIBRARY:
            return {
                ...state,
                libraries: state.libraries.filter(
                    (library) => library.id !== action.payload
                ),
            };

        case EDIT_LIBRARY:
            return {
                ...state,
                libraries: state.libraries.map((library) =>
                    library.id === action.payload.id ? action.payload : library
                ),
            };

        // Books
        case FETCH_LIBRARY_BOOKS:
            return {
                ...state,
                books: {
                    ...state.books,
                    [action.payload.libraryId]: action.payload.books,
                },
            };

        case CREATE_BOOK:
            return {
                ...state,
                books: {
                    ...state.books,
                    [action.payload.libraryId]: [
                        ...(state.books[action.payload.libraryId] || []),
                        action.payload,
                    ],
                },
            };

        // Checkouts
        case FETCH_CHECKED_OUT_BOOKS:
            return {
                ...state,
                checkedOutBooks: {
                    ...state.checkedOutBooks,
                    [action.payload.userId]: action.payload.books,
                },
            };

        case CHECK_IN_BOOK:
            return {
                ...state,
                checkedOutBooks: {
                    ...state.checkedOutBooks,
                    [action.payload.userId]: (state.checkedOutBooks[action.payload.userId] || [])
                        .filter((book) => book.bookId !== action.payload.bookId),
                },
            };

        case EXTEND_CHECKOUT:
            return {
                ...state,
                checkedOutBooks: {
                    ...state.checkedOutBooks,
                    [action.payload.userId]: state.checkedOutBooks[action.payload.userId].map((book) =>
                        book.id === action.payload.id
                            ? { ...book, dueDate: action.payload.newDueDate }
                            : book
                    ),
                },
            };

        default:
            return state;
    }
};

export default reducer;
