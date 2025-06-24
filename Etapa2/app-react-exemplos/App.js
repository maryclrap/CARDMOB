import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';

const BASE_URL = 'http://10.81.205.1:5000';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog`);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar produtos.');
    }
  };

  const adicionarProduto = async () => {
    if (!nome || !descricao || !preco) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, description: descricao, price: parseFloat(preco) }),
      });

      if (response.ok) {
        carregarProdutos();
        setNome('');
        setDescricao('');
        setPreco('');
      } else {
        Alert.alert('Erro', 'Erro ao adicionar produto.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  const confirmarExclusao = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => excluirProduto(id) },
      ]
    );
  };

  const excluirProduto = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog/${id}`, { method: 'DELETE' });
      if (response.ok) carregarProdutos();
      else Alert.alert('Erro', 'Erro ao excluir produto.');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  const editarProduto = (produto) => {
    setNome(produto.name);
    setDescricao(produto.description);
    setPreco(produto.price.toString());
    setEditandoId(produto.id);
  };

  const atualizarProduto = async () => {
    if (!nome || !descricao || !preco) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/catalog/${editandoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, description: descricao, price: parseFloat(preco) }),
      });

      if (response.ok) {
        carregarProdutos();
        setNome('');
        setDescricao('');
        setPreco('');
        setEditandoId(null);
      } else {
        Alert.alert('Erro', 'Erro ao atualizar produto.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  const renderProduto = ({ item }) => (
    <View style={styles.produto}>
      {item.id !== editandoId ? (
        <>
          <Text style={styles.produtoTexto}>{item.name} - {item.description} - R$ {item.price.toFixed(2)}</Text>
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => editarProduto(item)}>
              <Text style={styles.botaoTexto}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoExcluir} onPress={() => confirmarExclusao(item.id)}>
              <Text style={styles.botaoTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.botaoAtualizar} onPress={atualizarProduto}>
            <Text style={styles.botaoTexto}>Atualizar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.botaoAdicionar} onPress={editandoId ? atualizarProduto : adicionarProduto}>
        <Text style={styles.botaoTexto}>{editandoId ? 'Atualizar Produto' : 'Adicionar Produto'}</Text>
      </TouchableOpacity>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduto}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled" 
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
  botaoAdicionar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoAtualizar: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  produto: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  produtoTexto: {
    fontSize: 16,
    marginBottom: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoEditar: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  botaoExcluir: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});