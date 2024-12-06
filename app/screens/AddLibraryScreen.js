import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddLibraryScreen = () => (
    <View style={styles.container}>
        <Text>Adicionar Biblioteca</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddLibraryScreen;
