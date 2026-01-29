import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { ComponentProps } from "react";

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
  const normalizeString = (string: string) => {
    return string.replace("-", " ");
  };

  const userStyle = style
    ? style
    : "px-2 py-1 bg-zinc-700 text-white rounded capitalize";

  const userPosition = position ? position : "bottom start";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className={userStyle}>{normalizeString(value)}</MenuButton>
      <MenuItems
        anchor={userPosition}
        className="absolute z-10 mt-2 w-32 bg-zinc-700 rounded shadow"
      >
        {options.map((opt) => (
          <MenuItem key={opt} as="div">
            <button
              type="button"
              className="w-full text-left px-3 py-1 hover:bg-zinc-600 rounded capitalize"
              onClick={() => onChange(opt)}
            >
              {normalizeString(opt)}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
