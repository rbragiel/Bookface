import { useState, useRef } from "react";

function useImageInput() {
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const clickInput = () => {
    inputRef.current?.click();
  };

  return { image, inputRef, onChange, clickInput };
}

export { useImageInput };
