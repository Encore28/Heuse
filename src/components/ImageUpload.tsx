import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  preview?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, preview }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
        hover:border-blue-500 transition-colors duration-200`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive ? "Déposez l'image ici" : "Glissez-déposez une image ou cliquez pour sélectionner"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;