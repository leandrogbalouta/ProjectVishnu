import React, { useState } from 'react';

interface Props {
  handleFormSubmit : (event: React.FormEvent<HTMLFormElement>, selectedFiles : File[]) => {}
}

function UploadForm({handleFormSubmit} : Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  return (
    <form onSubmit={ (event) => handleFormSubmit(event, selectedFiles)}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit" disabled={!selectedFiles.length}>
        Upload
      </button>
    </form>
  );
}

export default UploadForm;
