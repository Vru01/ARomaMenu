  import React, { useEffect, useState } from 'react';
  import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { BASE_URL } from '@env';

  import { useNavigation } from '@react-navigation/native';
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootStackParamList } from '../../types/navigation'; 

  const { width } = Dimensions.get('window');
  
  
  
  type Food = {
    _id: string;
    title: string;
    description: string;
    imageurl: string;
    price: number;
    isVeg: boolean;
    rating: number;
    foodtags: string;
    spiceLevel: string;
    portionSize: string;
    portionPrice: number;
    ARmodelUrl?: string; 
  };
  
  const AllFoods = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/food/getallfoods`);
        console.log('Fetched Foods:', res.data); 
        setFoods(res.data.foods);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to fetch foods. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchFoods();
    }, []);

    const renderFoodCard = ({ item }: { item: Food }) => (
      <TouchableOpacity style={styles.card} activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('ProductScreen')
        }
      >
        <Image source={{ uri: item.imageurl }} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={[
                styles.vegIndicator,
                { backgroundColor: item.isVeg ? 'green' : 'red' },
              ]}
            />
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.price}>₹{item.price}</Text>
    
          {/* View in AR Button */}
          {item.ARmodelUrl?.trim() !== '' && (
            <TouchableOpacity
              style={styles.arButton}
              onPress={() =>
                navigation.navigate('AR', { modelUrl: item.ARmodelUrl })
              }
            >
              <Icon name="camera-outline" size={18} color="#0e4db3" />
              <Text style={styles.arButtonText}>View in AR Mode</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
    

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={foods}
          keyExtractor={(item) => item._id}
          renderItem={renderFoodCard}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    list: {
      padding: 10,
    },
    card: {
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      marginBottom: 15,
      overflow: 'hidden',
      elevation: 3,
    },
    image: {
      width: '100%',
      height: width * 0.5,
      resizeMode: 'cover',
    },
    details: {
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      marginRight: 10,
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginVertical: 4,
    },
    price: {
      fontSize: 16,
      color: '#ff6600',
      fontWeight: 'bold',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      fontSize: 16,
      color: 'red',
    },
    vegIndicator: {
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: '#333',
      marginLeft: 6,
    },
    arButton: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#0e4db3',
      borderRadius: 20,
    },
    arButtonText: {
      color: '#0e4db3',
      marginLeft: 6,
      fontSize: 14,
      fontWeight: '600',
    },
    
  });

  export default AllFoods;
