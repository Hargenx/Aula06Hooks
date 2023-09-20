import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';

function CrudApp() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const deleteItem = () => {
    const newItems = [...items];
    newItems.splice(selectedItemIndex, 1);
    setItems(newItems);
    setDeleteModalVisible(false);
    setSelectedItemIndex(null);
  };

  const openDeleteModal = (index) => {
    setSelectedItemIndex(index);
    setDeleteModalVisible(true);
  };

  const openEditModal = (index) => {
    setSelectedItemIndex(index);
    setEditValue(items[index]);
    setEditModalVisible(true);
  };

  const editItem = () => {
    const newItems = [...items];
    newItems[selectedItemIndex] = editValue;
    setItems(newItems);
    setEditModalVisible(false);
    setSelectedItemIndex(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: 1, marginTop: 100 }}>
      <Text>CRUD App</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, margin: 10 }}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        placeholder="Adicionar um item"
      />
      <Button title="Adicionar" onPress={addItem} />
      <FlatList
      style={{ height: 40, borderColor: 'lightblue', borderWidth: 1, width: 200, margin: 10 }}
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => openDeleteModal(index)}>
              <Text style={{ color: 'red' }}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(index)}>
              <Text style={{ color: 'green' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal animationType="slide" transparent={true} visible={isEditModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Editar Item</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, margin: 10 }}
              value={editValue}
              onChangeText={(text) => setEditValue(text)}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
              onPress={editItem}
            >
              <Text style={{ color: 'white' }}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={isDeleteModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Tem certeza que deseja excluir?</Text>
            <Button title="Sim" onPress={deleteItem} />
            <Button title="Não" color="red" onPress={() => setDeleteModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CrudApp;