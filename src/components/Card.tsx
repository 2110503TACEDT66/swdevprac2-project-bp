import Image from "next/image"
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { useState } from "react";

export default function Card( { hospitalName, imgSrc, onCompare }:
  { hospitalName: string, imgSrc: string, onCompare?: Function } ) {
  
  return (
    <InteractiveCard contentName={hospitalName} onCompare={onCompare}>
        <div className="w-full h-[70%] relative rounded-t-lg">
            <Image src={imgSrc}
                alt="Product Picture"
                fill={true}
                objectFit="cover"
                className="object-cover rounded-t-lg"
            />
        </div>
        <div className="w-full h-[15%] p-[10px]">{hospitalName}</div>
    </InteractiveCard>
  )
}
