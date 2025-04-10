
import { useState } from 'react';

export interface UseImageUploadProps {
  initialImage?: string;
  maxSizeInMB?: number;
  acceptedTypes?: string[];
}

export function useImageUpload({ 
  initialImage = '', 
  maxSizeInMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}: UseImageUploadProps = {}) {
  const [imageUrl, setImageUrl] = useState<string>(initialImage);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.map(type => type.replace('image/', '')).join(', ')}`);
      return;
    }
    
    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File size exceeds ${maxSizeInMB}MB limit.`);
      return;
    }
    
    setIsLoading(true);
    
    // Create URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    setImageUrl('');
    setError(null);
  };
  
  return {
    imageUrl,
    error,
    isLoading,
    handleImageUpload,
    clearImage,
    inputProps: {
      type: 'file',
      accept: acceptedTypes.join(','),
      onChange: handleImageUpload
    }
  };
}
