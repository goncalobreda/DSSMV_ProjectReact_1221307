import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

const Popup = ({ visible, message, onClose }) => (
    <Modal transparent={true} visible={visible}>
        <View style={styles.container}>
            <View style={styles.popup}>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.close} onPress={onClose}>Fechar</Text>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    message: {
        fontSize: 16,
        marginBottom: 10,
    },
    close: {
        color: 'blue',
        textAlign: 'right',
    },
});

export default Popup;
