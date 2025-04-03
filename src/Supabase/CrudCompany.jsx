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

export const UserCounter = async (params) => {
  const { data, error } = await supabase.rpc("counter_users_company", {
    company_id: params.id_company,
  });

  if (error) return null;

  return data ?? null;
};
