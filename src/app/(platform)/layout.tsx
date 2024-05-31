import { Toaster } from 'sonner';
import ModalProviders from '@/components/providers/modal-providers';
import { QueryProvider } from '@/components/providers/query-provider';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <QueryProvider>
        <Toaster />
        <ModalProviders />
        {children}
      </QueryProvider>
    </div>
  );
};

export default PlatformLayout;
