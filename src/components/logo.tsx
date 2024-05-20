import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  const { userId, orgId } = auth();

  //Заглушка надо будет убрать

  let pathname;
  if (userId && orgId) {
    pathname = `/organization/${orgId}`;
  } else {
    pathname = '/';
  }
  return (
    <Link href={pathname}>
      <div className="flex items-center gap-x-2 transition hover:opacity-75">
        <Image
          sizes="auto"
          src="/logo.svg"
          alt="Taskify Logo"
          width={30}
          height={30}
          loading="eager"
        />
        <p className="font-colsans text-lg font-semibold text-neutral-700">
          Taskify
        </p>
      </div>
    </Link>
  );
};
