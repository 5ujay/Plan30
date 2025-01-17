import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import AppGradient from "@/components/AppGradient";
import { useLocalSearchParams } from "expo-router";
import { useTask } from "@/context/TaskContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const DayDetail: React.FC = () => {
  const { day } = useLocalSearchParams<{ day: string }>();
  const [newTask, setNewTask] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  const { tasks, addTask, toggleTaskCompletion, editTask, deleteTask } =
    useTask();

  const dayNumber = parseInt(day || "0", 10);

  useEffect(() => {
    checkCompletionStatus();
  }, [tasks]);

  const checkCompletionStatus = () => {
    const dayTasks = tasks[dayNumber] || [];
    if (dayTasks.length > 0 && dayTasks.every((task) => task.completed)) {
      setShowCongrats(true);
    } else {
      setShowCongrats(false);
    }
  };

  const closeCongratsModal = () => setShowCongrats(false);

  const handleTask = () => {
    if (!newTask.trim()) {
      Alert.alert("Error", "Task cannot be empty!");
      return;
    }

    const dayTasks = tasks[dayNumber] || [];
    if (dayTasks.length >= 10 && !editingId) {
      Alert.alert(
        "Limit Reached",
        "Quality over quantity always leads to lasting success ✨"
      );
      return;
    }

    if (editingId) {
      editTask(dayNumber, editingId, newTask);
      setEditingId(null);
    } else {
      addTask(dayNumber, newTask);
    }

    setNewTask("");
  };

  const handleEditTask = (id: string, title: string) => {
    setEditingId(id);
    setNewTask(title);
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert("Confirm", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTask(dayNumber, id),
      },
    ]);
  };

  const dayTasks = tasks[dayNumber] || [];

  return (
    <View style={styles.container}>
      <AppGradient colors={["#1E1E1E", "#FFD700"]}>
        <Text style={styles.header}>Day {day}: Get Ready!</Text>
        <Text style={styles.subHeader}>📝 Top Goals to Complete Today 📚</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter a new task"
            value={newTask}
            onChangeText={setNewTask}
            placeholderTextColor="#aaa"
            maxLength={50}
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleTask}>
            <Text style={styles.addButtonText}>
              {editingId ? "UPDATE" : "ADD"}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={styles.taskList}
          data={dayTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.taskContainer,
                item.completed && styles.taskCompletedContainer,
              ]}
            >
              <TouchableOpacity
                onPress={() => toggleTaskCompletion(dayNumber, item.id)}
                style={styles.checkbox}
              >
                {item.completed ? (
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#757575" />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.taskTextCompleted,
                ]}
              >
                {item.title}
              </Text>
              {item.completed ? (
                ""
              ) : (
                <View style={styles.actions}>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => handleEditTask(item.id, item.title)}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={24}
                      color="#000"
                    />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => handleDeleteTask(item.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="#F44336"
                    />
                  </Pressable>
                </View>
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />

        {/* Congratulations Modal */}
        <Modal
          transparent={true}
          visible={showCongrats}
          animationType="fade"
          onRequestClose={closeCongratsModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
              <Text style={styles.congratsMessage}>
                You’ve completed all your tasks for today! Great job!
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeCongratsModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </AppGradient>
    </View>
  );
};

export default DayDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskCompletedContainer: {
    backgroundColor: "#ffea5a",
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  congratsText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  congratsMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#ffea5a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
