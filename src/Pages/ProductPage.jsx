import { useQuery } from "@tanstack/react-query";
import {
  BlockPage,
  BrandStore,
  CategoryStore,
  CompanyStore,
  ErrorPage,
  ProductStore,
  ProductTemplate,
  UserStore,
} from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const ProductPage = () => {
  const { addProduct, dataProduct, searchProduct, search } = ProductStore();
  const { dataCompany } = CompanyStore();
  const { addBrand } = BrandStore();
  const { addCategory } = CategoryStore();
  const { dataPermits } = UserStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add product", { _id_company: dataCompany?.id }],
    queryFn: () => addProduct({ _id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: dataSearch } = useQuery({
    queryKey: ["search product", { _id_company: dataCompany.id, description: search }],
    queryFn: () => searchProduct({ _id_company: dataCompany.id, search: search }),
    enabled: dataCompany.id != null,
  });

  const { data: dataBrand } = useQuery({
    queryKey: ["add brand", { idCompany: dataCompany?.id }],
    queryFn: () => addBrand({ id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["add category", { idCompany: dataCompany?.id }],
    queryFn: () => addCategory({ id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const statePermits = dataPermits.some((obj) => obj.modules.name.includes("Products"));

  if (statePermits === false) return <BlockPage state={statePermits} />;

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <ProductTemplate data={dataProduct} />;
};
