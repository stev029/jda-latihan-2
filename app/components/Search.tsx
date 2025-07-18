import { Search as SearchIcon } from "@deemlol/next-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, type InputHTMLAttributes } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  asd?: string;
}

export default function Search(props: SearchProps) {
  const { placeholder, onChange, ...prop } = props;
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchHandler = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    const params = new URLSearchParams(searchParam);
    params.set('page', '1')
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    onChange?.(e)
  }, 300);

  return (
    <div className="flex items-center border rounded-md">
      <div className="relative">
        <input
          type="text"
          id="search"
          className="peer h-10 w-full px-2 pt-2.5 pb-0 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
          placeholder={props.placeholder}
          onChange={searchHandler}
          defaultValue={searchParam.get('query')?.toString()}
          {...prop}
        />
        <label
          htmlFor="search"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {props.placeholder}
        </label>
      </div>
      <div className="p-3">
        <SearchIcon />
      </div>
    </div>
  );
}