import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddBookScreen = () => (
    <View style={styles.container}>
        <Text>Adicionar Livro</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddBookScreen;
