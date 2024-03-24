import Image from "next/image"
import styles from "./topmenu.module.css"
import TopMenuItem from "./TopMenuItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function TopMenu() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className={styles.menucontainer}>
        <Link href="/">
          <Image src={"/img/logo.png"} alt="logo" className={styles.logoimg} width={0} height={0} sizes="100vh"/>
        </Link>
        <TopMenuItem title="Booking" pageRef="/booking"/>
        <div className="flex flex-row-reverse absolute left-0 h-full">
          <TopMenuItem title="My Booking" pageRef="/mybooking"/>
          {
            session ? <Link href="/api/auth/signout">
              <div className="flex items-center h-full px-2 text-cyan-600 text—sm">
              Sign-Out of {session.user?.name}</div></Link>
            : <Link href="/api/auth/signin">
              <div className="flex items-center h-full px-2 text-cyan-600 text—sm">
              Sign-In</div></Link>
          }
        </div>
    </div>
  )
}
