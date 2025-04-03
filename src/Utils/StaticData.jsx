import { v } from "../Styles/Variables.jsx";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";

export const UserDropDown = [
  {
    text: "MY Profile",
    icono: <v.iconoUser />,
    tipo: "myprofile",
  },
  {
    text: "Settings",
    icono: <v.iconoSettings />,
    tipo: "settings",
  },
  {
    text: "Logout",
    icono: <v.iconoCerrarSesion />,
    tipo: "logout",
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Kardex",
    icon: <v.iconocategorias />,
    to: "/kardex",
  },
  {
    label: "Reports",
    icon: <v.iconoreportes />,
    to: "/reports",
  },
];
export const SecondarylinksArray = [
  {
    label: "Settings",
    icon: <AiOutlineSetting />,
    to: "/settings",
  },
];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
  },
  {
    icono: "🌚",
    descripcion: "dark",
  },
];

//data configuracion
export const SettingsDataModules = [
  {
    title: "Products",
    subtitle: "Register your products",
    icono: "https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link: "/settings/products",
  },
  {
    title: "Staff",
    subtitle: "have control of your staff",
    icono: "https://i.ibb.co/5vgZ0fX/hombre.png",
    link: "/settings/users",
  },

  {
    title: "My company",
    subtitle: "Configure your basic options",
    icono: "https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link: "/settings/company",
  },
  {
    title: "Products category",
    subtitle: "Assign categories to your products",
    icono: "https://i.ibb.co/VYbMRLZ/categoria.png",
    link: "/settings/category",
  },
  {
    title: "Products brand",
    subtitle: "Manage your brands",
    icono: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/settings/brand",
  },
];
//tipo usuario
export const TipouserData = [
  {
    descripcion: "empleado",
    icono: "🪖",
  },
  {
    descripcion: "administrador",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];
