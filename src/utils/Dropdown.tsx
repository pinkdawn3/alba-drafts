import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { ComponentProps } from "react";
import { useTranslate } from "../hooks/useTranslations";

// Extract AnchorProps from Menu component
type AnchorProps = ComponentProps<typeof MenuItems>["anchor"];
interface DropdownProps<T extends string> {
  value: T;
  options: T[];
  onChange: (newValue: T) => void;
  style?: string;
  position?: AnchorProps;
}

export const Dropdown = <T extends string>({
  value,
  options,
  onChange,
  style,
  position,
}: DropdownProps<T>) => {
  const userStyle = style
    ? style
    : "px-2 py-1 bg-header text-font rounded capitalize";

  const userPosition = position ? position : "bottom start";

  const t = useTranslate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className={userStyle}>{t(value)}</MenuButton>
      <MenuItems
        anchor={userPosition}
        className="absolute z-10 mt-2 w-32 bg-header rounded shadow"
      >
        {options.map((option) => (
          <MenuItem key={option} as="div">
            <button
              type="button"
              className="w-full text-left px-3 py-1 dark:hover:bg-zinc-600 hover:bg-zinc-300 rounded capitalize"
              onClick={() => onChange(option)}
            >
              {t(option)}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
