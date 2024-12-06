import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookEditScreen = () => (
    <View style={styles.container}>
        <Text>Editar Livro</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BookEditScreen;
