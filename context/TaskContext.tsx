import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface DayTasks {
  [day: number]: Task[];
}

interface TaskContextProps {
  tasks: DayTasks;
  setTasks: React.Dispatch<React.SetStateAction<DayTasks>>;
  addTask: (day: number, title: string) => void;
  toggleTaskCompletion: (day: number, id: string) => void;
  editTask: (day: number, id: string, title: string) => void;
  deleteTask: (day: number, id: string) => void;
  getDayStatus: (day: number) => "green" | "yellow" | "white";
}

// Context
export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Provider
export const TaskContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<DayTasks>({});

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (tasks: DayTasks) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (day: number, title: string) => {
    const newTask = { id: Date.now().toString(), title, completed: false };
    const updatedTasks = {
      ...tasks,
      [day]: [...(tasks[day] || []), newTask],
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleTaskCompletion = (day: number, id: string) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (day: number, id: string, title: string) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].map((task) =>
        task.id === id ? { ...task, title } : task
      ),
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (day: number, id: string) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].filter((task) => task.id !== id),
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const getDayStatus = (day: number): "green" | "yellow" | "white" => {
    const dayTasks = tasks[day];
    if (!dayTasks || dayTasks.length === 0) return "white";
    const completedTasks = dayTasks.filter((task) => task.completed).length;
    if (completedTasks === dayTasks.length) return "green";
    if (dayTasks.length > 0) return "yellow";
    return "white";
  };
  

  return (
    <TaskContext.Provider
      value={{ tasks,setTasks, addTask, toggleTaskCompletion, editTask, deleteTask, getDayStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
