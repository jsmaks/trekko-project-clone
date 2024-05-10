import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="items-center gap-x-2 transition hover:opacity-75 flex">
        <Image src="/logo.svg" alt="Taskify Logo" width={30} height={30} />
        <p className=" font-colsans text-lg text-neutral-700">Taskify</p>
      </div>
    </Link>
  );
};
