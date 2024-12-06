import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LibrariesScreen = () => (
    <View style={styles.container}>
        <Text>Bibliotecas</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LibrariesScreen;
