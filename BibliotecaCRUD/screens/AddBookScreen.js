import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import { VStack, Tooltip, Box } from 'native-base';

//const dispatch = useDispatch();

export default function AddBookScreen({ navigation, route, books, setBooks }) {
  const [title, setTitle] = useState('');
  const [anopub, setAnopub] = useState('');
  const [genero, setGenero] = useState('romance');
  const [autor, setAutor] = useState('');
  const [disponivel, setDisponivel] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { editBook = null } = route.params || {};

      if (editBook) {
        setTitle(editBook.title);
        setAnopub(editBook.anopub.toString());
        setGenero(editBook.genero);
        setAutor(editBook.autor);
        setDisponivel(editBook.disponivel);
        setIsEditMode(true);
      } else {
        setTitle('');
        setAnopub('');
        setGenero('romance');
        setAutor('');
        setDisponivel(false);
        setIsEditMode(false);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleSaveBook = () => {
    if (isEditMode) {
      setBooks(books.map(p =>
        p.id === (route.params?.editBook?.id || 0) ? { ...route.params.editBook, title, anopub, genero, disponivel, autor } : p
      ));
    } else {
      setBooks([
        ...books,
        { id: Date.now(), title, anopub, genero, disponivel, autor }
      ]);
    }
    navigation.navigate('Home');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditMode ? "Editar Livro" : "Adicionar Livro"} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <VStack space={4}>
          <Tooltip label="Digite o título do Livro" placement="top">
            <Box>
              <TextInput
                label="Título do Livro"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <Tooltip label="Digite o Ano da Publicação" placement="top">
            <Box>
              <TextInput
                label="Ano"
                value={anopub}
                onChangeText={setAnopub}
                keyboardType="numeric"
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <Tooltip label="Digite o nome do autor" placement="top">
            <Box>
              <TextInput
                label="Autor"
                value={autor}
                onChangeText={setAutor}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <RadioButton.Group onValueChange={setGenero} value={genero}>
            <RadioButton.Item label="romance" value="romance" />
            <RadioButton.Item label="ficção" value="ficcao" />
            <RadioButton.Item label="biografia" value="biografia" />
          </RadioButton.Group>

          <Checkbox.Item
            label="Livro Disponível?"
            status={disponivel ? 'checked' : 'unchecked'}
            onPress={() => setDisponivel(!disponivel)}
          />

          <Button 
            mode="contained" 
            onPress={handleSaveBook}
            buttonColor={isEditMode ? "orange" : "blue"}
            style={{ marginTop: 10 }}
            icon={isEditMode ? "pencil" : "content-save"}
          >
            {isEditMode ? "Atualizar Livro" : "Salvar Livro"}
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
}
