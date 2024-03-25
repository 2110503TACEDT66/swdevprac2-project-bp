"use client";
import { useEffect, useReducer, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import getRestaurants from "@/libs/getRestaurants";
import { RestaurantItem, RestaurantJson } from "../../interface";
import { LinearProgress, Box } from "@mui/material";

export default function CardPanel() {
  const [restaurantResponse, setRestaurantResponse] =
    useState<RestaurantJson | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const restaurants = await getRestaurants(page);
      setRestaurantResponse(restaurants);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  const compareReducer = (
    compareList: Map<string, number>,
    action: { type: string; restaurantName: string; rating?: number }
  ) => {
    switch (action.type) {
      case "add": {
        return new Map(
          compareList.set(action.restaurantName, action.rating || 5)
        );
      }
      case "remove": {
        compareList.delete(action.restaurantName);
        return new Map(compareList);
      }
      default: {
        return compareList;
      }
    }
  };

  const [compareList, dispatchCompare] = useReducer(
    compareReducer,
    new Map<string, number>()
  );

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <p>Restaurant Panel is Loading</p>
        <LinearProgress />
      </Box>
    );
  }

  if (!restaurantResponse) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {restaurantResponse.data.map((restaurantItem: RestaurantItem) => (
          <Link
            href={`/restaurant/${restaurantItem.id}`}
            className="w-1/5"
            key={restaurantItem.id}
          >
            <Card
              restaurantName={restaurantItem.name}
              imgSrc={restaurantItem.picture}
              onCompare={(restaurant: string, rating: number) =>
                dispatchCompare({
                  type: "add",
                  restaurantName: restaurant,
                  rating: rating,
                })
              }
            />
          </Link>
        ))}
      </div>
      {restaurantResponse.pagination.prev ? (
        <button
          onClick={() => {
            setPage(restaurantResponse.pagination.prev!.page);
          }}
        >
          Prev
        </button>
      ) : null}
      <div>Page: {page}</div>
      {restaurantResponse.pagination.next ? (
        <button
          onClick={() => {
            setPage(restaurantResponse.pagination.next!.page);
          }}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}
