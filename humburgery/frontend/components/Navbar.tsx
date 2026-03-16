import Link from "next/link";
import { Routes } from "../conf";


export default function Navbar() {
  return ( // ccs moduls better and use buttons
    <nav className="flex gap-10 h-10 fixed w-full z-20 top-0 inset-s-0 bg-green-500">
      <Link className="bg-green-700 text-white hover:bg-green-800" href={Routes.HOME}>התפריט השבועי</Link>
      <Link className="text-white hover:bg-green-500" href={Routes.STATISTICS}>הצביעו והשפיעו</Link>
    </nav>
  );
}