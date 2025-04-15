import { create } from "zustand";
import {
  AddAllUsers,
  AddModules,
  AddPermits,
  AddUsers,
  DeletePermits,
  InsertAssings,
  InsertPermits,
  InsertUser,
  SearchUser,
  SettingsDataModules,
  UpdateUser,
} from "../index.js";
import { supabase } from "../Supabase/supabase.config.jsx";

export const UserStore = create((set, get) => ({
  dataModules: [],
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
      role: "superAdmin",
    });
    return userData;
  },

  idUser: 0,
  addUsers: async () => {
    const response = await AddUsers();
    set({ idUser: response.id });
    return response;
  },

  search: "",
  setSearch: (params) => set({ search: params }),
  dataUser: [],
  selectItemUser: [],
  paramsUser: {},

  addAllUser: async (params) => {
    const response = await AddAllUsers(params);
    set({ paramsUser: params || {} });
    set({ dataUser: response || [] });
    set({ selectItemUser: response[0] });
    return response;
  },

  selectUser: (params) => set({ selectItemUser: params }),

  reloadUser: async () => {
    const { addUser, paramsUser } = get();
    await addUser(paramsUser);
  },

  InsertUser: async (authParams, params, dataCheckPermits) => {
    const { data, error } = await supabase.auth.signUp({
      email: authParams.email,
      password: authParams.password,
    });

    if (error) return null;

    const dataUserNew = await InsertUser({
      name: params.name,
      personal_number: params.personal_number,
      phone: params.phone,
      address: params.address,
      created_at: new Date(),
      status: "active",
      id_auth: data.user.id,
      role: params.role,
      doc_type: params.doc_type,
      email: params.email,
    });

    await InsertAssings({ id_company: params.id_company, id_user: dataUserNew.id });

    dataCheckPermits.forEach(async (item) => {
      if (item.check) {
        let permitsParams = {
          id_user: dataUserNew.id,
          id_module: item.id,
        };
        await InsertPermits(permitsParams);
      }
    });
    await supabase.auth.signOut();
  },

  deleteUser: async (params) => {
    await DeleteUser(params);
    await get().reloadUser();
  },

  updateUser: async (params, dataCheckPermits, id_company) => {
    await UpdateUser(params);
    await DeletePermits({ id_user: params.id });

    dataCheckPermits.forEach(async (item) => {
      if (item.check) {
        let permitsParams = {
          id_user: params.id,
          id_module: item.id,
        };
        await InsertPermits(permitsParams);
      }
    });
    const { addAllUser } = get();
    set(addAllUser({ _id_company: id_company }));
  },

  searchUser: async (params) => {
    const response = await SearchUser(params);
    set({ dataUser: response || [] });
    return response;
  },

  addModule: async () => {
    const response = await AddModules();
    set({ dataModules: response || [] });
    return response;
  },

  dataPermits: [],
  dataPermitsUser: [],

  addPermits: async (params) => {
    const response = await AddPermits(params);
    set({ dataPermits: response || [] });

    let alldocs = [];

    SettingsDataModules.forEach((element) => {
      const statePermits = response.some((obj) =>
        obj.modules.name.includes(element.title)
      );

      if (statePermits) {
        alldocs.push({ ...element, state: true });
      } else {
        alldocs.push({ ...element, state: false });
      }
    });

    SettingsDataModules.splice(0, SettingsDataModules.length);
    SettingsDataModules.push(...alldocs);

    return response;
  },

  updatePermitsUser: async (params) => {
    const response = await AddPermits(params);
    set({ dataPermitsUser: response || [] });
    return response;
  },
}));
