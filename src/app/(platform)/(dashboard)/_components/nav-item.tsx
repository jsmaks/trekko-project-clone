'use client';

import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: any;
  onExpand: (id: string) => void;
}
export const NavItem = ({ isActive, isExpanded, organization, onExpand }: NavItemProps) => {
  return (
    <div>
      <AccordionItem value={organization.id} className="border-none">
        <AccordionTrigger
          onClick={() => onExpand(organization.id)}
          className={cn(
            'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
            isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
          )}
        >
          <div className="flex items-center gap-x-2">
            <div className="relative h-7 w-7">
              <Image
                fill
                src={organization.imageUrl}
                alt={'Organization'}
                className="rounded-sm object-cover"
              />
            </div>
            <span className="text-sm font-medium">{organization.name}</span>
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </div>
  );
};
