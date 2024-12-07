import axios from 'axios';

const api = axios.create({
    baseURL: 'http://193.136.62.24/v1',
    timeout: 10000,
});

export const getLibraries = async () => {
    try {
        const response = await api.get('/library'); // Endpoint da API
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar bibliotecas:', error);
        throw error;
    }
};

export const createLibrary = async (library) => {
    try {
        const response = await api.post('/library', library);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar biblioteca:', error);
        throw error;
    }
};

export const getLibraryBooks = async (libraryId) => {
    try {
        const response = await api.get(`/library/${libraryId}/book`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao encontrar livros da biblioteca ${libraryId}:`, error);
        throw error;
    }
};

export const deleteLibrary = async (libraryId) => {
    try {
        const response = await api.delete(`/library/${libraryId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao eliminar biblioteca:', error);
        throw error;
    }
};

export const editLibrary = async (libraryId, updatedData) => {
    try {
        const response = await api.put(`/library/${libraryId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar biblioteca:', error);
        throw error;
    }
};






export default api;
