'use client'
import Image from "next/image"
import styles from "./topmenu.module.css"
import TopMenuItem from "./TopMenuItem"
import Link from "next/link"
import { ElfsightWidget } from "next-elfsight-widget"
import { useSession } from "next-auth/react"

export default function TopMenu() {
  const { data: session, status } = useSession();

  // console.log(session)
  
  return (
    <div className={styles.menucontainer}>
      <Link href="/">
        <Image
          src={"/img/logo.png"}
          alt="logo"
          className={styles.logoimg}
          width={0}
          height={0}
          sizes="100vh"
        />
      </Link>
      <TopMenuItem title="Restaurant" pageRef="/restaurant" />
      <TopMenuItem title="Reservation" pageRef="/reservation" />
      <ElfsightWidget widgetId="a9b0e464-6b63-418f-89df-4532a3bf7efc"/>
      <div className="flex flex-row absolute right-0 h-full">
        <TopMenuItem title="My Reservation" pageRef="/myreservation" />
        {session?.user.role == "admin" ? (
          <TopMenuItem title="Add new restaurant" pageRef="/addrestaurant" />
        ) : null}
        {session ? (
          <Link href="/api/auth/signout">
            <div className="flex items-center h-full px-2 text-cyan-600 text—sm font-bold">
              Sign-Out of {session.user?.name}
            </div>
          </Link>
        ) : (
          <>
            <Link href="/auth/login">
              <div className="flex items-center h-full px-2 text-red-600 text—sm font-bold">
                Login
              </div>
            </Link>
            <Link href="/auth/register">
              <div className="flex items-center h-full px-2 text-red-600 text—sm font-bold">
                Register
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
