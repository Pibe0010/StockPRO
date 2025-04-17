import { useQuery } from "@tanstack/react-query";
import {
  BlockPage,
  CompanyStore,
  ErrorPage,
  KardexStore,
  KardexTemplate,
  ProductStore,
  UserStore,
} from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const KardexPege = () => {
  const { addKardex, dataKardex, searchKardex, search } = KardexStore();
  const { dataCompany } = CompanyStore();
  const { dataPermits } = UserStore();
  const { search: productSearch, searchProduct } = ProductStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add kardex", { _id_ompany: dataCompany?.id }],
    queryFn: () => addKardex({ _id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: dataSearchKardex } = useQuery({
    queryKey: ["search kardex", { _id_company: dataCompany.id, search: search }],
    queryFn: () => searchKardex({ _id_company: dataCompany.id, search: search }),
    enabled: dataCompany.id != null,
  });

  const { data: dataSearchProducts } = useQuery({
    queryKey: [
      "search product",
      { _id_company: dataCompany.id, description: productSearch },
    ],
    queryFn: () => searchProduct({ _id_company: dataCompany.id, search: productSearch }),
    enabled: dataCompany.id != null,
  });

  const statePermits = dataPermits.some((obj) => obj.modules.name.includes("Kardex"));

  if (statePermits === false) return <BlockPage state={statePermits} />;

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <KardexTemplate data={dataKardex} />;
};
