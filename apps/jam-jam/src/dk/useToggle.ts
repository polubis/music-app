import { useMemo, useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return useMemo(
    () =>
      [
        isOpen,
        {
          open: () => {
            setIsOpen(true);
          },
          close: () => {
            setIsOpen(false);
          },
          toggle: () => {
            setIsOpen((prevIsOpen) => !prevIsOpen);
          },
        },
      ] as const,
    [isOpen]
  );
};
