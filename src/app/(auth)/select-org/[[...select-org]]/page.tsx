'use client';

import { OrganizationList } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateOrganizationPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  return (
    <div className="flex h-full items-center justify-center">
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl={'/organization/:id'}
        afterCreateOrganizationUrl={'/organization/:id'}
      />
    </div>
  );
}
