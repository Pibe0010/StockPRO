import { create } from "zustand";
import { AddCompany, UserCounter } from "../index.js";

export const CompanyStore = create((set, get) => ({
  counterUserData: 0,
  dataCompany: [],
  addCompany: async (params) => {
    const response = await AddCompany(params);
    set({ dataCompany: response || [] });
    return response ?? null;
  },
  userCounter: async (params) => {
    const response = await UserCounter(params);
    set({ counterUserData: response || 0 });
    return response ?? 0;
  },
}));
