import { create } from "zustand";

interface SidebarStoreState {
  toggle: boolean;

  changeToggle: () => void;
}

export const useSidebarStore = create<SidebarStoreState>()((set, get) => ({
  toggle: false,

  changeToggle: () => {
    set({ toggle: !get().toggle });
  },
}));
