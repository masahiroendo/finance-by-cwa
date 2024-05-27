import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type UploadButtonProps = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full md:w-auto" {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          Upload
        </Button>
      )}
    </CSVReader>
  );
};
