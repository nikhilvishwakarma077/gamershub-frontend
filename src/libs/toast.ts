import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const baseStyle = {
  background: "#18181b",
  color: "#fff",
  borderRadius: "12px",
};

export const showSuccessToast = (
  message: string
) => {
  toast.success(message, {
    icon: <CheckCircle size={18} />,
    style: {
      ...baseStyle,
      border: "1px solid #22c55e",
    },
  });
};

export const showErrorToast = (
  message: string
) => {
  toast.error(message, {
    icon: <XCircle size={18} />,
    style: {
      ...baseStyle,
      border: "1px solid #ef4444",
    },
  });
};

export const showWarningToast = (
  message: string
) => {
  toast.warning(message, {
    icon: <AlertTriangle size={18} />,
    style: {
      ...baseStyle,
      border: "1px solid #f59e0b",
    },
  });
};

export const showInfoToast = (
  message: string
) => {
  toast.info(message, {
    icon: <Info size={18} />,
    style: {
      ...baseStyle,
      border: "1px solid #06b6d4",
    },
  });
};