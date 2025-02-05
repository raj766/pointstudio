import { View, ScrollView, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Modal, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from './mainComponent/Header';
import { useNavigation } from '@react-navigation/native';
import FullScreenLoader from '../FullScreenLoader';
import { getApiCall, getApiCallToken, postApiCall } from '../../Services/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_url } from '../../utils/Utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
const Main = () => {

  const [employees, setEmployes] = useState('');
  const [priority, setPriority] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [editIds, setEditIds] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [showModalTitle, setShowModalTitle] = useState('Add Job');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState({ name: '', priority: '', status: 'Incomplete' });
  const [date, setDate] = useState(new Date());  // default date to current date
  const [formattedDate, setFormatedDate] = useState(date.toLocaleDateString());  // default date to current date
  const [show, setShow] = useState(false);  // controls when the DateTimePicker shows

  const [showPicker, setShowPicker] = useState(false);

  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const [checkApplyFilter, setCheckApplyFilter] = useState(false);
  const [filterdate, setFilterDate] = useState(new Date());  // default date to current date
  const [filterFormattedDate, setFilterFormatedDate] = useState(filterdate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',

  }));
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log('currentDate',currentDate)
    setShowPicker(false);  // Hide the picker after selection
    setDate(currentDate);  // Set the selected date
    // setFormatedDate(currentDate.toLocaleDateString());

    // Format the selected date
    const formattedDate2 = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',

    }); // Format the date
    setFormatedDate(formattedDate2); // Update formattedDate
  };
  const handleFilterMethod = (event, selectedDate) => {
    const currentDate = selectedDate || filterdate;
    setCheckApplyFilter(true);  // Set the selected date
    setFilterFormatedDate(currentDate);
    setFilterDate(currentDate);
    fetchJObList(currentDate.toLocaleDateString());
    setShowFilterPicker(false);  // Hide the picker after selection
  };

  const handleAddJob = async () => {

    if (editIds == '') {
      console.log('add job',{ emp_id: employees, created_date: formattedDate, job_title: jobDescription, priority: priority })
      const result = await postApiCall('/add-job', { emp_id: employees, created_date: formattedDate, job_title: jobDescription, priority: priority });

      if (result.status === true) {
        fetchJObList('');
      }
    }
    if (editIds !== '') {
      const result = await postApiCall('/update-job', { job_id: editIds, emp_id: employees, created_date: formattedDate, job_title: jobDescription, priority: priority });

      if (result.status === true) {
        fetchJObList('');
        setModalVisible(false)
      }
    }

  }
  const fetchJObList = async (dates) => {
    // setLoading(true);
    const userid = await AsyncStorage.getItem('userId');
    const parsedUserId = userid ? JSON.parse(userid) : null;
    // const datess = dates != '' || dates != undefined || dates != 'undefined' ? dates : filterFormattedDate;
    /* const result = await getApiCall('get-job-list?date=' + datess) */
    const result = await getApiCall('get-job-list')

    if (result.status == true) {
      setJobList(result.data);
      setLoading(false);
    } else {
      setJobList([]);
      setLoading(false);
    }
    setModalVisible(false)
  }

  useEffect(() => {
   
   fetchJObList(filterFormattedDate);
   
  }, [])

  const navigation = useNavigation();
  const openModal = async (types, ids) => {
    if (types === 'add') {
      setShowModalTitle('Add Job')
      setEmployes('');
      setPriority('');
      setJobDescription('');
      setCreatedDate('');
      setFormatedDate(date.toLocaleDateString())
      setEditIds('');
    }
    if (types === 'edit') {

      setShowModalTitle('edit Job')
      if (ids != '') {

        const userid = await AsyncStorage.getItem('userId');
        const parsedUserId = userid ? JSON.parse(userid) : null;
        const result = await getApiCall('get-job-details?user_id=' + parsedUserId + '&job_id=' + ids)

        if (result.status === true) {

          setEmployes(result.data.emp_id)
          setPriority(result.data.priority)
          setJobDescription(result.data.job_title)
          setFormatedDate(result.data.created_date)
          setEditIds(result.data.id)
          setModalVisible(true)
        }
      }

    }
    setModalVisible(true)
  };


  const removeJobList = async (ids) => {
    const userid = await AsyncStorage.getItem('userId');
    const parsedUserId = userid ? JSON.parse(userid) : null;
    const result = await getApiCall('/remove-job?user_id=' + parsedUserId + '&job_id=' + ids);

    if (result.status === true) {
      fetchJObList('');
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
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
            {item.emp_id}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {item.job_title}
          </Text>
        </View>

        {/* Right Side (Delete Icon) */}
        <View>
        <Text style={styles.priority}>{item.priority}</Text>
        <TouchableOpacity onPress={() => removeJobList(item.id)} style={styles.rightContainer}>
          <Image source={require('../../images/bin.png')} style={{ width: 20, height: 20, marginTop:25 }} />
        </TouchableOpacity>
        </View>
        
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FullScreenLoader visible={loading} />
      <View>
        <Header />
      </View>
      {/* <View style={{ alignItems: 'center' }}>
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
      {showFilterPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleFilterMethod}
        />
      )} */}
        <View style={styles.addJobButton}>
          <TouchableOpacity style={styles.createTodoButton} onPress={() => openModal('add', '')} >
            <Text style={{ color: '#fff' }}>+ Add Job</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.container}>
        <FlatList data={jobList} renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10} // Number of items to render initially
          maxToRenderPerBatch={5} // Number of items rendered per batch
          updateCellsBatchingPeriod={30} // Time (ms) between batch renders
          windowSize={10} // Number of items in the viewport
          removeClippedSubviews={true} // Improves memory usage on large lists
          scrollEventThrottle={16} // Fires scroll events every 16ms (default for 60fps)
        />

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
                  style={styles.dateInput}
                  value={formattedDate}
                  editable={false}  // Disable text editing
                />
                {/* Calendar icon */}
                <TouchableOpacity onPress={() => setShowPicker(true)}>
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
              <Text style={styles.FiledTitle}>  Priority *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={priority}
                  onValueChange={(itemValue) => setPriority(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Low" value="Low" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="High" value="High" />
                </Picker>
              </View>
              <Text style={styles.FiledTitle}> Employee *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Employee Name"
                placeholderTextColor={'#000'}
                value={employees} // Value of the TextInput
                onChangeText={(text) => setEmployes(text)} // Correct function to update the state
              />

              <Text style={styles.FiledTitle}>Description *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Job Description"
                placeholderTextColor={'#000'}
                value={jobDescription} // Value of the TextInput
                onChangeText={(text) => setJobDescription(text)} // Correct function to update the state
              />

            

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
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  addJobButton: {
    flexDirection: 'row', // Ensures the content is aligned horizontally
    justifyContent: 'flex-end', // Aligns the button to the right
    alignItems: 'center', // Vertically centers the button
    padding: 10, // Adds padding for spacing
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

  description: {
    fontSize: 12,
    color: '#555',
  },
  rightContainer: {
    flex: 1.5, // 15% of total width
    justifyContent: 'center',
    alignItems: 'center',
  },



  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden', // Ensures content doesn't spill over rounded borders
    width: '100%',
    height: 50,
    marginTop: 5,
    justifyContent: 'center',
  },
  picker: {
    height: 60,
    width: '100%',
    color:'#000',

  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  changeDate: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dateInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    // marginLeft: 15,
    paddingTop: 20,
    padding: 10,
    alignItems: "center",
  },
  detailsText: {
    marginHorizontal: 10,
    fontSize: 16,

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
    height: 570,
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

export default Main