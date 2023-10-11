import { create } from "zustand";

const useStore = create((set) => ({
  toggleEditing: false,
  setToggleEditing: (toggle) => set({ toggleEditing: toggle }),
  editingCell: "",
  setEditingCell: (cell) => set({ editingCell: cell }),
  selectedDate: "",
  setSelectedDate: (date) => set({ selectedDate: date }),
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  inputValue: "",
  setInputValue: (newValue) => set({ inputValue: newValue }),
}));

export default useStore;
