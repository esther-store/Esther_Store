import {
  getContactInfo,
  editContactInfo,
} from "@/services/ManageContact/contactInfoManagement";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import type { ContactInfoIdType, ContactInfoType } from "@/Types";
import { showToast } from "@/utils/showToast";
import { validateContactInfo } from "@/utils/validateContactInfo";

export function useManageContactInfo({ toast }) {
  const { auth } = useContext<any>(AuthenticationContext);

  //get contact info to manage
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["contact-info-to-manage", auth?.token],
    queryFn: () => getContactInfo({ token: auth?.token }),
    staleTime: 1000 * 60 * 30,
    retry: (failuresCount) => {
      if (failuresCount >= 2) return false;
      return true;
    },
  });

  //edit contact info
  const {
    mutate: handleEditContactInfo,
    isPending: edittingContactInfo,
    isError: errorEdditingContactInfo,
  } = useMutation({
    mutationFn: ({
      id,
      info,
    }: {
      id: ContactInfoIdType;
      info: ContactInfoType;
    }) => {
      validateContactInfo(info)
      return editContactInfo({ id: id, info: info, token: auth?.token });
    },
    onError: (err) => {
      showToast({
        toastRef: toast,
        detail: err.message,
        severity: "error",
        summary: 'Error',
        life: 3000,
      });
    },
    onSuccess: () => {
      refetch();
      showToast({
        toastRef: toast,
        detail: "Operación Exitosa",
        severity: "success",
        summary: "Éxito",
        life: 3000,
      });
    },
  });

  const contactInfo: ContactInfoType = data || {};
  const loadingContactInfo = isLoading;
  const errorContactInfo = isError;

  return {
    contactInfo,
    loadingContactInfo,
    errorContactInfo,
    handleEditContactInfo,
    edittingContactInfo,
    refetch
  };
}
