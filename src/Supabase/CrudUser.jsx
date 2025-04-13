import Swal from "sweetalert2";
import { AddIdAuthSupaBase, supabase } from "../index.js";

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

export const AddUsers = async () => {
  const idAuthSupaBase = await AddIdAuthSupaBase();
  const { data } = await supabase
    .from("user")
    .select()
    .eq("id_auth", idAuthSupaBase)
    .maybeSingle();

  if (data) return data ?? [];
};

export const AddAllUsers = async (params) => {
  const { data } = await supabase.rpc("add_staff", params);

  if (data) return data;
};

export const DeleteUser = async (params) => {
  const { error } = await supabase.from("user").delete().eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to delete user!" + error.message,
    });
  }
};

export const UpdateUser = async (params) => {
  const { error } = await supabase.from("user").update(params).eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to update user! " + error.message,
    });
  }
};

export const SearchUser = async (params) => {
  const { data, error } = await supabase.rpc("search_user", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search user!" + error.message,
    });
  }

  return data ?? [];
};

export const InsertAssings = async (params) => {
  const { error } = await supabase.from("assign_company").insert(params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to register assing company!" + error.message,
    });
  }
};

export const InsertPermits = async (params) => {
  const { error } = await supabase.from("permits").insert(params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to insert permits!" + error.message,
    });
  }
};

export const AddPermits = async (params) => {
  const { data, error } = await supabase
    .from("permits")
    .select(`id, id_user, id_module, modules(name)`)
    .eq("id_user", params.id_user);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search permit!" + error.message,
    });
  }

  return data ?? [];
};

export const DeletePermits = async (params) => {
  const { error } = await supabase.from("permits").delete().eq("id_user", params.id_user);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to search permit!" + error.message,
    });
  }
};

export const AddModules = async () => {
  const { data } = await supabase.from("modules").select();
  return data;
};
