import { create } from "zustand";
import {
  AddProduct,
  AllReportStock,
  AllReportStockProducts,
  DeleteProduct,
  InsertProduct,
  SearchProduct,
  UpdateProduct,
  ReportMinStockProducts,
  ReportKardexEntrysAndExits,
} from "../index.js";

export const ProductStore = create((set, get) => ({
  search: "",
  setSearch: (params) => set({ search: params }),
  dataProduct: [],
  selectItemProduct: [],
  paramsProduct: [],

  addProduct: async (params) => {
    const response = await AddProduct(params);
    set({ paramsProduct: params || [] });
    set({ dataProduct: response || [] });
    set({ selectItemProduct: response[0] });
    return response;
  },

  selectProduct: (params) => set({ selectItemProduct: params }),

  reloadProduct: async () => {
    const { addProduct, paramsProduct } = get();
    await addProduct(paramsProduct);
  },

  insertProduct: async (params) => {
    await InsertProduct(params);
    await get().reloadProduct();
  },

  deleteProduct: async (params) => {
    await DeleteProduct(params);
    await get().reloadProduct();
  },

  updateProduct: async (params) => {
    await UpdateProduct(params);
    await get().reloadProduct();
  },

  searchProduct: async (params) => {
    const response = await SearchProduct(params);
    set({ dataProduct: response || [] });
    return response || [];
  },

  allReportStock: async (params) => {
    const response = await AllReportStock(params);
    return response || [];
  },

  allReportStockProduct: async (params) => {
    const response = await AllReportStockProducts(params);
    return response || [];
  },

  reportMinStockProducts: async (params) => {
    const response = await ReportMinStockProducts(params);
    return response || [];
  },

  reportKardexEntrysAndExits: async (params) => {
    const response = await ReportKardexEntrysAndExits(params);
    return response || [];
  },
}));
