import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ListRenderItemInfo, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; // Importing MaterialIcons for the icons

interface Task {
  text: string;
  completed: boolean;
}

export default function App() {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (task.length > 0) {
      setTaskItems([...taskItems, { text: task, completed: false }]);
      setTask(''); // Clear the input after adding a task
      Keyboard.dismiss(); // Dismiss the keyboard after adding the task
    }
  };

  const handleDeleteTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const handleCompleteTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  };

  const renderTask = ({ item, index }: ListRenderItemInfo<Task>) => (
    <View style={[styles.taskItem, item.completed && styles.completedTask]}>
      <Text style={item.completed ? styles.completedTaskText : styles.taskText}>
        {item.text}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleCompleteTask(index)} style={styles.actionButton}>
          <MaterialIcons name="check" size={24} color="#EEEEEE" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)} style={styles.actionButton}>
          <MaterialIcons name="delete" size={24} color="#EEEEEE" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Albert TO DO LIST</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          placeholderTextColor="#EEEEEE"
          value={task}
          onChangeText={text => setTask(text)}
          onSubmitEditing={handleAddTask} // Automatically add task when "Enter" is pressed
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskItems}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        style={styles.taskList}
        contentContainerStyle={{ paddingBottom: 100 }} // Space at the bottom for better scrolling
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831', // Main background color
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EEEEEE', // Light font color for the title
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#393E46', // Darker background for the input section
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#EEEEEE', // Light text color for input
    backgroundColor: '#393E46', // Match input background to container
    borderRadius: 10,
    borderColor: '#00ADB5',
    borderWidth: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#00ADB5', // Accent color for the add button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#222831', // Darker text color for contrast on the button
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: '#393E46', // Background color for each task item
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#00ADB5',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#EEEEEE', // Light text color for tasks
    flex: 1,
  },
  completedTaskText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#EEEEEE', // Accent color for completed tasks
  },
  completedTask: {
    backgroundColor: '#222831', // Darker background for completed tasks
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 10,
    backgroundColor: '#00ADB5', // Matching accent color for the buttons
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
