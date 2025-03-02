// src/hooks/use-toast.js
export const useToast = () => {
    const toast = (message) => alert(message);
    return { toast };
  };
  