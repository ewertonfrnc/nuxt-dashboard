import { useToast } from "primevue/usetoast";

export function usePVToast() {
  const toast = useToast();

  const messages = {
    success: {
      severity: "success",
      summary: "Sucesso!",
      detail: "Ação realizada com sucesso.",
    },
    error: {
      severity: "error",
      summary: "Ocorreu um erro!",
      detail: "Ocorreu um erro de processamento, tente novamente.",
    },
  };

  function getToast(severity: keyof typeof messages) {
    const message = messages[severity];
    if (message) {
      toast.add({ ...message, life: 4000 });
    }
  }

  return { getToast };
}
