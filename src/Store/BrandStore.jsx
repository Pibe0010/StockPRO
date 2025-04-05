import { create } from "zustand";
import {
  AddBrand,
  DeleteBrand,
  InsertBrand,
  SearchBrand,
  UpdateBrand,
} from "../index.js";

export const BrandStore = create((set, get) => ({
  search: "",
  setSearch: (params) => set({ search: params }),
  dataBrand: [],
  selectItemBrand: [],
  paramsBrand: [],

  addBrand: async (params) => {
    const response = await AddBrand(params);
    set({ paramsBrand: params || [] });
    set({ dataBrand: response || [] });
    set({ selectItemBrand: response[0] });
    return response;
  },

  selectBrand: (params) => set({ selectItemBrand: params }),

  reloadBrand: async () => {
    const { addBrand, paramsBrand } = get();
    await addBrand(paramsBrand);
  },

  insertBrand: async (params) => {
    await InsertBrand(params);
    await get().reloadBrand();
  },

  deleteBrand: async (params) => {
    await DeleteBrand(params);
    await get().reloadBrand();
  },

  updateBrand: async (params) => {
    await UpdateBrand(params);
    await get().reloadBrand();
  },

  searchBrand: async (params) => {
    const response = await SearchBrand(params);
    set({ dataBrand: response || [] });
  },
}));
