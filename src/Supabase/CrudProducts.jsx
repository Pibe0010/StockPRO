import { supabase } from "../index.js";
import Swal from "sweetalert2";

export const InsertProduct = async (params) => {
  const { error } = await supabase.rpc("insert_product", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export const AddProduct = async (params) => {
  const { data } = await supabase.rpc("add_products", params);
  return data ?? [];
};

export const DeleteProduct = async (params) => {
  const { error } = await supabase.from("products").delete().eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to delete product!" + error.message,
    });
  }
};

export const UpdateProduct = async (params) => {
  const { error } = await supabase.from("products").update(params).eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to update product! " + error.message,
    });
  }
};

export const SearchProduct = async (params) => {
  const { data, error } = await supabase.rpc("search_products", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search product!" + error.message,
    });
  }

  return data ?? [];
};

// Reports
export const AllReportStock = async (params) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id_company", params.id_company);

  if (error) return [];

  return data ?? [];
};

export const AllReportStockProducts = async (params) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id_company", params.id_company)
    .eq("id", params.id);

  if (error) return [];

  return data ?? [];
};

export const ReportMinStockProducts = async (params) => {
  const { data, error } = await supabase.rpc("report_stock_product_min", params);

  if (error) return [];

  return data ?? [];
};

export const ReportKardexEntrysAndExits = async (params) => {
  const { data, error } = await supabase.rpc("add_company_kardex", params);

  if (error) return [];

  return data ?? [];
};
