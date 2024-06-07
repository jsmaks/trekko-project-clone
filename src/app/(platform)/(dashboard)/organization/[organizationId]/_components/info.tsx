'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';

interface InfoProps {
  isPro: boolean;
}

export const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Image
          fill
          src={organization?.imageUrl!}
          alt={'Organization'}
          className="rounded-md object-cover"
          loading="eager"
          sizes="auto"
        />
      </div>
      <div className="space-y-1">
        <div className="text-xl font-semibold">{organization?.name}</div>
        <div className="fle items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-3 w-3" />
          {isPro ? 'Pro' : 'Free'}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
