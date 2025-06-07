import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import EditItemModal from '../modals/EditItemModal';

interface Item {
  name: string;
  amount: number;
  date: string;
}

interface SectionProps {
  title: string;
}

const Section: React.FC<SectionProps> = ({ title }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [newItemDate, setNewItemDate] = useState('');

  // Load items from AsyncStorage when component mounts
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem(`@${title}_items`);
        if (storedItems !== null) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();
  }, []); // Empty dependency array means this runs once on mount

  // Save items to AsyncStorage whenever the items state changes
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(`@${title}_items`, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving items:', error);
      }
    };
    saveItems();
  }, [items, title]); // Runs whenever `items` or `title` changes

  const handleAddItem = () => {
    const dateFormatRegex = /^\d{2}\/\d{2}$/;
    if (newItemName.trim() === '' || isNaN(parseFloat(newItemAmount))) {
      Alert.alert('Invalid Input', 'Please enter a valid name and amount.');
      return;
    }
    if (!dateFormatRegex.test(newItemDate)) {
      Alert.alert('Invalid Date', 'Please enter the date in DD/MM format (e.g., 31/12).');
      return;
    }
    setItems([...items, { name: newItemName, amount: parseFloat(newItemAmount), date: newItemDate }]);
    setNewItemName('');
    setNewItemAmount('');
    setIsAddingNewItem(false);
  };

  const handleDeleteItem = () => {
    if (selectedItem) {
      setItems(items.filter(item => item !== selectedItem));
      setSelectedItem(null);
    }
    // Close the modal after deletion
    setSelectedItem(null);
  };

  const handleEditItem = (editedItem: Item) => {
    setItems(items.map(item => (item === selectedItem ? editedItem : item)));
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Pressable onPress={() => setIsContentVisible(!isContentVisible)}>
          <Text style={styles.toggleText}>{isContentVisible ? 'HIDE' : 'SHOW'}</Text>
        </Pressable>
      </View>

      <View style={styles.content}>

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
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newItemDate}
              onChangeText={setNewItemDate}
            />
            <View style={styles.buttonRow}>
              <Pressable onPress={handleAddItem} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
              <Pressable onPress={() => {
                setIsAddingNewItem(false);
                setNewItemName('');
                setNewItemAmount('');
                setNewItemDate('');
              }} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {isAddingNewItem ? null : items.map((item, index) => (
          <Pressable
            key={index}
            onLongPress={() => {
              setSelectedItem(item);
            }}
          >
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
              <Text style={styles.itemAmount}>
                {isContentVisible ? `₹${item.amount.toFixed(2)}` : 'XXXX'}
              </Text>
            </View>
          </Pressable>
        ))}
        { !isAddingNewItem ? (
          <Pressable onPress={() => setIsAddingNewItem(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        ) : null}
      </View>

      <EditItemModal
        isVisible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={handleDeleteItem}
        onSave={handleEditItem}
        selectedItem={selectedItem}
      />
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
  itemDate: {
    fontSize: 16,
    color: 'grey',
    marginHorizontal: 10,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Section; 