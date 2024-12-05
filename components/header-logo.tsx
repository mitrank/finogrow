import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center">
        <Image src="./logo.svg" alt="Logo" height={28} width={28} />
        <p className="font-semibold text-white text-2xl ml-2.5">FinoGrow</p>
      </div>
    </Link>
  );
};
