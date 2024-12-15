import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import {fetchCheckedOutBooks, checkInBookAction, extendCheckoutAction} from '../context/actions';


const formatLibraryId = (id) => {
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
};

export default function CheckoutsScreen({ route }) {
    const { userId } = route.params;
    const { state, dispatch } = useContext(AppContext);

    const books = Array.isArray(state.checkedOutBooks[userId])
        ? state.checkedOutBooks[userId].map((item) => ({
            ...item,
            libraryId: formatLibraryId(item.libraryId),
        }))
        : [];




    useEffect(() => {
        fetchCheckedOutBooks(userId)(dispatch).catch((error) => {
            console.error('Erro a encontrar livros emprestados:', error);
        });
    }, [userId, dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-PT', options);
    };

    const handleCheckIn = async (bookId, libraryId) => {
        try {
            await checkInBookAction(libraryId, bookId, userId)(dispatch);
            Alert.alert('Sucesso', 'Livro devolvido com sucesso!');
        } catch (error) {
            console.error('Erro ao devolver livro:', error);
            Alert.alert('Erro', 'Não foi possível devolver o livro.');
        }
    };

    const handleExtend = async (checkoutId) => {
        try {
            console.log('Checkout ID:', checkoutId); // Verificar o ID
            await extendCheckoutAction(checkoutId)(dispatch);
            Alert.alert('Sucesso', 'Prazo do empréstimo estendido por mais 7 dias!');
        } catch (error) {
            console.error('Erro ao estender prazo do empréstimo:', error);

            if (error.response && error.response.data.message === "You can only have a book checked out for a maximum of 6 weeks") {
                Alert.alert('Aviso', 'Já atingiste o limite de extensões permitidas para este livro.');
            } else {
                Alert.alert('Erro', 'Não foi possível estender o prazo do empréstimo.');
            }
        }
    };


    const renderBookItem = ({ item }) => {
        if (!item.book) return null; // Previne o erro se item.book for null

        const authors = item.book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

        return (
            <View style={styles.bookItem}>
                <Text style={styles.bookTitle}>{item.book.title || 'Título Desconhecido'}</Text>
                <Text style={styles.bookAuthor}>Autor(es): {authors}</Text>
                <Text style={styles.bookInfo}>Devolução: {formatDate(item.dueDate)}</Text>
                <Text style={styles.bookLibrary}>Biblioteca: {item.libraryName}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Extend"
                        onPress={() => handleExtend(item.id)}
                    />
                    <Button
                        title="Check-In"
                        onPress={() => handleCheckIn(item.bookId, item.libraryId)}
                    />
                </View>
            </View>
        );
    };




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Livros Emprestados</Text>
            <FlatList
                data={books || []} // Garante que data nunca é undefined
                keyExtractor={(item, index) => (item.id ? item.id.toString() : `fallback-${index}`)}
                renderItem={renderBookItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum livro emprestado encontrado.</Text>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    bookItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
    },
    bookInfo: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    bookLibrary: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
    },

});
