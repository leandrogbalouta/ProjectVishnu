import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown, BsSearch } from "react-icons/bs";

// TODO check parameters
interface Params {
  setMercado: any;
  setSearchString: any;
  searchBar: any;
}
export default function FilterBar({
  setMercado,
  setSearchString,
  searchBar = null,
}: Params) {
  const [mercados, setMercados] = useState<string[]>([]);
  const [dropdownText, setDropdownText] = useState("Mercados");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  function onClickSearch() {
    setSearchString(searchInputValue);
  }

  function onClickDropDownItem(mercado: string | undefined) {
    if (mercado) {
      setDropdownText(mercado);
    } else {
      setDropdownText("Mercados");
    }
    setMercado(mercado);
  }

  useEffect(() => {
    const getMercadosData = async () => {
      const response = await fetch("/api/mercados");
      const data = await response.json();
      setMercados(data);
    };

    getMercadosData();
  }, []);

  function useSearchBar() {
    if (searchBar != null) {
      return (
        <form className="flex w-full" role="search">
          <Input
            className=""
            id="searchBar"
            type="search"
            placeholder="Procurar"
            aria-label="Procurar"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <IconButton
            aria-label='Procurar'
            colorScheme="teal"
            type="button"
            icon={<BsSearch />}
            onClick={() => onClickSearch()}
          />
        </form>
      );
    }
  }

  return (
    <div className="w-full flex justify-between">
      <div className="flex-1 ">
        {mercados && (
          <Menu>
            <MenuButton
              className="capitalize"
              as={Button}
              rightIcon={<BsChevronDown />}
            >
              {dropdownText}
            </MenuButton>
            <MenuList>
              {dropdownText != "Mercados" && (
                <MenuItem
                  className="capitalize"
                  onClick={() => onClickDropDownItem(undefined)}
                >
                  Todos
                </MenuItem>
              )}
              {mercados.map((mercado: string) => (
                <MenuItem
                  className="capitalize"
                  key={mercado}
                  onClick={() => onClickDropDownItem(mercado)}
                >
                  {mercado}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </div>
      {useSearchBar()}
    </div>
  );
}
