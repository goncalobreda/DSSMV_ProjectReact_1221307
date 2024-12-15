import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import Popup from '../components/Popup';
import Input from '../components/Input';
import { AppContext } from '../context/AppContext';
import { fetchCheckedOutBooks } from '../context/actions';

export default function MainScreen({ navigation }) {
    const { state, dispatch } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false); // Flag para controlar redirecionamento

    useEffect(() => {
        if (isConfirmed && state.checkedOutBooks[userId]?.length > 0) {
            setModalVisible(false);
            navigation.navigate('Checkouts', { userId });
            setIsConfirmed(false);
        }
    }, [state.checkedOutBooks, userId, isConfirmed, navigation]);

    const handleCheckouts = async () => {
        if (!userId.trim()) {
            Alert.alert('Erro', 'O campo User ID não pode estar vazio.');
            return;
        }

        try {
            setIsConfirmed(true);
            await fetchCheckedOutBooks(userId)(dispatch);
        } catch (error) {
            setIsConfirmed(false);
            Alert.alert('Erro', 'Não foi possível verificar o utilizador. Tente novamente.');
            console.error('Erro ao verificar User ID:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Área de Gestão</Text>

            <Button
                title="Ver Bibliotecas"
                onPress={() => navigation.navigate('Libraries')}
            />

            <Button
                title="Checkouts"
                onPress={() => setModalVisible(true)}
            />

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
                            <Button
                                title="Confirmar"
                                onPress={handleCheckouts}
                            />
                            <Button
                                title="Cancelar"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                }
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
