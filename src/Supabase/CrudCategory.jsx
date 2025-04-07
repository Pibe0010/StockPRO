import { supabase } from "../index.js";
import Swal from "sweetalert2";

export const InsertCategory = async (params) => {
  const { error } = await supabase.rpc("insert_category", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export const AddCategory = async (params) => {
  const { data } = await supabase
    .from("category")
    .select()
    .eq("id_company", params.id_company)
    .order("id", { ascending: true });

  return data ?? [];
};

export const DeleteCategory = async (params) => {
  const { error } = await supabase.from("category").delete().eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to delete category!" + error.message,
    });
  }
};

export const UpdateCategory = async (params) => {
  const { error } = await supabase.from("category").update(params).eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to update category! " + error.message,
    });
  }
};

export const SearchCategory = async (params) => {
  const { data, error } = await supabase
    .from("category")
    .select()
    .eq("id_company", params.id_company)
    .ilike("description", `%${params.description}%`);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search category!" + error.message,
    });
  }

  return data ?? [];
};
