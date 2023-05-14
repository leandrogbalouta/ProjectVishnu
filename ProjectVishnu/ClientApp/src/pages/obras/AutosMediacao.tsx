import { useParams } from "react-router-dom";
import { uploadFilesToObra } from "../../common/API/APICalls";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { FcFile } from "react-icons/fc";
import { AiOutlineCloudUpload } from "react-icons/ai";
import uniqid from "uniqid";
import { Button, Tooltip } from "@chakra-ui/react";
import { IoMdCloseCircle } from "react-icons/io";
export function AutosMediacao() {
  const { codigo } = useParams();
  const [files, setFiles] = useState<File[]>([]);
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
          let newArr = files!.filter(f => file != f);
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

  return (
    <div className="flex flex-col h-full w-full gap-1">
      <div className="data-panel flex-1">Placeholder</div>
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
      <Button
        colorScheme="blue"
        onClick={() => handleFormSubmit(files!)}
        isDisabled={files.length <= 0}
      >
        Upload
      </Button>
    </div>
  );
}
