import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';
import { fetchLibraries, deleteLibraryAction } from '../context/actions';

export default function LibrariesScreen({ navigation }) {
    const { state, dispatch } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLibrary, setSelectedLibrary] = useState(null);
    const libraries = state.libraries || []; // Garantimos que libraries é sempre um array

    useEffect(() => {
        fetchLibraries()(dispatch).catch((error) => {
            console.error('Erro a carregar bibliotecas:', error);
        });
    }, [dispatch]);

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
                            await deleteLibraryAction(libraryId)(dispatch);
                            setModalVisible(false);
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
            libraryId: library.id,
            libraryData: library,
        });
    };

    const openOptions = (library) => {
        if (library) {
            setSelectedLibrary(library);
            setModalVisible(true);
        }
    };

    const renderLibraryItem = (library) => (
        <TouchableOpacity
            key={library.id}
            style={styles.libraryItem}
            onLongPress={() => openOptions(library)}
            onPress={() => navigation.navigate('LibraryBooks', { libraryId: library.id })}
        >
            <Text style={styles.libraryName}>{library.name}</Text>
            <Text style={styles.libraryAddress}>{library.address}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddLibrary')}
            >
                <Text style={styles.addButtonText}>+ Adicionar Biblioteca</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {libraries.map(renderLibraryItem)}
            </ScrollView>

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
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
        touchAction: 'auto',
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
