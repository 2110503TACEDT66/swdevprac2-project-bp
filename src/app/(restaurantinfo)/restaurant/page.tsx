import CardPanel from "@/components/CardPanel";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Restaurant() {

  return (
    <main className="text-center p-5">
        <h1 className="text-4xl font-medium font-QS ">
            Restaurants
        </h1>
        <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
        <CardPanel/>
        </Suspense>
    </main>
  )
}
