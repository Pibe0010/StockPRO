import { useQuery } from "@tanstack/react-query";
import {
  BlockPage,
  BrandStore,
  BrandTemplate,
  CompanyStore,
  ErrorPage,
  UserStore,
} from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const BrandPege = () => {
  const { addBrand, dataBrand, searchBrand, search } = BrandStore();
  const { dataCompany } = CompanyStore();
  const { dataPermits } = UserStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add brand", { idCompany: dataCompany?.id }],
    queryFn: () => addBrand({ id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: dataSearch } = useQuery({
    queryKey: ["search brand", { idCompany: dataCompany.id, description: search }],
    queryFn: () => searchBrand({ id_company: dataCompany.id, description: search }),
    enabled: dataCompany.id != null,
  });

  const statePermits = dataPermits.some((obj) =>
    obj.modules.name.includes("Brand products")
  );

  if (statePermits === false) return <BlockPage state={statePermits} />;

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <BrandTemplate data={dataBrand} />;
};
