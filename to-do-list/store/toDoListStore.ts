import { IToDoList } from "@/interface/toDoList";
import { create } from "zustand";

interface IToDoListStore {
  toDoList: IToDoList[];
  setToDoList: (tasks: IToDoList[]) => void;
  getToDoListById: (id: number) => IToDoList | undefined;
  createToDoList: (task: IToDoList) => void;
  updateToDoListById: (id: number, updateRole: Partial<IToDoList>) => void;
  deleteToDoListById: (id: number) => void;
  doneTask: (id: number, done: boolean) => void;
}

export const useToDoListStore = create<IToDoListStore>((set, get) => ({
  toDoList: [
    {
      id: 1,
      title: "Задача 1",
      task: "Описание задачи",
      date: "26/07/2024",
      done: false,
    },
    {
      id: 2,
      title: "Задача 2",
      task: "Описание задачи",
      date: "27/07/2024",
      done: true,
    },
  ],

  setToDoList: (tasks) => {
    set({ toDoList: tasks });
  },

  getToDoListById: (id) => {
    return get().toDoList.find((task) => task.id === id);
  },

  createToDoList(task) {
    set((state) => {
      return { toDoList: [...state.toDoList, task] };
    });
  },

  updateToDoListById(id, updateTask) {
    set((state) => ({
      toDoList: state.toDoList.map((task) =>
        task.id === id ? { ...task, ...updateTask } : task
      ),
    }));
  },

  deleteToDoListById(id) {
    set((state) => ({
      toDoList: state.toDoList.filter((task) => task.id !== id),
    }));
  },

  doneTask: (id, done) => {
    set((state) => ({
      toDoList: state.toDoList.map((task) =>
        task.id === id ? { ...task, done: done } : task
      ),
    }));
  },
}));
