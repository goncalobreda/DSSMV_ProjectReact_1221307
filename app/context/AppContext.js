import React, { createContext, useReducer } from 'react';
import reducer from './reducer'; // Certifique-se que o caminho está correto
import initialState from './state'; // Certifique-se que o caminho está correto

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
