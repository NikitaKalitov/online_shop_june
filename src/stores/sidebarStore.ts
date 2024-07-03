import { create } from "zustand";

interface SidebarStoreState {
  visible: boolean;

  show: () => void;
  hide: () => void;
}

export const useSidebarStore = create<SidebarStoreState>()((set, get) => ({
  visible: false,

  show: () => {
    set({ visible: true });
  },

  hide: () => {
    set({ visible: false });
  },
}));
