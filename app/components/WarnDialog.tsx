import React, { useEffect } from "react";

type WarnDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function WarnDialog({
  open,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  onConfirm,
  onCancel,
}: WarnDialogProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
          }`}
        onClick={onCancel}
      />

      {/* Dialog */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto transform transition-all duration-300 ${open
          ? "scale-100 translate-y-0 opacity-100"
          : "scale-95 -translate-y-8 opacity-0"
          }`}
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}