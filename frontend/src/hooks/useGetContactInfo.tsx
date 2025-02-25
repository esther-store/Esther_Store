import type { ContactInfoType } from "@/Types";
import { getContactInfo } from "../services/getContactInfo";
import { useQuery } from "@tanstack/react-query";

export function useGetContactInfo() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contact-info"],
    queryFn: () => getContactInfo(),
    staleTime: 1000 * 60 * 15
  });
  const contactInfo: ContactInfoType = data || [];

  return { contactInfo };
}
