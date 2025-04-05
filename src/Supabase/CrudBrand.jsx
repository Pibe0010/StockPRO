import { supabase } from "../index.js";
import Swal from "sweetalert2";

export const InsertBrand = async (params) => {
  const { error } = await supabase.rpc("insert_brand", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export const AddBrand = async (params) => {
  const { data } = await supabase
    .from("brand")
    .select()
    .eq("id_company", params.id_company)
    .order("id", { ascending: true });

  return data ?? [];
};

export const DeleteBrand = async (params) => {
  const { error } = await supabase.from("brand").delete().eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to delete brand!" + error.message,
    });
  }
};

export const UpdateBrand = async (params) => {
  const { error } = await supabase.from("brand").update(params).eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to update brand! " + error.message,
    });
  }
};

export const SearchBrand = async (params) => {
  const { data, error } = await supabase
    .from("brand")
    .select()
    .eq("id_company", params.id_company)
    .ilike("description", `%${params.description}%`);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search brand!" + error.message,
    });
  }

  return data ?? [];
};
