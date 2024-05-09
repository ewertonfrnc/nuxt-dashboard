import { useToast } from "primevue/usetoast";

export function usePVToast() {
  const toast = useToast();

  function getToast(
    severity: "error" | "info" | "success" | "warn",
    summary: string,
    detail: string,
  ) {
    toast.add({ severity, summary, detail, life: 4000 });
  }

  return { getToast };
}
