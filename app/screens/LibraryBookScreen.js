import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LibraryBookScreen = () => (
    <View style={styles.container}>
        <Text>Livros da Biblioteca</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LibraryBookScreen;
