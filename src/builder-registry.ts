"use client";
import { builder, Builder } from "@builder.io/react";
import Banner from "./components/Banner";
import Counter from "./components/Counter/Counter";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(Banner, {
  name: "Banner",
});
