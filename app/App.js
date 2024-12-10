import React from 'react';
import Navigation from './navigation/Navigation';
import { AppProvider } from './context/AppContext';

export default function App() {
    return (
        <AppProvider>
            <Navigation />
        </AppProvider>
    );
}
