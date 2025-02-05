import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Main from './bottom/Main'
import Profile from './bottom/Profile'
import Category from './bottom/Category'
import FullScreenLoader from './FullScreenLoader'
import Schedule from './bottom/Schedule'
import { getApiCallToken } from '../Services/ApiServices'

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0)
    return (
        <View style={styles.homeContainer}>
            <FullScreenLoader visible={loading} />
            {
                selectedTab == 0 ? (<Main />) : selectedTab == 1 ? (<Category />) : selectedTab == 2 ? (<Schedule/>) : selectedTab == 3 ? (<Profile />) : (<Main />)
            }
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={() => { setSelectedTab(0) }} style={{ width: '33.33%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/home.png')} style={{ width: 24, height: 24, tintColor: selectedTab == 0 ? '#000' : '#8e8e8e' }} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => { setSelectedTab(1) }} style={{ width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/category.png')} style={{ width: 24, height: 24, tintColor: selectedTab == 1 ? '#000' : '#8e8e8e' }} />
                </TouchableOpacity> */}
                <View style={{ width: '33.33%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { setSelectedTab(2) }} style={{ width: 44, height: 44, backgroundColor: '#000', borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: selectedTab == 2 ? 'green' : '#000' }}>
                        <Image source={require('../images/calendar.png')} style={{ width: 24, height: 24, tintColor: "#fff" }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { setSelectedTab(3) }} style={{ width: '33.33%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/user.png')} style={{ width: 24, height: 24, tintColor: selectedTab == 4 ? '#000' : '#8e8e8e' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
    },
    viewContainer: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        // position: 'absolute', 
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

})

export default Home