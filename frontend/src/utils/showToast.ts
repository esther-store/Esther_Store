export const showToast = ({
    toastRef,
    severity,
    summary,
    detail,
    life = 3000,
  }:{
    toastRef:any,
    severity: "success" | "error",
    summary: string,
    detail: string,
    life?: 800 | 1000 | 3000 | 5000
  }) => {
    toastRef.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  export const otherActiveActionError = (toast) =>
    showToast({
      toastRef: toast,
      summary: "Error",
      detail: "Ya hay una acción en proceso",
      severity: "error",
      life: 1000,
    });