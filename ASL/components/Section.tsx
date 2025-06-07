import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Item {
  name: string;
  amount: number;
}

interface SectionProps {
  title: string;
}

const Section: React.FC<SectionProps> = ({ title }) => {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim() === '' || isNaN(parseFloat(newItemAmount))) {
      // Basic validation
      alert('Please enter a valid name and amount.');
      return;
    }
    setItems([...items, { name: newItemName, amount: parseFloat(newItemAmount) }]);
    setNewItemName('');
    setNewItemAmount('');
    setIsAddingNewItem(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Pressable onPress={() => setIsContentVisible(!isContentVisible)}>
          <Text style={styles.toggleText}>{isContentVisible ? 'HIDE' : 'SHOW'}</Text>
        </Pressable>
      </View>

      {isContentVisible && (
        <View style={styles.content}>
          {items.length === 0 && !isAddingNewItem ? (
            <Pressable onPress={() => setIsAddingNewItem(true)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          ) : null}

          {isAddingNewItem ? (
            <View style={styles.addItemContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={newItemName}
                onChangeText={setNewItemName}
              />
              <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={newItemAmount}
                onChangeText={setNewItemAmount}
              />
              <View style={styles.buttonRow}>
                <Pressable onPress={handleAddItem} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
                <Pressable onPress={() => {
                  setIsAddingNewItem(false);
                  setNewItemName('');
                  setNewItemAmount('');
                }} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addItemContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Section; 