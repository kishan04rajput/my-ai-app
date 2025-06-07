import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Item {
  name: string;
  amount: number;
  date: string;
}

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onSave: (editedItem: Item) => void;
  selectedItem: Item | null;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isVisible,
  onClose,
  onDelete,
  onSave,
  selectedItem,
}) => {
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setEditedName(selectedItem.name);
      setEditedAmount(selectedItem.amount.toString());
      setEditedDate(selectedItem.date);
    }
  }, [selectedItem]);

  const handleSave = () => {
    if (editedName.trim() === '' || isNaN(parseFloat(editedAmount))) {
      Alert.alert('Invalid Input', 'Please enter a valid name and amount.');
      return;
    }

    if (selectedItem) {
      onSave({
        ...selectedItem,
        name: editedName,
        amount: parseFloat(editedAmount),
        date: editedDate,
      });
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          {selectedItem && (
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.horizontalInput]}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Name"
              />
              <TextInput
                style={[styles.input, styles.horizontalInput]}
                value={editedDate}
                onChangeText={setEditedDate}
                placeholder="DD/MM"
                          />
                          <TextInput
                style={[styles.input, styles.horizontalInput]}
                value={editedAmount}
                onChangeText={setEditedAmount}
                keyboardType="numeric"
                placeholder="Amount"
              />
            </View>
          )}
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}>
              <Text style={styles.textStyle}>SAVE</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={onDelete}>
              <Text style={styles.textStyle}>DELETE</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}>
              <Text style={styles.textStyle}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  horizontalInput: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 0,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
  },
  buttonDelete: {
    backgroundColor: '#FF6347',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditItemModal; 