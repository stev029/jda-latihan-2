import React, { useEffect } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({ open, onClose, children, footer }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />
      <div
        className={`relative min-w-md bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 ${open
          ? "scale-100 opacity-100 translate-y-0"
          : "scale-95 opacity-0 translate-y-4"
          }`}
        role="dialog"
        aria-modal="true"
      >
        {children}
        {footer}
        <div className="mt-4 flex justify-end">
          <button
            className="absolute text-xl top-2 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;