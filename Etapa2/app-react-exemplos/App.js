import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

export default function App() {
  const [itens, setItens] = useState([]); // Simula o conteúdo do dados.json
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [idEditar, setIdEditar] = useState(null);
  const [itemEditar, setItemEditar] = useState('');
  const [quantidadeEditar, setQuantidadeEditar] = useState('');

  const adicionarItem = () => {
    if (!item || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novoItem = {
      id: itens.length > 0 ? itens[itens.length - 1].id + 1 : 1,
      item,
      quantidade: parseInt(quantidade),
    };

    setItens([...itens, novoItem]);
    setItem('');
    setQuantidade('');
  };

  const atualizarItem = () => {
    if (!itemEditar || !quantidadeEditar) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const itensAtualizados = itens.map((i) =>
      i.id === idEditar ? { id: idEditar, item: itemEditar, quantidade: parseInt(quantidadeEditar) } : i
    );

    setItens(itensAtualizados);
    setIdEditar(null);
    setItemEditar('');
    setQuantidadeEditar('');
  };

  const excluirItem = (id) => {
    const itensFiltrados = itens.filter((i) => i.id !== id);
    setItens(itensFiltrados);
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