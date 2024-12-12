import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,} from 'react-native';
import { editLibrary } from '../services/api';

export default function EditLibraryScreen({ route, navigation }) {
    const { libraryId, libraryData } = route.params || {};

    if (!libraryId || !libraryData) {
        console.error('Erro: ID ou dados da biblioteca ausentes.');
        return null;
    }

    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const [name, setName] = useState(libraryData?.name || '');
    const [address, setAddress] = useState(libraryData?.address || '');
    const [openTime, setOpenTime] = useState(formatTime(libraryData?.openTime) || '');
    const [closeTime, setCloseTime] = useState(formatTime(libraryData?.closeTime) || '');
    const [openDays, setOpenDays] = useState(libraryData?.openDays || '');

    const handleUpdate = async () => {
        if (!name || !address || !openTime || !closeTime || !openDays) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(openTime) || !timeRegex.test(closeTime)) {
            Alert.alert('Erro', 'Por favor, insira as horas no formato HH:mm.');
            return;
        }

        const updatedData = { name, address, openTime, closeTime, openDays };

        console.log('Library ID:', libraryId); // Log do ID da biblioteca
        console.log('Dados enviados para a API:', updatedData); // Log dos dados atualizados

        try {
            await editLibrary(libraryId, updatedData);
            Alert.alert('Sucesso', 'Biblioteca atualizada com sucesso.');
            navigation.goBack(); // Voltar para a lista de bibliotecas
        } catch (error) {
            console.error('Erro ao atualizar biblioteca:', error.response || error);
            const errorMessage = error.response?.data?.message || 'Erro desconhecido.';
            Alert.alert('Erro', `Não foi possível atualizar a biblioteca. Detalhes: ${errorMessage}`);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Biblioteca</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            placeholderTextColor="#666"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Morada"
                            placeholderTextColor="#666"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Hora de Abertura (HH:mm)"
                            placeholderTextColor="#666"
                            value={openTime}
                            onChangeText={setOpenTime}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Hora de Fecho (HH:mm)"
                            placeholderTextColor="#666"
                            value={closeTime}
                            onChangeText={setCloseTime}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Dias Abertos (ex: Segunda a Sexta)"
                            placeholderTextColor="#666"
                            value={openDays}
                            onChangeText={setOpenDays}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Confirmar alterações</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
