import Image from "next/image"
import styles from "./topmenu.module.css"
import TopMenuItem from "./TopMenuItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function TopMenu() {
  const session = await getServerSession(authOptions)
  console.log(session)
  
  return (
    <div className={styles.menucontainer}>
        <Link href="/">
          <Image src={"/img/logo.png"} alt="logo" className={styles.logoimg} width={0} height={0} sizes="100vh"/>
        </Link>
        <TopMenuItem title="Restaurant" pageRef="/restaurant"/>
        <TopMenuItem title="Reservation" pageRef="/reservation"/>
        <div className="flex flex-row absolute right-0 h-full">
          <TopMenuItem title="My Reservation" pageRef="/myreservation"/>
          {
                (session?.user.role == "admin")
                ? <TopMenuItem title="Add new restaurant" pageRef="/error"/>
                : null
          }
          {
            session ? <Link href="/api/auth/signout">
              <div className="flex items-center h-full px-2 text-cyan-600 text—sm font-bold">
              Sign-Out of {session.user?.name}</div></Link>
            : (<>
              <Link href="/auth/login">
                <div className="flex items-center h-full px-2 text-cyan-600 text—sm font-bold">
                Login</div></Link>
              <Link href="/auth/register">
                <div className="flex items-center h-full px-2 text-cyan-600 text—sm font-bold">
                Register</div></Link>
              </>
              )
          }
        </div>
    </div>
  )
}
