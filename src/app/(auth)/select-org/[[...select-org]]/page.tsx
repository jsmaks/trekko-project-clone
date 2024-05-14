

import { OrganizationList } from '@clerk/nextjs';


export default function CreateOrganizationPage() {

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
