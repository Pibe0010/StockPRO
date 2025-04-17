import { supabase } from "../index.js";
import Swal from "sweetalert2";

export const InsertKardex = async (params) => {
  const { error } = await supabase.from("kardex").insert(params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export const AddKardex = async (params) => {
  const { data } = await supabase
    .rpc("add_kardex_company", params)
    .order("id", { ascending: false });

  return data ?? [];
};

export const DeleteKardex = async (params) => {
  const { error } = await supabase.from("kardex").delete().eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to delete Kardex!" + error.message,
    });
  }
};

export const UpdateKardex = async (params) => {
  const { error } = await supabase.from("Kardex").update(params).eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to update Kardex! " + error.message,
    });
  }
};

export const SearchKardex = async (params) => {
  const { data, error } = await supabase.rpc("search_kardex_company", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search Kardex!" + error.message,
    });
  }

  return data ?? [];
};
