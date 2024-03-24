import Image from "next/image"
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { useState } from "react";

export default function Card( { restaurantName, imgSrc, onCompare }:
  { restaurantName: string, imgSrc: string, onCompare?: Function } ) {
  
  return (
    <InteractiveCard contentName={restaurantName} onCompare={onCompare}>
        <div className="w-full h-[70%] relative rounded-t-lg">
            <Image src={imgSrc}
                alt="Product Picture"
                fill={true}
                objectFit="cover"
                className="object-cover rounded-t-lg"
            />
        </div>
        <div className="w-full h-[15%] p-[10px]">{restaurantName}</div>
    </InteractiveCard>
  )
}
