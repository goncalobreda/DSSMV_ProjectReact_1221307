import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import Popup from '../components/Popup';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { checkoutBookAction } from '../context/actions';

export default function BookDetailsScreen({ route }) {
    const { book, available, libraryId } = route.params || {};

    const { dispatch } = useContext(AppContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [availableCount, setAvailableCount] = useState(available); // Novo estado local

    const authors = book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

    const handleCheckout = async () => {
        if (!userId.trim()) {
            Alert.alert('Erro', 'Por favor, insira um User ID.');
            return;
        }

        if (!libraryId || !book?.id) {
            Alert.alert('Erro', 'ID da biblioteca ou do livro está ausente.');
            return;
        }

        if (availableCount <= 0) {
            Alert.alert('Erro', 'Não há livros disponíveis para checkout.');
            return;
        }

        try {
            await checkoutBookAction(libraryId, book.id, userId)(dispatch);

            // Atualiza localmente o número de disponíveis
            setAvailableCount((prev) => prev - 1);

            Alert.alert('Sucesso', 'Livro emprestado com sucesso!');
            setModalVisible(false);
        } catch (error) {
            console.error('Erro ao fazer checkout:', error.response?.data || error.message);
            Alert.alert('Erro', 'Não foi possível fazer o checkout do livro.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{book.title || 'Título Desconhecido'}</Text>

            <Image
                source={{ uri: `http://193.136.62.24/v1/assets/cover/${book.isbn}-L.jpg` }}
                style={styles.coverImage}
                resizeMode="contain"
            />

            <View style={styles.section}>
                <Text style={styles.label}>Autor(es):</Text>
                <Text style={styles.infoText}>{authors}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.infoText}>{book.description || 'Nenhuma descrição disponível.'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Disponíveis:</Text>
                <Text style={styles.quantity}>{availableCount || 0}</Text>
            </View>

            {/* Botão de Checkout */}
            <Button title="Fazer Checkout" onPress={() => setModalVisible(true)} />

            {/* Popup para inserir o User ID */}
            <Popup
                visible={modalVisible}
                message={
                    <View style={styles.popupContent}>
                        <Text style={styles.modalTitle}>Inserir User ID</Text>
                        <Input
                            placeholder="User ID"
                            value={userId}
                            onChangeText={setUserId}
                            style={styles.input}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Confirmar" onPress={handleCheckout} />
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                }
                onClose={() => setModalVisible(false)}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    coverImage: {
        width: 200,
        height: 300,
        marginBottom: 20,
    },
    section: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    popupContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 300,
    },
    buttonContainer: {
        width: '100%',
        gap: 10,
        alignItems: 'center',
    },
});
