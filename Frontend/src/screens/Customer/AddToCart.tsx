import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

const initialCartItems = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    price: 120,
    imageUrl:
      'https://images.slurrp.com/prod/recipe_images/transcribe/snack/Vegetable-Burger.webp',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Cheese Pizza',
    price: 250,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0HbRY0SsECXq3XHqjXUBw3CqK1VfE5PX1w&s',
    quantity: 2,
  },
];

type CartItem = typeof initialCartItems[0];

type AddToCartScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

export default function AddToCartScreen({ navigation }: AddToCartScreenProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (id: number, quantity: number) => {
    const validQuantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: validQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      Alert.alert('Your cart is empty!');
      return;
    }

    navigation.navigate('Payment', {
      cartItems,
      totalPrice: getTotalPrice(),
    });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>

        <View style={styles.quantityWrapper}>
          <Text style={styles.quantityLabel}>Qty:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={(text) =>
              updateQuantity(item.id, parseInt(text) || 1)
            }
          />
        </View>

        <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
          <Text style={styles.removeBtn}>🗑 Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.heading}>🛒 Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleBuyNow}>
          <Text style={styles.checkoutText}>PROCEED TO PAYMENT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 50,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 4,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  itemPrice: {
    fontSize: 15,
    color: '#888',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
  },
  quantityInput: {
    marginLeft: 10,
    width: 45,
    height: 45,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 2,
    fontSize: 14,
  },
  removeBtn: {
    marginTop: 5,
    color: '#d9534f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  checkoutBtn: {
    backgroundColor: '#ff7f50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
