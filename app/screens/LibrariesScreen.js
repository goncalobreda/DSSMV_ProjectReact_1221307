import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { getLibraries, deleteLibrary } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function LibrariesScreen({ navigation }) {
    const [libraries, setLibraries] = useState([]);
    const [selectedLibrary, setSelectedLibrary] = useState(null); // Biblioteca selecionada
    const [modalVisible, setModalVisible] = useState(false); // Visibilidade do modal

    // Função para buscar as bibliotecas
    const fetchLibraries = async () => {
        try {
            const data = await getLibraries();
            setLibraries(data);
        } catch (error) {
            console.error('Erro ao buscar bibliotecas:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchLibraries().catch((error) => {
                console.error('Erro ao carregar bibliotecas:', error);
            });
        }, [])
    );

    const handleDelete = async (libraryId) => {
        Alert.alert(
            'Confirmação',
            'Tem a certeza de que deseja eliminar esta biblioteca?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteLibrary(libraryId);
                            setLibraries((prevLibraries) =>
                                prevLibraries.filter((library) => library.id !== libraryId)
                            );
                            setModalVisible(false); // Fechar o modal
                            Alert.alert('Sucesso', 'Biblioteca eliminada com sucesso.');
                        } catch (error) {
                            console.error('Erro ao eliminar biblioteca:', error);
                            Alert.alert('Erro', 'Não foi possível eliminar a biblioteca.');
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (library) => {
        setModalVisible(false);
        navigation.navigate('LibraryEdit', {
            libraryId: library.id, // Certifique-se de passar o ID
            libraryData: library, // Passar os dados da biblioteca
        });
    };




    const openOptions = (library) => {
        if (library) {
            setSelectedLibrary(library); // Define a biblioteca selecionada
            setModalVisible(true); // Abre o modal
        }
    };

    const renderLibraryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.libraryItem}
            onLongPress={() => openOptions(item)} // Pressionar e manter para abrir opções
            onPress={() => navigation.navigate('LibraryBooks', { libraryId: item.id })}
        >
            <Text style={styles.libraryName}>{item.name}</Text>
            <Text style={styles.libraryAddress}>{item.address}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Botão para adicionar uma nova biblioteca */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddLibrary')}
            >
                <Text style={styles.addButtonText}>+ Adicionar Biblioteca</Text>
            </TouchableOpacity>

            {/* Lista de bibliotecas */}
            <FlatList
                data={libraries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLibraryItem}
                contentContainerStyle={styles.list}
            />

            {/* Modal para opções */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Opções para {selectedLibrary?.name || 'Biblioteca'}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleEdit(selectedLibrary)}
                        >
                            <Text style={styles.modalButtonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.deleteButton]}
                            onPress={() => handleDelete(selectedLibrary?.id)}
                        >
                            <Text style={styles.modalButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        shadowOpacity: 0.2,
        shadowRadius: 4,
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
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#333',
    },
});
