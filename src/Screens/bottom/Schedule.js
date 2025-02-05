import { View, ScrollView, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Modal, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from './mainComponent/Header';
import { useNavigation } from '@react-navigation/native';
import FullScreenLoader from '../FullScreenLoader';
import { getApiCall, getApiCallToken, postApiCall } from '../../Services/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_url } from '../../utils/Utils';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
const Schedule = () => {

  const [data, setData] = useState(null);

  const [jobDescription, setJobDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [editIds, setEditIds] = useState('');

  const [loading, setLoading] = useState(false);
  const [allListView, setAllList] = useState(true);
  const [error, setError] = useState(null);
  const [SchedulerList, setSchedulerList] = useState([]);
  const [showModalTitle, setShowModalTitle] = useState('Add Schedule');
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());  // default date to current date
  const [formattedDate, setFormatedDate] = useState(date.toLocaleDateString());  // default date to current date
  const [show, setShow] = useState(false);  // controls when the DateTimePicker shows

  const [showPicker, setShowPicker] = useState(false);
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const [checkApplyFilter, setCheckApplyFilter] = useState(false);
  const [filterdate, setFilterDate] = useState(new Date());  // default date to current date
  const [filterFormattedDate, setFilterFormatedDate] = useState(filterdate.toLocaleDateString());

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); // Hide the picker after selection
    setDate(currentDate); // Set the selected date

    // Format the selected date
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',

    }); // Format the date
    setFormatedDate(formattedDate); // Update formattedDate
  };
  const handleFilterMethod = async (event, selectedDate) => {
    const currentDate = selectedDate || filterdate;
    const formattedDate1 = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', }); // Format the date
    // setFilterFormatedDate(formattedDate1);
    console.log('1111111111scheduler-list?date=', formattedDate1)
    const result = await getApiCall('scheduler-list?date=' + formattedDate1);
    if (result.status == true) {
      setSchedulerList(result.data);
    } else {
      setSchedulerList([]);
    }
    setShowFilterPicker(false);  // Hide the picker after selection
  };

  // Format the date to a readable string
  // const formattedDate = date.toLocaleDateString();


  const handleAddJob = async () => {

    if (editIds == '') {
      const result = await postApiCall('/add-scheduler', { emp_id: 2, created_date: formattedDate, description: jobDescription });
      if (result.status === true) {
        fetchSchedulerList();
      }
    }
    if (editIds !== '') {
      const result = await postApiCall('/scheduler-update', { scheduler_id: editIds, emp_id: 2, created_date: formattedDate, description: jobDescription });
      if (result.status === true) {

        fetchSchedulerList();
        setModalVisible(false)
      }
    }

  }
  const getAllFun = async () => {
    fetchSchedulerList();
  }
  const fetchSchedulerList = async () => {
    setLoading(true);
    const result = await getApiCall('scheduler-list');
    if (result.status == true) {
      setSchedulerList(result.data);
    } else {
      setSchedulerList([]);
    }
    setLoading(false);
    setModalVisible(false)

  }




  const navigation = useNavigation();
  const openModal = async (types, ids) => {
    if (types === 'add') {
      setShowModalTitle('Add Schedule')
      setJobDescription('');
      setCreatedDate('');
      setFormatedDate(date.toLocaleDateString())
      setEditIds('');
    }
    if (types === 'edit') {

      setShowModalTitle('edit Schedule')
      if (ids != '') {

        const userid = await AsyncStorage.getItem('userId');
        const parsedUserId = userid ? JSON.parse(userid) : null;
        const result = await getApiCall('/scheduler-details?scheduler_id=' + ids)

        if (result.status === true) {

          setJobDescription(result.data.description);
          // Extract date part only (removing time)
          const datePart = result.data.created_date.split(' ')[0];

          // Create a Date object
          const dateObj = new Date(datePart);

          // Format the date as MONTH/DAY/YEAR
          const formatted = dateObj.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          });
          setFormatedDate(formatted);
          // setFormatedDate(result.data.created_date)
          setEditIds(result.data.id)
          setModalVisible(true)
        }
      }

    }
    setModalVisible(true)
  };


  const removeSchedulerList = async (ids) => {
    const userid = await AsyncStorage.getItem('userId');
    const parsedUserId = userid ? JSON.parse(userid) : null;
    const result = await getApiCall('/scheduler-remove?scheduler_id=' + ids);

    if (result.status === true) {
      fetchSchedulerList();
    }
  };

  // Function to handle the date change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);  // hide the picker after selection
    setDate(currentDate);  // update the date
  };

  // Function to show the date picker
  const showDatePicker = () => {
    setShow(true);
  };

  // Render each todo item in the list
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openModal('edit', item.id)}>
      <View style={styles.card}>
        {/* Left Side */}
        <View style={styles.leftContainer}>
          <Text style={styles.serialNumber}>{index + 1}.</Text>
        </View>

        <View style={styles.centerContent}>
          <View style={styles.row}>
            <Text style={styles.createdDate}>{item.created_date}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Text>
        </View>

        {/* Right Side (Delete Icon) */}
        <View>
          <Text style={styles.priority}>{item.priority}</Text>
          <TouchableOpacity onPress={() => removeSchedulerList(item.id)} style={styles.rightContainer}>
            <Image source={require('../../images/bin.png')} style={{ width: 20, height: 20, marginTop: 25 }} />
          </TouchableOpacity>
        </View>

      </View>
    </TouchableOpacity>
  );
  useEffect(() => {
    fetchSchedulerList();
  }, [])
  // State for modal visibility and new task form
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FullScreenLoader visible={loading} />
      <View>
        <Header headerTitle={'Schedule'} />
      </View>
      <View style={{ alignItems: 'center' }}>

        <TextInput
        placeholderTextColor={'#000'}
        placeholder='Enter'
          style={styles.dateInput}
          value={filterFormattedDate}
          editable={false}  // Disable text editing
        />
        {/* Calendar icon */}
        <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <TouchableOpacity onPress={() => getAllFun()} style={{ marginLeft: 5 }}>
              <View style={{
                marginVertical: 10,
                backgroundColor: "green",
                height: 50,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: "500" }}>All List</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 5 }}>

          </View>
          <View>
            <TouchableOpacity onPress={() => setShowFilterPicker(true)}>
              <View style={{
                marginVertical: 10,
                backgroundColor: "green",
                height: 50,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: "500" }}>Filter</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showFilterPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleFilterMethod}
        />
      )}
      {/* <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>SN</Text>
        <Text style={styles.detailsText}>Description</Text>
        <Text style={styles.detailsText}>Date</Text>

        <View>
          <TouchableOpacity
            style={styles.createTodoButton}
            onPress={() => openModal('add', '')}
          >
            <Text style={{ color: '#fff' }}> + Add Schedule</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.addJobButton}>
        <TouchableOpacity style={styles.createTodoButton} onPress={() => openModal('add', '')} >
          <Text style={{ color: '#fff' }}>+ Add Schedule</Text>
        </TouchableOpacity>
      </View>
      {/* FlatList container */}
      <View style={styles.container}>
        {SchedulerList.length > 0 ? (<>
          <FlatList data={SchedulerList} renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10} // Number of items to render initially
            maxToRenderPerBatch={5} // Number of items rendered per batch
            updateCellsBatchingPeriod={30} // Time (ms) between batch renders
            windowSize={10} // Number of items in the viewport
            removeClippedSubviews={true} // Improves memory usage on large lists
            scrollEventThrottle={16} // Fires scroll events every 16ms (default for 60fps)
          />
        </>) : (<>
          <View style={styles.card}>
            {/* Left Side */}
            <View style={styles.leftContainer}>
              {/* <Text style={styles.serialNumber}>{index + 1}.</Text> */}
            </View>

            <View style={styles.centerContent}>
              
              <Text style={styles.datanotfound} numberOfLines={2} ellipsizeMode="tail">
               Data not found.
              </Text>
            </View>

            {/* Right Side (Delete Icon) */}
            <View>
              <Text style={styles.priority}></Text>
              {/* <TouchableOpacity onPress={() => removeSchedulerList(item.id)} style={styles.rightContainer}>
                <Image source={require('../../images/bin.png')} style={{ width: 20, height: 20, marginTop: 25 }} />
              </TouchableOpacity> */}
            </View>

          </View>
        </>)}


        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>

              <Text style={styles.modalTitle}>{showModalTitle}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                
                placeholderTextColor={'black'}
                  style={styles.dateInput}
                  value={formattedDate}
                  editable={false}  // Disable text editing
                />
                {/* Calendar icon */}
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                  {/* <Icon name="calendar-today" size={30} color="#000" style={styles.icon} /> */}
                  <Text style={styles.changeDate}>Change Date</Text>
                </TouchableOpacity>
              </View>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              <Text style={styles.FiledTitle}>Description *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Job Description"
                placeholderTextColor={'#000'}
                value={jobDescription} // Value of the TextInput
                onChangeText={(text) => setJobDescription(text)} // Correct function to update the state
              />

              {/* <View > */}

                <TouchableOpacity 
                style={{
                  marginVertical: 20,
                  paddingBottom: 5,
                  backgroundColor: "gray",
                  height: 50,
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
  
                }}
                
                onPress={() => handleAddJob()}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>{showModalTitle}</Text>
                </TouchableOpacity>
              {/* </View> */}

              
                <TouchableOpacity 
                 style={{
                  marginVertical: 10,
                  backgroundColor: "green",
                  height: 50,
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
                
                onPress={() => setModalVisible(false)}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>Cancel</Text>
                </TouchableOpacity>

              

            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    paddingTop: 20,
    // paddingHorizontal: 16,
    // backgroundColor: '#f5f5f5',

  },


  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  leftContainer: {
    flex: 1.5, // 15% of total width
    justifyContent: 'center',
    alignItems: 'center',
  },
  addJobButton: {
    flexDirection: 'row', // Ensures the content is aligned horizontally
    justifyContent: 'flex-end', // Aligns the button to the right
    alignItems: 'center', // Vertically centers the button
    padding: 10, // Adds padding for spacing
  },
  serialNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  centerContent: {
    flex: 7, // 70% of total width
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust spacing between createdDate and priority
    marginBottom: 4, // Add spacing below this row for username and description
  },
  createdDate: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  priority: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000', // High priority in red
    // marginLeft:170, // Add some space between createdDate and priority
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginVertical: 4,
  },
  datanotfound:{
    marginTop: 10,
    fontSize: 20,
    color: '#000',
  },
  description: {
    marginTop: 10,
    fontSize: 13,
    color: '#000',
  },
  rightContainer: {
    flex: 1.5, // 15% of total width
    justifyContent: 'center',
    alignItems: 'center',
  },





  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  changeDate: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dateInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color:'#000'
  },
  detailsContainer: {
    flexDirection: "row",
    marginLeft: 15,
    paddingTop: 20,
    // height: 50,
    // width: 60,
    // justifyContent: "space-around",
    alignItems: "center",
  },
  detailsText: {
    marginHorizontal: 10,
    fontSize: 16,
    paddingLeft: 5

  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
    textAlign: "center",
    // borderColor: "red",
    // borderWidth: 1,


  },
  FiledTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  todoText: {
    fontSize: 16,
    fontWeight: 'bold',


  },
  todoNameText: {
    marginLeft: 7,
  },
  priorityText: {
    fontSize: 14,
    color: 'gray',
  },
  statusText: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  createTodoButton: {
    // position: 'absolute',
    // bottom: 20,
    right: 0,
    // marginRight:0,
    marginLeft: 30,
    paddingRight: 20,
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: 400,
    height: 500,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 70,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color:'#000'


  },
});

export default Schedule