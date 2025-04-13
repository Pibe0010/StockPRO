import { useQuery } from "@tanstack/react-query";
import { CompanyStore, ErrorPage, UserStore, UserTemplate } from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const UserPage = () => {
  const { dataCompany } = CompanyStore();
  const { addModule, dataUser, addAllUser, searchUser, search } = UserStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add user", { _id_company: dataCompany?.id }],
    queryFn: () => addAllUser({ _id_company: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  const { data: dataSearch } = useQuery({
    queryKey: ["search user", { _id_company: dataCompany.id, search: search }],
    queryFn: () => searchUser({ _id_company: dataCompany.id, search: search }),
    enabled: dataCompany.id != null,
  });

  const { data: moduleData } = useQuery({
    queryKey: ["add module"],
    queryFn: addModule,
  });

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  return <UserTemplate data={dataUser} />;
};
