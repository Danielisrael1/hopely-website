import React, { useState, useRef, useId } from 'react';
import { AppwriteService } from '../services/appwrite';
import { resizeImage } from '../lib/resizeImage';

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  onImageRemoved?: () => void;
  className?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageUploaded,
  onImageRemoved,
  className = '',
  label = 'Image',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId(); // Generate unique ID for each instance

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Phone photos are often 5-15MB; they get shrunk before upload, so accept up to 20MB here
    if (file.size > 20 * 1024 * 1024) {
      setError('Image must be less than 20MB');
      return;
    }

    setError(null);
    setUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const resized = await resizeImage(file);
      if (resized.size > 5 * 1024 * 1024) {
        setError('Image is still over 5MB after resizing. Please choose a smaller image.');
        setPreview(null);
        return;
      }
      const url = await AppwriteService.uploadImage(resized);
      console.log('Image uploaded, URL received:', url);
      onImageUploaded(url);
      // Keep showing preview briefly, then it will show the actual image from currentImage
      setTimeout(() => setPreview(null), 500);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload image. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    if (onImageRemoved) {
      onImageRemoved();
    }
    setPreview(null);
  };

  const displayImage = preview || currentImage;

  // Input ID needs to be unique per component instance
  const inputId = `image-upload-${uniqueId}`;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="space-y-3">
        {/* Image Preview */}
        {displayImage && (
          <div className="relative inline-block">
            <img
              src={displayImage}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              onLoad={() => {
                setError(null); // Clear error when image loads successfully
              }}
              onError={() => {
                console.error('Image failed to load:', displayImage);
                // Only show error for Appwrite URLs, not for local previews
                if (!preview && currentImage && currentImage.includes('appwrite')) {
                  setError('Image failed to load. Check Appwrite bucket permissions.');
                }
              }}
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
            {!uploading && currentImage && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Upload Controls */}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors
              ${uploading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-hopely-pink text-white hover:bg-pink-600'
              }
            `}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {currentImage ? 'Change Image' : 'Upload Image'}
              </>
            )}
          </label>

          {currentImage && !uploading && (
            <span className="text-xs text-gray-500">or enter URL below</span>
          )}
        </div>

        {/* URL Input (fallback) */}
        <input
          type="text"
          value={currentImage || ''}
          onChange={(e) => onImageUploaded(e.target.value)}
          placeholder="Or paste image URL..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-hopely-pink focus:border-hopely-pink text-sm"
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
