import { create } from "zustand";

type AccountDataState = {
  accountData: object[];
  onUpdate: (accountData: object[]) => void;
};

export const useAccountData = create<AccountDataState>((set) => ({
  accountData: [],
  onUpdate: (accountData: object[]) => set({ accountData }),
}));
