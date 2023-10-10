import { create } from "zustand";

const useStore = create((set) => ({
  editingCell: null,
  toggleEditing: false,
  clickedCell: null,
  setEditingCell: (cell) => set({ editingCell: cell }),
  setToggleEditing: (toggle) => set({ toggleEditing: toggle }),
  setEditedValue: (editedValue) => set({ editedValue }),
}));

export default useStore;
