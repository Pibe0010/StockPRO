import Swal from "sweetalert2";
import { supabase } from "../index.js";

export const InsertUser = async (params) => {
  const { data, error } = await supabase
    .from("user")
    .insert(params)
    .select()
    .maybeSingle();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to register user!" + error.message,
    });
  }
  if (data) {
    return data;
  }
};
