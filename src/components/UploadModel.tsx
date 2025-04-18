"use client";
import { useEffect, useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (url: string) => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
}: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setError(null);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onUpload(data.url);
      onClose();
    } catch (err) {
      setError("Failed to upload file");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-60 flex justify-center items-center">
      <div className="bg-accent p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold">Pet Profile Image</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="file-upload"
            className="block w-full cursor-pointer rounded-md border border-dashed border-gray-400 p-4 text-center text-sm text-gray-600 hover:bg-gray-100"
          >
            {file ? file.name : "Click to choose a file"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Image Preview */}
          {file && (
            <div className="mt-4">
              <p className="text-sm mb-2 text-gray-600">Preview:</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto border"
              />
            </div>
          )}
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 ease-in-out"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
