import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

const BASE_URL = 'http://10.0.2.2:3000/compras'; // Para emulador Android. Use o IP correto para dispositivos físicos.

export default function App() {
  const [itens, setItens] = useState([]);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [idEditar, setIdEditar] = useState(null);
  const [itemEditar, setItemEditar] = useState('');
  const [quantidadeEditar, setQuantidadeEditar] = useState('');

  useEffect(() => {
    buscarItens();
  }, []);

  const buscarItens = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setItens(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os itens.');
    }
  };

  const adicionarItem = async () => {
    if (!item || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, quantidade: parseInt(quantidade) }),
      });

      if (response.ok) {
        buscarItens(); // Atualiza a lista de itens
        setItem('');
        setQuantidade('');
      } else {
        Alert.alert('Erro', 'Não foi possível adicionar o item.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o item. Verifique sua conexão com o backend.');
    }
  };

  const atualizarItem = async () => {
    if (!itemEditar || !quantidadeEditar) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/${idEditar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemEditar, quantidade: parseInt(quantidadeEditar) }),
      });

      if (response.ok) {
        buscarItens();
        setIdEditar(null);
        setItemEditar('');
        setQuantidadeEditar('');
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o item.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o item.');
    }
  };

  const excluirItem = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        buscarItens();
      } else {
        Alert.alert('Erro', 'Não foi possível excluir o item.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o item.');
    }
  };

  const editarItem = (item) => {
    setIdEditar(item.id);
    setItemEditar(item.item);
    setQuantidadeEditar(item.quantidade.toString());
  };

  const renderizarItem = ({ item }) => {
    if (item.id !== idEditar) {
      return (
        <View style={styles.item}>
          <Text>{item.item} - {item.quantidade}</Text>
          <View style={styles.botoes}>
            <Button title="Editar" onPress={() => editarItem(item)} />
            <Button title="Excluir" onPress={() => excluirItem(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder="Nome do item"
            value={itemEditar}
            onChangeText={setItemEditar}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantidadeEditar}
            onChangeText={setQuantidadeEditar}
            keyboardType="numeric"
          />
          <Button title="Atualizar" onPress={atualizarItem} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Compras</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <Button title="Adicionar Item" onPress={adicionarItem} />
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  botoes: {
    flexDirection: 'row',
  },
});