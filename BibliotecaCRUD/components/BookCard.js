import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const BookCard = ({ book, onEditar, onExcluir }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: book.foto || 'https://via.placeholder.com/80' }} 
        style={styles.imagem} 
      />
      <View style={styles.info}>
        <Text style={[styles.titulo, !book.disponivel && styles.indisponivel]}>
          {book.title}
        </Text>
        <Text style={styles.ano}>Ano: {book.anopub}</Text>
        <Text style={styles.genero}>Gênero: {book.genero}</Text>
        <Text style={styles.genero}>Autor: {book.autor}</Text>
        <View style={styles.botoes}>
          <Button 
            mode="contained" 
            onPress={() => onEditar(book)}
            style={styles.botaoEditar}
          >
            Editar
          </Button>
          <Button 
            mode="contained" 
            onPress={() => onExcluir(book)}
            style={styles.botaoExcluir}
          >
            Excluir
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  indisponivel: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  ano: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  genero: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoEditar: {
    flex: 1,
    backgroundColor: '#6200ee',
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: '#b00020',
  },
});

export default BookCard;