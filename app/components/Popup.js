import React from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

const Popup = ({ visible, message, onClose }) => (
    <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
                <View style={styles.popupContent}>
                    {message}
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro
    },
    popupContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
});

export default Popup;
