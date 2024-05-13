import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logoipsum.svg" alt="logo" width={28} height={28} />
        <p className="text-white font-semibold text-2xl ml-2">Finance</p>
      </div>
    </Link>
  );
};
