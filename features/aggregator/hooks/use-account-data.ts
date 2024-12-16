import { create } from "zustand";

type AccountDataState = {
  linkedAccounts: object[];
  onUpdate: (accountData: object[]) => void;
};

export const useAccountData = create<AccountDataState>((set) => ({
  linkedAccounts: [],
  onUpdate: (linkedAccounts: object[]) => set({ linkedAccounts }),
}));
