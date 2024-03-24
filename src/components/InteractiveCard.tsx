"use client"
import Rating from "@mui/material/Rating";
import React, { useState } from "react";

export default function InteractiveCard( { children, contentName, onCompare }: { children: React.ReactNode, contentName?: string, onCompare?:Function } ) {
  function onCardSelected() {
    alert(`You select ${contentName}`);
  }

  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type == "mouseover") {
      event.currentTarget.classList.remove("shadow-lg");
      event.currentTarget.classList.add("shadow-2xl");
      event.currentTarget.classList.remove("bg-white");
      event.currentTarget.classList.add("bg-neutral-200");
    } else {
      event.currentTarget.classList.remove("shadow-2xl");
      event.currentTarget.classList.add("shadow-lg");
      event.currentTarget.classList.remove("bg-neutral-200");
      event.currentTarget.classList.add("bg-white");
    }
  }

  const [rating, setRating] = useState(5);
  
  return (
    <div className="w-full h-[300px] rounded-lg shadow-lg bg-white"
    onMouseOver={ (e) => {onCardMouseAction(e);} }
    onMouseOut={ (e) => {onCardMouseAction(e);} }>
      { children }
      {
        onCompare ?
        <Rating id={`${contentName} Rating`} name={`${contentName} Rating`}
          data-testid={`${contentName} Rating`} value={rating}
          onChange={ (e, value) => {onCompare(contentName, value); setRating(value || 5);} }
          onClick={ (e) => {e.stopPropagation();} }
          className="h-[10%] mx-2 p-1"/>
        : ""
      }
    </div>
  )
}
