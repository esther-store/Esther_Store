import { getContactInfo } from "../services/getContactInfo";
import { useQuery } from "@tanstack/react-query";

export function useGetContactInfo() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contact-info"],
    queryFn: () => getContactInfo(),
    staleTime: 1000 * 60 * 30
  });
  const contactInfo = data || [];

  return { contactInfo };
}
