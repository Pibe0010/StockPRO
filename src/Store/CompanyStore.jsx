import { create } from "zustand";
import { AddCompany } from "../index.js";

export const CompanyStore = create((set, get) => ({
  dataCompany: [],
  addCompany: async (params) => {
    const response = await AddCompany(params);
    set({ dataCompany: response || [] });
    return response ?? null;
  },
}));
