import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  fetchFuncionario,
  fetchObrasForFuncionario,
} from "../../common/APICalls";
import IFuncionarioOutput from "../../common/Interfaces/Funcionario/IFuncionarioOutput";
import AdicionarObraAFuncionarioModal from "../../components/modals/AdicionarObraAFuncionarioModal";
import ObrasTable from "../../components/tables/ObrasTable";
import IObraOutput from "../../common/Interfaces/Obra/IObraOutput";
import { useParams, useNavigate } from "react-router-dom";
import RemoverFuncionarioDeObraModal from "../../components/modals/RemoverFuncionarioDeObraModal";
import { AiOutlineArrowLeft } from "react-icons/ai";
import BackButton from "../../components/BackButton";

export default function Funcionario() {
  const [funcionario, setFuncionario] = useState(undefined);
  const { id } = useParams();
  const [obras, setObras] = useState<IObraOutput[]>([]);
  const obrasEmCurso = obras.filter((obra) => obra.estado == "em-curso");
  const obrasCompletadas = obras.filter((obra) => obra.estado == "completada");
  const navigate = useNavigate();
  let contents =
    funcionario === undefined ? <Spinner /> : renderFuncionario(funcionario);

  useEffect(() => {
    const populateFuncionarioData = async () => {
      const response = await fetchFuncionario(id!);
      if (response.status == 200) {
        const data = await response.json();
        setFuncionario(data);
      } else if (response.status == 204) {
        setFuncionario(undefined);
      } else {
      }
    };
    const populateObrasData = async () => {
      const response = await fetchObrasForFuncionario(id!);
      if (response.status == 200) {
        const data = await response.json();
        setObras(data);
      } else if (response.status == 204) {
      } else {
      }
    };

    populateFuncionarioData();
    populateObrasData();
  }, [id]);

  // TODO dry me
  async function redirectToObra(codigoInterno: string) {
    navigate(`/obras/${codigoInterno}`);
  }
  function renderFuncionario(funcionario: IFuncionarioOutput) {
    return (
      <>
        {!funcionario && <p>Não foi possível encontrar o funcionario</p>}
        {funcionario && (
          <div className="h-full w-full flex flex-col">
            <div className="flex flex-col sm:flex-row h-full w-full gap-1 sm:gap-3">
              <div
                id="detalhes-de-funcionario-container"
                className="flex-1 p-3 bg-slate-800 text-cyan-100 rounded-xl flex flex-col overflow-auto relative"
              >
                <div className="flex justify-between ">
                  <p className="text-xl font-bold mb-3">
                    Detalhes do Funcionário:
                  </p>
                  {/* TODO dr */}
                  <BackButton href="/funcionarios" />
                </div>
                <div className="flex  flex-col gap-3 overflow-auto">
                  <div>
                    <p className="obra-heading">ID</p>
                    <p>{funcionario.id}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Nome</p>
                    <p>{funcionario.nome}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Data de Nascimento</p>
                    <p>{funcionario.dtnascimento}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Telemóvel</p>
                    <p>{funcionario.telemovel}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Contato de Emergência</p>
                    <p>{funcionario.contactoemergencia}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Nacionalidade</p>
                    <p>{funcionario.nacionalidade}</p>
                  </div>
                  <div>
                    <p className="obra-heading capitalize">Mercado</p>
                    <p className="capitalize">{funcionario.mercado}</p>
                  </div>
                  <div>
                    <p className="obra-heading">
                      Tipo de Documento de Identificação
                    </p>
                    <p>{funcionario.tipodocident}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Documento de Identificação</p>
                    <p>{funcionario.docident}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Passaporte</p>
                    <p>{funcionario.passaporte}</p>
                  </div>
                  <div>
                    <p className="obra-heading">
                      Validade do Documento de Identificação
                    </p>
                    <p>{funcionario.validadedocident}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Categoria Profissional</p>
                    <p>{funcionario.catprof}</p>
                  </div>
                  <div>
                    <p className="obra-heading">NIF</p>
                    <p>{funcionario.nif}</p>
                  </div>
                  <div>
                    <p className="obra-heading">NISS</p>
                    <p>{funcionario.niss}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Morada</p>
                    <p>{funcionario.morada}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Contrato Início</p>
                    <p>{funcionario.contratoinicio}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Contrato Fim</p>
                    <p>{funcionario.contratofim}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Vencimento Base</p>
                    <p>{funcionario.vencimentobase}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Tipo de Salário</p>
                    <p>{funcionario.tiposalario}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Tipo de salário</p>
                    <p>{funcionario.tiposalario}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Salário base</p>
                    <p>{funcionario.vencimentobase}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Salário real</p>
                    <p>{funcionario.salarioreal}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Tamanho do calçado</p>
                    <p>{funcionario.calcado}</p>
                  </div>
                  <div>
                    <p className="obra-heading">Carta de condução</p>
                    <p>{funcionario.cartaconducao ? "Sim" : "Não"}</p>
                  </div>
                  <div>
                    <p className="obra-heading">IBAN</p>
                    <p>{funcionario.iban}</p>
                  </div>
                </div>
              </div>
              <div
                id="obras-de-funcionario-container"
                className="flex-1 p-3 bg-slate-800 rounded-xl flex flex-col overflow-auto gap-3"
              >
                <div id="top-items-container" className="flex justify-between">
                  <p className="text-lg font-bold text-cyan-100">
                    Obra em curso:
                  </p>
                  <RemoverFuncionarioDeObraModal funcionario={funcionario} />
                </div>

                <div className="flex flex-col gap-3 overflow-auto bg-white dark:bg-slate-800 rounded">
                  <ObrasTable
                    obras={obrasEmCurso}
                    dataOnRowClick={redirectToObra}
                  />
                </div>
                <div
                  id="top-obras-completadas-container-items-container"
                  className="flex justify-between"
                >
                  <p className="text-lg font-bold text-cyan-100">
                    Obras Completadas:
                  </p>
                  <AdicionarObraAFuncionarioModal funcionario={funcionario} />
                </div>
                <div className="flex flex-1 flex-col gap-3 overflow-auto bg-white dark:bg-slate-800 rounded">
                  <ObrasTable
                    obras={obrasCompletadas}
                    dataOnRowClick={redirectToObra}
                  />
                </div>
                <div
                  id="add-funcionario-button-container"
                  className="flex justify-end"
                ></div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <div className="h-full w-full">{contents}</div>;
}
