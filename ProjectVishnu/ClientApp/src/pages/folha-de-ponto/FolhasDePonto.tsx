import { useEffect, useState } from "react";
import { fetchFolhaDePontoAllByMercado } from "../../common/API/APICalls";
import FilterBar from "../../components/FilterBar";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import FolhasDePontoTable from "../../components/tables/FolhasDePontoTable";

export default function FolhasDePonto() {
  const [folhasDePonto, setFolhasDePonto] = useState();
  const [mercado, setMercado] = useState("portugal");
  const navigate = useNavigate();

  let contents = !folhasDePonto ? (
    <Spinner size="xl" className="m-auto" />
  ) : (
    <FolhasDePontoTable folhasDePonto={folhasDePonto} mercado={mercado} />
  );

  useEffect(() => {
    const populateFolhasDePontoData = async () => {
      const response = await fetchFolhaDePontoAllByMercado(mercado!);
      setFolhasDePonto(response.data);
    };
    populateFolhasDePontoData();
  }, [mercado]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <h1 className="text-center text-4xl mb-5">Folhas De Ponto</h1>
      <FilterBar
        searchBar
        setMercado={setMercado}
        setSearchString={undefined}
      />
      {contents}
    </div>
  );
}
