import { create } from "zustand";
import {
  AddCategory,
  DeleteCategory,
  InsertCategory,
  SearchCategory,
  UpdateCategory,
} from "../index.js";

export const CategoryStore = create((set, get) => ({
  search: "",
  setSearch: (params) => set({ search: params }),
  dataCategory: [],
  selectItemCategory: [],
  paramsCategory: [],

  addCategory: async (params) => {
    const response = await AddCategory(params);
    set({ paramsCategory: params || [] });
    set({ dataCategory: response || [] });
    set({ selectItemCategory: response[0] });
    return response;
  },

  selectCategory: (params) => set({ selectItemCategory: params }),

  reloadCategory: async () => {
    const { addCategory, paramsCategory } = get();
    await addCategory(paramsCategory);
  },

  insertCategory: async (params) => {
    await InsertCategory(params);
    await get().reloadCategory();
  },

  deleteCategory: async (params) => {
    await DeleteCategory(params);
    await get().reloadCategory();
  },

  updateCategory: async (params) => {
    await UpdateCategory(params);
    await get().reloadCategory();
  },

  searchCategory: async (params) => {
    const response = await SearchCategory(params);
    set({ dataCategory: response || [] });
  },
}));
