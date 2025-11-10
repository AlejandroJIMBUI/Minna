import { useState } from 'react';
import { getFileType, validateFileSize, formatFileSize, getMaxSizeForType } from '../lib/supabase';

export const useFileValidation = () => {
  const [fileError, setFileError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const validateFile = (file) => {
    setFileError(null);
    setFileInfo(null);

    if (!file) {
      return { isValid: false, type: 'none' };
    }

    try {
      // Determinar tipo de archivo
      const fileType = getFileType(file.type);
      
      // Validar tamaño
      validateFileSize(file, fileType);
      
      // Establecer información del archivo
      setFileInfo({
        name: file.name,
        type: fileType,
        size: formatFileSize(file.size),
        maxSize: formatFileSize(getMaxSizeForType(fileType))
      });

      return { isValid: true, type: fileType };
    } catch (error) {
      setFileError(error.message);
      return { isValid: false, type: 'invalid' };
    }
  };

  const resetValidation = () => {
    setFileError(null);
    setFileInfo(null);
  };

  return {
    fileError,
    fileInfo,
    validateFile,
    resetValidation
  };
};