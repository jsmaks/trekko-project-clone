import { Loader2 } from 'lucide-react';
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import CopyButton from '@/components/copy-button';
import { Toaster } from 'sonner';

export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <Toaster />
      <div className="h-full flex-col items-center justify-center px-4 lg:flex">
        <div className="space-y-4 pt-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Wellcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log ing or create an account to get started
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <ClerkLoaded>
            {' '}
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
        <div className="mx-auto mt-10 w-max">
          <CopyButton textToCopy={'test@gmail.com' as any} />
        </div>
      </div>
      <div className="hidden h-full items-center justify-center bg-blue-600 lg:flex"></div>
    </div>
  );
}
