"use client"
import Image from "next/image"
import styles from "./banner.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user.token);
  

  return (
    <div
      className={styles.banner}
      onClick={() => {
        setIndex((index + 1) % covers.length);
      }}
    >
      <Image src={covers[index]} alt="cover" fill={true} objectFit="cover" />
      {session ? (
        <div className="z-20 absolute top-5 left-10 font-semibold text-white text-xl bg-black px-5 py-2 rounded-lg">
          Welcome back! {session.user?.name}
        </div>
      ) : null}
      <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium mix-blend-difference">
          Restaurant Reservation
        </h1>
        <h3 className="text-xl font-serif">
          Discover the culinary delights of our restaurant with a reservation,
          where every dish tells a story of flavor and tradition.
        </h3>
      </div>
      <button
        className="bg-white text-red-600
          border border-red-600 font-semibold py-2 px-2
          m-2 rounded z-30 shadow-md absolute bottom-0 right-0
          hover:bg-red-700 hover:text-white
          hover: border-transparent transition-colors duration-300"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/restaurant");
        }}
      >
        Choose your restaurant
      </button>
    </div>
  );
}
