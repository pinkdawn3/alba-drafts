import { Trans } from "@lingui/react/macro";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

function SearchBar({ value, onChange, placeholder, onSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(); // Call onSubmit if it exists
  };

  return (
    <form className="max-w-md mx-auto px-4 sm:px-0" onSubmit={handleSubmit}>
      <label
        htmlFor="search"
        className="block mb-2.5 text-sm font-medium text-heading sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body rounded-xl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Search..."}
          required
        />
        <button
          type="submit"
          className="absolute end-1.5 bottom-2 text-white bg-primary hover:bg-primaryHover box-border border border-transparent focus:ring-2 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-xs px-2 py-1 focus:outline-none"
        >
          <Trans>Search</Trans>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
