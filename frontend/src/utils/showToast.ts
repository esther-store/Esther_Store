export const showToast = ({
    toastRef,
    severity = "success",
    summary = "Éxito",
    detail = "Operación Exitosa",
    life = 3000,
  }:{
    toastRef:any,
    severity: "success" | "error",
    summary: string,
    detail: string,
    life: 3000 | 5000
  }) => {
    toastRef.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };