import { useQuery } from "@tanstack/react-query";
import { CompanyStore, HomeTemplate } from "../index.js";

export const HomePage = () => {
  const { userCounter, dataCompany } = CompanyStore();

  const { data } = useQuery({
    queryKey: ["Counter users company", { idCompany: dataCompany?.id }],
    queryFn: () => {
      return userCounter({ id_company: dataCompany?.id });
    },
    enabled: !!dataCompany?.id,
  });

  return <HomeTemplate />;
};
