import { useParams } from "react-router-dom";
import { uploadFilesToObra } from "../../common/API/APICalls";
import UploadForm from "../../components/UploadForm";

export function AutosMediacao() {
  const { codigo } = useParams();
  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    selectedFiles: File[]
  ) => {
    event.preventDefault();
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    await uploadFilesToObra(codigo!!, formData);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <UploadForm handleFormSubmit={handleFormSubmit} />
      <div className="data-panel"></div>
    </div>
  );
}
