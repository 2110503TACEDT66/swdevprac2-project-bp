"use client"

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useWindowListener } from "@/hooks/useWindowListener";

export default function PromoteCard() {
    const [playing, setPlaying] = useState(true);

    useWindowListener("contextmenu", (e) => {e.preventDefault();})
  
    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2
        rounded-lg bg-gray-200 flex flex-row">
            <VideoPlayer vdoSrc="/video/getrestaurant.mp4" isPlaying={playing}/>
            <div className="m-5 text-black">
                Get your seat now.
                <button className="block rounded-md bg-red-600
                    hover:bg-amber-800 px-3 py-2 text-white shadow-sm"
                    onClick={() => { setPlaying(!playing) }}>
                    { playing ? "Pause" : "Play" }
                </button>
            </div>
        </div>
    )
}
  