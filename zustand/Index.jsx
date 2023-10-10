import { create } from "zustand";

const useStore = create((set) => ({
  editingCell: null,
  toggleEditing: false,
  clickedCell: null,
  setEditingCell: (cell) => set({ editingCell: cell }),
  setToggleEditing: (toggle) => set({ toggleEditing: toggle }),
  setEditedValue: (editedValue) => set({ editedValue }),
  selectedDate: "",
  setSelectedDate: (date) => set({ selectedDate: date }),
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useStore;
