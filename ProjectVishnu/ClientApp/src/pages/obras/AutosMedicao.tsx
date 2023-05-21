import { useParams } from "react-router-dom";
import {
  downloadAutoMedicao,
  getAutosMedicao,
  uploadFilesToObra,
} from "../../common/API/APICalls";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { FcFile } from "react-icons/fc";
import { AiOutlineCloudUpload } from "react-icons/ai";
import uniqid from "uniqid";
import { Button, Tooltip } from "@chakra-ui/react";
import { IoMdCloseCircle } from "react-icons/io";
import BackButton from "../../components/BackButton";
import { MdDownloadForOffline } from "react-icons/md";

export function AutosMedicao() {
  const [autos, setAutos] = useState<string[]>([]);
  const { codigo } = useParams();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const populateAutos = async () => {
      const response = await getAutosMedicao(codigo!);
      setAutos(response.data);
    };
    populateAutos();
  }, []);

  // File input
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    noDragEventsBubbling: true,
    onDrop,
  });
  const File = ({ file }: { file: File }) => (
    <div className="flex flex-col relative group" key={uniqid()}>
      <IoMdCloseCircle
        className="hidden group-hover:block text-lg text-slate-700 dark:!text-slate-200 absolute -top-1 -right-1"
        onClick={(e) => {
          e.stopPropagation();
          let newArr = files!.filter((f) => file != f);
          setFiles(newArr);
        }}
      />
      <div
        id="file-container-inner-content"
        className="flex flex-col items-center p-3 ring-1 rounded w-32 truncate "
      >
        <FcFile className="text-5xl" />
        <Tooltip label={file!.name}>
          <p className="text-center truncate w-full">{file!.name}</p>
        </Tooltip>
      </div>
    </div>
  );
  const handleFormSubmit = async (selectedFiles: File[]) => {
    await uploadFilesToObra(codigo!!, selectedFiles);
  };
 async function downloadFile(fileName: string) {
   const data = await (await downloadAutoMedicao(codigo!, fileName)).data
   // Create a temporary URL for the file blob
   const url = window.URL.createObjectURL(new Blob([data]));
   // Create a link element to trigger the download
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', fileName);
   document.body.appendChild(link);
   link.click();

   // Clean up the temporary URL
   window.URL.revokeObjectURL(url);
  }
  // TODO DRY FIle and this
  const AutosFileBlob = ({ title }: { title: string }) => (
    <div
      className="flex flex-col relative group h-fit w-fit select-none"
      key={uniqid()}
    >
      <MdDownloadForOffline
        className="hidden group-hover:block hover:cursor-pointer text-6xl !text-slate-800 dark:!text-slate-800 absolute m-auto top-0 right-0 bottom-0 left-0"
        onClick={async () => downloadFile(title)}
      />
      <div className="flex flex-col items-center p-3 ring-1 rounded w-32 truncate ">
        <FcFile className="text-5xl" />
        <Tooltip label={title}>
          <p className="text-center truncate w-full">{title}</p>
        </Tooltip>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col h-full w-full gap-1">
      <div className="data-panel flex-1 flex flex-wrap gap-3 p-1 w-full overflow-auto">
        <>
          {autos ? (
            autos.map((file) => <AutosFileBlob key={uniqid()} title={file} />)
          ) : (
            <>Sem dados</>
          )}
        </>
      </div>
      <div
        {...getRootProps({
          className:
            "dropzone flex w-full flex flex-col h-52 px-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-3",
        })}
      >
        {files.length === 0 ? (
          <div className="flex flex-col items-center m-auto overflow-auto max-w-full">
            <AiOutlineCloudUpload className="text-5xl mb-3 !text-gray-500" />
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">Click to upload </span>
              <span>or drag and drop</span>
            </p>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...getInputProps({
                onChange: (e: any) => e.target.files[0],
              })}
            />
          </div>
        ) : (
          <div
            id="files-container"
            className="flex flex-wrap gap-3 p-1 w-full overflow-auto"
          >
            {files.map((file) => (
              <File file={file} key={uniqid()} />
            ))}
          </div>
        )}
      </div>
      <div className="div flex justify-end gap-3 mt-3">
        <Button
          colorScheme="blue"
          onClick={() => handleFormSubmit(files!)}
          isDisabled={files.length <= 0}
        >
          Upload
        </Button>
        <BackButton
          href={location.pathname.substring(
            0,
            location.pathname.lastIndexOf("/")
          )}
        />
      </div>
    </div>
  );
}
