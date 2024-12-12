import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getCheckedOutBooks, checkInBook, extendCheckout } from '../services/api';

// Função para formatar o Library ID
const formatLibraryId = (id) => {
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
};

export default function CheckoutsScreen({ route }) {
    const { userId } = route.params;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchCheckedOutBooks = async () => {
            try {
                const data = await getCheckedOutBooks(userId);
                const formattedData = data.map((item) => ({
                    ...item,
                    libraryId: formatLibraryId(item.libraryId),
                }));
                setBooks(formattedData);
            } catch (error) {
                console.error('Erro ao buscar livros emprestados:', error);
            }
        };

        fetchCheckedOutBooks();
    }, [userId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-PT', options);
    };

    const handleCheckIn = async (bookId, libraryId) => {
        console.log('Book ID:', bookId);
        console.log('Library ID:', libraryId);
        console.log('User ID:', userId);

        try {
            await checkInBook(libraryId, bookId, userId);
            setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
            Alert.alert('Sucesso', 'Livro devolvido com sucesso!');
        } catch (error) {
            console.error('Erro ao devolver livro:', error);
            Alert.alert('Erro', 'Não foi possível devolver o livro.');
        }
    };

    const handleExtend = async (checkoutId) => {
        try {
            await extendCheckout(checkoutId);
            Alert.alert('Sucesso', 'Prazo do empréstimo estendido por mais 7 dias!');
            const updatedBooks = books.map((book) =>
                book.id === checkoutId
                    ? { ...book, dueDate: new Date(new Date(book.dueDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() }
                    : book
            );
            setBooks(updatedBooks);
        } catch (error) {
            console.error('Erro ao estender prazo do empréstimo:', error);
            Alert.alert('Erro', 'Não foi possível estender o prazo do empréstimo.');
        }
    };

    const renderBookItem = ({ item }) => {
        const authors = item.book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

        return (
            <View style={styles.bookItem}>
                <Text style={styles.bookTitle}>{item.book.title || 'Título Desconhecido'}</Text>
                <Text style={styles.bookAuthor}>Autor(es): {authors}</Text>
                <Text style={styles.bookInfo}>Devolução: {formatDate(item.dueDate)}</Text>
                <Text style={styles.bookLibrary}>Biblioteca: {item.libraryName}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.extendButton}
                        onPress={() => handleExtend(item.id)}
                    >
                        <Text style={styles.buttonText}>Extend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checkInButton}
                        onPress={() => handleCheckIn(item.bookId, item.libraryId)}
                    >
                        <Text style={styles.buttonText}>Check-In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Livros Emprestados</Text>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBookItem}
                contentContainerStyle={styles.list}
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
        marginTop: 10,
    },
    extendButton: {
        backgroundColor: '#4CAF50',
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    checkInButton: {
        backgroundColor: '#4CAF50',
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
