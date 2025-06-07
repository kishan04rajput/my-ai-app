import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface Item {
  name: string;
  amount: number;
}

interface DeleteItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  selectedItem: Item | null;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({ isVisible, onClose, onDelete, selectedItem }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <View style={styles.modalButtonContainer}>
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
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
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

export default DeleteItemModal; 