import { useQuery } from "@tanstack/react-query";
import { CategoryStore, CategoryTemplate, CompanyStore, ErrorPage } from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const CategoryPage = () => {
  const { addCategory, dataCategory, searchCategory, search } = CategoryStore();
  const { dataCompany } = CompanyStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add category", { idCompany: dataCompany?.id }],
    queryFn: () => addCategory({ id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: dataSearch } = useQuery({
    queryKey: ["search category", { idCompany: dataCompany.id, description: search }],
    queryFn: () => searchCategory({ id_company: dataCompany.id, description: search }),
    enabled: dataCompany.id != null,
  });

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <CategoryTemplate data={dataCategory} />;
};
