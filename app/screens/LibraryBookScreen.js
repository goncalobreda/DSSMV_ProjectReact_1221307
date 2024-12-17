import React, { useContext, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import { fetchLibraryBooks } from '../context/actions';

export default function LibraryBookScreen({ route, navigation }) {
    const { libraryId } = route.params;
    const { state, dispatch } = useContext(AppContext);

    const books = state.books[libraryId] || []; // Obtém os livros do estado global

    useEffect(() => {
        fetchLibraryBooks(libraryId)(dispatch);

        return navigation.addListener('focus', () => {
            fetchLibraryBooks(libraryId)(dispatch);
        });
    }, [navigation, libraryId, dispatch]);


    const renderBookItem = ({ item }) => {
        const authors = item.book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

        const coverUrl = item.book.isbn
            ? `http://193.136.62.24/v1/assets/cover/${item.book.isbn}-M.jpg`
            : 'https://via.placeholder.com/100x150.png?text=Sem+Capa'; // Fallback

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('BookDetails', {
                        book: { ...item.book, id: item.book.isbn },
                        available: item.available || 0,
                        libraryId: libraryId,
                    })
                }
                style={styles.bookItem}
            >
                {/* Imagem da capa */}
                <Image source={{ uri: coverUrl }} style={styles.bookCover} />

                {/* Informações do livro */}
                <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{item.book.title || 'Título Desconhecido'}</Text>
                    <Text style={styles.bookAuthor}>Autor(es): {authors}</Text>
                    <Text style={styles.bookAvailability}>Disponíveis: {item.available || 0}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addBookButton}
                onPress={() => navigation.navigate('AddBook', { libraryId })}
            >
                <Text style={styles.addBookButtonText}>+ Adicionar Livro</Text>
            </TouchableOpacity>
            <FlatList
                data={books}
                keyExtractor={(item) => item.book.isbn.toString()}
                renderItem={renderBookItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum livro encontrado.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 10,
    },
    bookItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        borderWidth: 1,
        borderColor: '#ddd',
    },
    bookCover: {
        width: 60,
        height: 90,
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    bookInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    bookAvailability: {
        fontSize: 14,
        color: '#4CAF50',
        marginTop: 2,
    },
    addBookButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    addBookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
