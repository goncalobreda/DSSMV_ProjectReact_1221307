import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LibrariesScreen from '../screens/LibrariesScreen';
import LibraryBookScreen from '../screens/LibraryBookScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import BookEditScreen from '../screens/BookEditScreen';
import AddLibraryScreen from '../screens/AddLibraryScreen';
import AddBookScreen from '../screens/AddBookScreen';
import CheckoutsScreen from '../screens/CheckoutsScreen';

const Stack = createStackNavigator();

const Navigation = () => (
    <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Libraries" component={LibrariesScreen} />
        <Stack.Screen name="LibraryBooks" component={LibraryBookScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="BookEdit" component={BookEditScreen} />
        <Stack.Screen name="AddLibrary" component={AddLibraryScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="Checkouts" component={CheckoutsScreen} />
    </Stack.Navigator>
);

export default Navigation;
