import { ClerkProvider } from '@clerk/nextjs';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <ClerkProvider> {children}</ClerkProvider>
    </div>
  );
};

export default PlatformLayout;