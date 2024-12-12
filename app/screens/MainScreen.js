import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';

export default function MainScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState('');

    const handleCheckouts = () => {
        if (!userId.trim()) {
            Alert.alert('Erro', 'Por favor, insira um User ID válido.');
            return;
        }

        setModalVisible(false);
        navigation.navigate('Checkouts', { userId });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Área de Gestão</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Libraries')}
            >
                <Text style={styles.buttonText}>Ver Bibliotecas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Checkouts</Text>
            </TouchableOpacity>

            {/* Modal para Inserção de User ID */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Inserir User ID</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="User ID"
                            placeholderTextColor="#666"
                            value={userId}
                            onChangeText={setUserId}
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleCheckouts}
                        >
                            <Text style={styles.modalButtonText}>Confirmar</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        width: 200,
    },
    buttonText: {
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
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        width: '100%',
        color: '#333',
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#333',
    },
});
