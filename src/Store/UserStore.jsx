import { create } from "zustand";
import { InsertUser } from "../Supabase/CrudUser.jsx";
import { supabase } from "../Supabase/supabase.config.jsx";

export const UserStore = create((set, get) => ({
  insertUserAdmin: async (params) => {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    if (error) return null;
    console.log("Data from user auth register", data);
    const userData = await InsertUser({
      id_auth: data.user.id,
      created_at: new Date(),
      role: "admin",
    });
    return userData;
  },
}));
