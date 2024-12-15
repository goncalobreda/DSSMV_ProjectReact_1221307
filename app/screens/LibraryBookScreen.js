import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getLibraryBooks} from '../services/api';

export default function LibraryBookScreen({ route, navigation }) {
    const { libraryId } = route.params;
    const [books, setBooks] = useState([]);

    // Função para buscar livros da biblioteca
    const fetchBooks = async () => {
        try {
            const data = await getLibraryBooks(libraryId);
            setBooks(data);
        } catch (error) {
            console.error('Erro ao encontrar livros:', error);
        }
    };

    useEffect(() => {
        fetchBooks(); // Carrega os livros inicialmente

        return navigation.addListener('focus', fetchBooks);
    }, [navigation, libraryId]);

    const renderBookItem = ({ item }) => {
        const authors = item.book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

        // Construir a URL da capa dinamicamente com base no ISBN
        const coverUrl = item.book.isbn
            ? `http://193.136.62.24/v1/assets/cover/${item.book.isbn}-M.jpg`
            : 'https://via.placeholder.com/100x150.png?text=Sem+Capa'; // Fallback

        return (


            <TouchableOpacity
                onPress={() => navigation.navigate('BookDetails', { book: item.book, available: item.available || 0, })}
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
                data={books || []}
                keyExtractor={(item) => item.book.isbn.toString()}
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
    },
    list: {
        padding: 10,
    },
    bookItem: {
        flexDirection: 'row', // Alinha capa e detalhes horizontalmente
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
