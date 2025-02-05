// import React, { useState, useEffect} from 'react';
// import { View, Text, Button, Image, TextInput, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import HeaderSec from '../common/HeaderSec';
// import { useNavigation } from '@react-navigation/native';
// import { Base_url } from '../../utils/Utils';
// import { getApiCallToken } from '../../Services/ApiServices';
// // import FullScreenLoader from '../FullScreenLoader';
// const Category = () => {
//     const navigation = useNavigation();
//     const [couponCode, setCouponCode] = useState('');
//     const [discount, setDiscount] = useState(0);
//     const [categoryLists,setCategoryList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const updateQuantity = (id, quantity) => {
//         setCartItems(items =>
//             items.map(item =>
//                 item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
//             )
//         );
//     };

//     const applyCoupon = () => {
//         if (couponCode === 'DISCOUNT10') {
//             setDiscount(10);
//         } else {
//             setDiscount(0);
//         }
//     };

//     const calculateTotal = () => {
//         const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//         return subtotal - (subtotal * discount / 100);
//     };
//     const onCategoryPress = (items) => {
//         // console.log(items);
//          navigation.navigate('CategoryItems');
//         //<CategoryItems items={items} />
//     }

//     const renderItem = ({ item }) => (
//         <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('CategoryItems', { mainCategory:item })}>
//             <View style={styles.ItemsView}>
//                 <View>
//                     <Image source={{ uri: Base_url+item.image }} style={styles.image} />
//                 </View>
//                 <View style={styles.ItemsTitle}>
//                     <Text style={styles.categoryName}>{item.category_name}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
//     const categoryList = async () =>{

//         try {
//             setLoading(true)
//             const result = await getApiCallToken('/category-list')
//             if (result.status == true) {
//                 setCategoryList(result.category)
//                 setLoading(false)
//             }
//         } catch (error) {

//         }
//     }
//     useEffect(() =>{
//         categoryList();
//     },[])
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <HeaderSec headerTitle={'Collections'} />
//             <FullScreenLoader visible={loading}/>
//             <FlatList
//             showsVerticalScrollIndicator={false}
//                 data={categoryLists}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.listContainer}
//             />
//         </SafeAreaView>

//     );
// }
// const styles = StyleSheet.create({
//     listContainer: {
//         padding: 10,
//     },
//     itemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         marginBottom: 10,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 8,
//         elevation: 2,
//     },
//     ItemsView:{
//         flex:1,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     ItemsTitle:{
//         alignContent:'center',
//         alignSelf:'center'
//     },
//     image: {

//         width: 80,
//         height: 100,
//         marginRight: 15,
//         marginLeft:5,
//         borderRadius:10

//     },
//     categoryName: {


//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
// });


// export default Category
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './mainComponent/Header'

const Category = () => {
    return (
        <View style={styles.listContainer}>
            <Header  headerTitle={'Dashboard'}/>
            <View style={styles.contentContainer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Job </Text>
                    <Text style={styles.totalText}>100 </Text>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Schedule </Text>
                    <Text style={styles.totalText}>300 </Text>
                </View>
            </View>
            
        </View>

    )
}

export default Category

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: "wheat",
    },
    contentContainer: {
        flexDirection: "row",
        marginHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
        // marginVertical: 40,
        // paddingVertical: 20,

        // height: 200,
        width: 100,
    },
    contentContainer2: {
        flexDirection: "row",
        marginHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
        width: 100,
    },
    totalContainer: {
        height: 170,
        width: 170,
        backgroundColor: "gray",
        borderRadius: 10,
        margin: 10,
    },
    totalText: {
        fontSize: 21,
        marginLeft: 10,
        marginTop: 10,
    }
})
