import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddFoods = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [foodTags, setFoodTags] = useState('');
  const [category, setCategory] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [price, setPrice] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('');
  const [portionSize, setPortionSize] = useState('');
  const [portionPrice, setPortionPrice] = useState('');

  const handleFormSubmit = async () => {
    const foodData = {
      title,
      description,
      imageUrl,
      foodTags,
      category,
      isVeg,
      price,
      spiceLevel,
      portionSize,
      portionPrice,
    };

    try {
      const response = await fetch('https://your-backend-api-url/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Food added successfully:', data);
        alert('Food added successfully!');
        // Optionally, reset the form or navigate to another screen
      } else {
        console.error('Error adding food:', response.status);
        alert('Failed to add food. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Food Item</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Food Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Food Tags (e.g. Spicy, Vegan)"
        value={foodTags}
        onChangeText={setFoodTags}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g. Main Course, Starter)"
        value={category}
        onChangeText={setCategory}
      />
      
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Is it Veg?</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsVeg(!isVeg)}
        >
          <Icon name={isVeg ? 'leaf' : 'flame'} size={24} color={isVeg ? 'green' : 'red'} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Price (in ₹)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Spice Level"
        value={spiceLevel}
        onChangeText={setSpiceLevel}
      />
      <TextInput
        style={styles.input}
        placeholder="Portion Size"
        value={portionSize}
        onChangeText={setPortionSize}
      />
      <TextInput
        style={styles.input}
        placeholder="Portion Price"
        value={portionPrice}
        onChangeText={setPortionPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitButtonText}>Add Food</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff6600',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleText: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff6600',
  },
  submitButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddFoods;
