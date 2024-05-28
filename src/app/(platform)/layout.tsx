import ModalProviders from '@/components/providers/modal-providers';
import { Toaster } from 'sonner';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Toaster />
      <ModalProviders/>
      {children}
    </div>
  );
};

export default PlatformLayout;
