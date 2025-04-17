import { create } from "zustand";
import {
  AddKardex,
  DeleteKardex,
  InsertKardex,
  SearchKardex,
  UpdateKardex,
} from "../index.js";

export const KardexStore = create((set, get) => ({
  search: "",
  setSearch: (params) => set({ search: params }),
  dataKardex: [],
  selectItemKardex: [],
  paramsKardex: {},

  addKardex: async (params) => {
    const response = await AddKardex(params);
    set({ paramsKardex: params || [] });
    set({ dataKardex: response || [] });
    set({ selectItemKardex: response[0] });
    return response;
  },

  selectKardex: (params) => set({ selectItemKardex: params }),

  reloadKardex: async () => {
    const { addKardex, paramsKardex } = get();
    await addKardex(paramsKardex);
  },

  insertKardex: async (params) => {
    await InsertKardex(params);
    await get().reloadKardex();
  },

  deleteKardex: async (params) => {
    await DeleteKardex(params);
    await get().reloadKardex();
  },

  updateKardex: async (params) => {
    await UpdateKardex(params);
    await get().reloadKardex();
  },

  searchKardex: async (params) => {
    const response = await SearchKardex(params);
    set({ dataKardex: response || [] });
  },
}));
