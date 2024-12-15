import React, {useContext, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import {AppContext} from "../context/AppContext";
import {addLibraryAction} from "../context/actions";

export default function AddLibraryScreen({ navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [openDays, setOpenDays] = useState('');
    const { dispatch } = useContext(AppContext);

    const handleCreate = async () => {
        if (!name || !address || !openTime || !closeTime || !openDays) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(openTime) || !timeRegex.test(closeTime)) {
            Alert.alert('Erro', 'Por favor, insira as horas no formato HH:mm.');
            return;
        }

        try {
            await addLibraryAction(
                { name, address, openTime, closeTime, openDays }
            )(dispatch);

            Alert.alert('Sucesso', 'Biblioteca criada com sucesso.');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao criar biblioteca:', error);
            Alert.alert('Erro', 'Não foi possível criar a biblioteca.');
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
                        <Text style={styles.title}>Criar Nova Biblioteca</Text>
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
                        <TouchableOpacity style={styles.button} onPress={handleCreate}>
                            <Text style={styles.buttonText}>Criar</Text>
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