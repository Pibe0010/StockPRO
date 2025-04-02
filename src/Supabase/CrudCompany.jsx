import { supabase } from "../index.js";

export const AddCompany = async (params) => {
  const { data, error } = await supabase
    .from("assign_company")
    .select(`company(id,name,currency)`)
    .eq("id_user", params.id_user)
    .maybeSingle();

  if (error) {
    return null;
  }
  return data ?? null;
};
