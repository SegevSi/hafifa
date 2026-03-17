"use client"

import { Routes } from "../conf";
import styles from "../styles/Navbar.module.css";
import { usePathname, useRouter } from 'next/navigation';


export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    
    return ( 
        <nav className={styles.navbar}>
            <button 
                className={Routes.HOME === pathname ? styles.selectedButton : ""}
                onClick={() => router.push(Routes.HOME)}
            >
                התפריט השבועי
            </button>
            <button 
                className={Routes.STATISTICS === pathname ? styles.selectedButton : ""}
                onClick={() => router.push(Routes.STATISTICS)}
            >   
                הצביעו והשפיעו
            </button>
        </nav>
  );
}