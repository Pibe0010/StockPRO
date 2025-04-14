import { useQuery } from "@tanstack/react-query";
import {
  BlockPage,
  CategoryStore,
  CategoryTemplate,
  CompanyStore,
  ErrorPage,
  UserStore,
} from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const CategoryPage = () => {
  const { addCategory, dataCategory, searchCategory, search } = CategoryStore();
  const { dataCompany } = CompanyStore();
  const { dataPermits } = UserStore();

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

  const statePermits = dataPermits.some((obj) =>
    obj.modules.name.includes("Category produsts")
  );

  if (statePermits === false) return <BlockPage state={statePermits} />;

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <CategoryTemplate data={dataCategory} />;
};
