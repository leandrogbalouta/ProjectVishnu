import { Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Admin() {
  const navigate = useNavigate();
  const Option = ({
    title,
    onClick,
    icon,
  }: {
    title: string;
    onClick: () => any;
    icon: JSX.Element;
  }) => (
    <div
      className="flex flex-col flex-1 bg-gradient-to-br from-slate-500
                   to-slate-900 text-white text-2xl text-center rounded-xl
                    cursor-pointer select-none hover:scale-105 transition-all p-20 dark:ring-1 dark:ring-white"
      onClick={onClick}
    >
      <div className="flex justify-center mb-3 dark:[&>*]:!text-white">
        {icon}
      </div>
      {title}
    </div>
  );
  return (
    <div className="flex gap-3 flex-col sm:flex-row px-5">
      <div className="flex flex-row flex-1 flex-wrap gap-10 sm:gap-20 justify-between mt-10 ">
        <Option
          title={"Criar Utilizador"}
          onClick={() => navigate("/admin/criar-utilizador")}
          icon={<FaUser />}
        />
        <Option title={"Criar Mercado"} onClick={() => {}} icon={<FaUser />} />
        <Option
          title={"Criar Categoria Profissional"}
          onClick={() => {}}
          icon={<FaUser />}
        />
        <Outlet />
      </div>
    </div>
  );
}
