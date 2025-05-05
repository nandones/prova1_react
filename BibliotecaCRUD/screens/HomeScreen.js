import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Appbar, FAB, Banner, Dialog, Portal, Button, Chip } from 'react-native-paper';
import { useThemeContext } from '../contexts/ThemeContext';
import BookCard from '../components/BookCard'; // Importe o componente
//import { useDispatch, useSelector } from 'react-redux';
//import { incrementar, decrementar } from '../redux/BookSlice';

export default function HomeScreen({ navigation, books, setBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [generoFiltro, setGeneroFiltro] = useState('Todos');
  const { toggleTheme } = useThemeContext();

  //const dispatch = useDispatch();
  //const total = useSelector((state) => state.books.total);

  const handleDeleteBook = () => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== selectedBook?.id));
    setSelectedBook(null);
    setVisibleDialog(false);
    //dispatch(decrementar());
  };

  const openDeleteDialog = (book) => {
    setSelectedBook(book);
    setVisibleDialog(true);
  };

  const openEditScreen = (book) => {
    navigation.navigate('Adicionar', { editBook: book });
  };

  const openAddScreen = () => {
    navigation.navigate('Adicionar', { editBook: null });
  };

  const livrosFiltrados = generoFiltro === 'Todos'
    ? books
    : books.filter(p => p.genero === generoFiltro.toLowerCase());

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gerenciador de Livros" />
        <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
      </Appbar.Header>

      <ScrollView style={{ margin: 10 }}>
        <Banner
          visible={bannerVisible}
          actions={[
            { label: 'OK', onPress: () => setBannerVisible(false) }
          ]}
          icon="information"
        >
          Adicione, edite ou remova livros com facilidade!
        </Banner>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'Todos'}
            onPress={() => setGeneroFiltro('Todos')}
          >
            Todos
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'romance'}
            onPress={() => setGeneroFiltro('romance')}
          >
            Romance
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'ficcao'}
            onPress={() => setGeneroFiltro('ficcao')}
          >
            Ficção
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'biografia'}
            onPress={() => setGeneroFiltro('biografia')}
          >
            Biografia
          </Chip>
        </View>

        {livrosFiltrados.length === 0 ? (
          <ActivityIndicator animating={true} style={{ marginTop: 20 }} />
        ) : (
          <View style={{ marginTop: 10 }}>
            {livrosFiltrados.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEditar={openEditScreen}
                onExcluir={openDeleteDialog}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Confirmação</Dialog.Title>
          <Dialog.Content>
            <Text>Deseja realmente excluir "{selectedBook?.title}"?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Cancelar</Button>
            <Button onPress={handleDeleteBook}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={openAddScreen}
      />
    </>
  );
}

// Remova o StyleSheet.create da HomeScreen pois agora está no BookCard