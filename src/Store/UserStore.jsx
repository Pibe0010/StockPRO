import { create } from "zustand";
import { addUsers, InsertUser } from "../Supabase/CrudUser.jsx";
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

  idUser: 0,
  addUsers: async () => {
    const response = await addUsers();
    set({ idUser: response.id });
    return response;
  },
}));
