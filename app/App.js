import React from 'react';
import Navigation from './navigation/Navigation'; // Certifique-se que o caminho está correto
import { AppProvider } from './context/AppContext'; // Certifique-se que o caminho está correto

export default function App() {
    return (
        <AppProvider>
            <Navigation />
        </AppProvider>
    );
}
