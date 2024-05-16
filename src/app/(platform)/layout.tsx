import { Toaster } from 'sonner';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Toaster />
      {children}
    </div>
  );
};

export default PlatformLayout;
