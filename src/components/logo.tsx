import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 transition hover:opacity-75">
        <Image src="/logo.svg" alt="Taskify Logo" width={30} height={30} />
        <p className=" font-colsans text-lg text-neutral-700">Taskify</p>
      </div>
    </Link>
  );
};
