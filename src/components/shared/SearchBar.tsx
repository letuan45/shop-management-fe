import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    if (value.trim() === "") {
      const rest = Object.fromEntries(searchParams.entries());
      delete rest["search"];
      setSearchParams(rest);
    } else {
      const page = searchParams.get("page");
      if (page) {
        setSearchParams({ search: value, page });
      } else {
        setSearchParams({ search: value });
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <MagnifyingGlassIcon height={18} width={18} className="absolute left-2" />
      <Input
        placeholder="Tìm kiếm"
        className="pl-8"
        onChange={changeSearchHandler}
      />
    </div>
  );
};

export default SearchBar;
