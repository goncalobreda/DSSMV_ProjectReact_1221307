import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getLibraries } from '../services/api';

export default function LibrariesScreen({ navigation }) {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const data = await getLibraries();
                setLibraries(data);
            } catch (error) {
                console.error('Erro ao buscar bibliotecas:', error);
            }
        };

        fetchLibraries();
    }, []);

    const renderLibraryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.libraryItem}
            onPress={() => navigation.navigate('LibraryBooks', { libraryId: item.id })}
        >
            <Text style={styles.libraryName}>{item.name}</Text>
            <Text style={styles.libraryAddress}>{item.address}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={libraries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLibraryItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 10,
    },
    libraryItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    libraryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    libraryAddress: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});
