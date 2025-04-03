import { useQuery } from "@tanstack/react-query";
import { CompanyStore, HomeTemplate } from "../index.js";

export const HomePage = () => {
  const { userCounter, dataCompany } = CompanyStore();

  const { data } = useQuery({
    queryKey: ["Counter users company", { idCompany: dataCompany.company?.id }],
    queryFn: () => {
      return userCounter({ id_company: dataCompany.company?.id });
    },
    enabled: !!dataCompany.company?.id,
  });

  return <HomeTemplate />;
};
