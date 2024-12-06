import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookDetailsScreen = () => (
    <View style={styles.container}>
        <Text>Detalhes do Livro</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BookDetailsScreen;
