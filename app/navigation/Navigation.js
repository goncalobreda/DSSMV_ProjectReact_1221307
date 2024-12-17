import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LibrariesScreen from '../screens/LibrariesScreen';
import LibraryBookScreen from '../screens/LibraryBookScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import AddLibraryScreen from '../screens/AddLibraryScreen';
import AddBookScreen from '../screens/AddBookScreen';
import CheckoutsScreen from '../screens/CheckoutsScreen';
import EditLibraryScreen from '../screens/EditLibraryScreen';

const Stack = createStackNavigator();

const Navigation = () => (
    <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Libraries" component={LibrariesScreen} />
        <Stack.Screen name="LibraryBooks" component={LibraryBookScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="LibraryEdit" component={EditLibraryScreen} />
        <Stack.Screen name="AddLibrary" component={AddLibraryScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="Checkouts" component={CheckoutsScreen} />
    </Stack.Navigator>
);

export default Navigation;
