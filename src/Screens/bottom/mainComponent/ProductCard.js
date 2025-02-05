import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Base_url } from '../../../utils/Utils';
// Sample data for the product list
const products = [
    { id: '1', title: 'Product 1', price: '$29.99', imageUrl: 'https://www.snitch.co.in/cdn/shop/collections/Snitch_Feb21_2486.jpg?v=1696850134&width=540' },
    { id: '2', title: 'Product 2', price: '$19.99', imageUrl: 'https://www.snitch.co.in/cdn/shop/collections/Snitch_Feb21_2486.jpg?v=1696850134&width=540' },
    { id: '3', title: 'Product 3', price: '$39.99', imageUrl: 'https://www.snitch.co.in/cdn/shop/collections/Snitch_Feb21_2486.jpg?v=1696850134&width=540' },
    // Add more products as needed
];

const ProductCardBox = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product:item.id })}>
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: Base_url + item.home_image_1 }} style={{ width: 170, height: 250, borderRadius: 10, marginRight: 10 }} />
                <TouchableOpacity style={styles.wishlistIcon}>
                    <Image
                        source={require('../../../images/heart.png')} // Replace with your wishlist icon URL
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{item.product_name.length > 30
                ? `${item.product_name.substring(0, 20)}...`
                : item.product_name}</Text>
            <Text style={styles.price}>Rs. {item.attributes[0].saling_price}</Text>
        </View>
        </TouchableOpacity>
    );
};

const ProductCard = ({ itemData }) => {

    return (
        <View>
            <FlatList
                data={itemData}
                renderItem={({ item }) => <ProductCardBox item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, flexDirection: 'row' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 1,

    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 1,
    },
    icon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
    price: {
        fontSize: 14,
        color: '#000',
        marginBottom: 10,
        marginHorizontal: 10,
        fontWeight: '800'
    },
});

export default ProductCard;
