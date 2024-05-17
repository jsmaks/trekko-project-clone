import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { FormPopover } from '@/components/form/form-popover';

import { Plus } from 'lucide-react';
import { MobileSideBar } from './mobile-sidebar';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <MobileSideBar />
      <div className="flex items-center gap-x-4">
        <div className="md:flex">
          <Logo />
        </div>
        <FormPopover side="bottom" align="start" sideOffset={18}>
          <Button
            size="sm"
            className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
            variant={'primary'}
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            className="block h-auto rounded-sm px-2 py-1.5 md:hidden"
            variant={'primary'}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={'/organization/:id'}
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl={'/organization/:id'}
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              rootBox: {
                height: '30px',
                width: '30px',
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
export default Navbar;
