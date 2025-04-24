import { useQuery } from "@tanstack/react-query";
import {
  BlockPage,
  CompanyStore,
  ErrorPage,
  KardexStore,
  ReportTemplate,
  UserStore,
} from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const ReportPage = () => {
  const { addKardex } = KardexStore();
  const { dataCompany } = CompanyStore();
  const { dataPermits } = UserStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add kardex", { _id_ompany: dataCompany?.id }],
    queryFn: () => addKardex({ _id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const statePermits = dataPermits.some((obj) =>
    obj.modules.name.includes("Brand products")
  );

  if (statePermits === false) return <BlockPage state={statePermits} />;

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <ReportTemplate />;
};
