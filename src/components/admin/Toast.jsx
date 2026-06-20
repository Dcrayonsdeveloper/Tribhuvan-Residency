import { useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiX } from "react-icons/fi";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { bg: "bg-green-50 border-green-400", text: "text-green-800", icon: <FiCheckCircle className="text-green-500" size={20} /> },
    error: { bg: "bg-red-50 border-red-400", text: "text-red-800", icon: <FiXCircle className="text-red-500" size={20} /> },
    warning: { bg: "bg-yellow-50 border-yellow-400", text: "text-yellow-800", icon: <FiAlertCircle className="text-yellow-500" size={20} /> },
  };

  const { bg, text, icon } = config[type] || config.success;

  return (
    <div className="fixed top-5 right-5 z-[9999] animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3 border-l-4 rounded-lg shadow-lg ${bg} min-w-[280px] max-w-[400px]`}>
        {icon}
        <p className={`text-sm font-medium flex-1 ${text}`}>{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-2">
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
