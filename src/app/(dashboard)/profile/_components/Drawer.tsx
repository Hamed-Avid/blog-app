"use client";
import { createPortal } from "react-dom";

type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  return (
    isOpen &&
    createPortal(
      <>
        <div
          className={`fixed inset-0 h-screen w-full bg-slate-800 bg-opacity-30 backdrop-blur-sm ${isOpen ? "block" : "pointer-events-none hidden"}`}
          onClick={onClose}
        ></div>
        <div
          className={`fixed right-0 top-0 h-full w-64 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="max-h-full overflow-y-auto bg-secondary-0">
            {children}
          </div>
        </div>
      </>,
      document.body,
    )
  );
}
