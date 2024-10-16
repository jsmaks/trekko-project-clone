'use client';

import { toast } from 'sonner';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = async () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success(`Copied: login/pass`);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
    >
      Copy for test
    </button>
  );
};

export default CopyButton;
