import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50', // Verde
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        width: 150,
    },
    text: {
        color: '#FFFFFF', // Branco
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;
