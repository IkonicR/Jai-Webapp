"use client";

import { useSearchParams } from "next/navigation";
import { Neighborhood } from "@/lib/data";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [allNeighborhoods, setAllNeighborhoods] = useState<Neighborhood[]>([]);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<
    Neighborhood[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      setIsLoading(true);
      const response = await fetch("/api/neighborhoods");
      const data = await response.json();
      setAllNeighborhoods(data);
    };
    fetchNeighborhoods();
  }, []);

  useEffect(() => {
    if (allNeighborhoods.length === 0) return;

    const rent = searchParams.get("rent");
    const walkScore = searchParams.get("walk_score");
    const tags = searchParams.get("tags");

    let filtered = allNeighborhoods;

    if (rent) {
      filtered = filtered.filter((n) => n.median_rent <= parseInt(rent));
    }

    if (walkScore) {
      filtered = filtered.filter((n) => n.walk_score >= parseInt(walkScore));
    }

    if (tags && tags.length > 0) {
      const selectedTags = tags.split(",");
      filtered = filtered.filter((n) =>
        selectedTags.some((tag) => n.tags.includes(tag))
      );
    }

    setFilteredNeighborhoods(filtered);
    setIsLoading(false);
  }, [searchParams, allNeighborhoods]);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Your Results
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Based on your preferences, here are the neighborhoods that best match
          your lifestyle.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredNeighborhoods.length > 0 ? (
          filteredNeighborhoods.map((n) => (
            <Card
              key={n.id}
              className="transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle>{n.name}</CardTitle>
                <CardDescription>
                  {n.city}, {n.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{n.description}</p>
                <p className="mt-4 font-semibold">
                  Median Rent: ${n.median_rent}
                </p>
                <p className="mt-2 font-semibold">
                  Walk Score: {n.walk_score}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {n.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No matching neighborhoods found.</p>
        )}
      </div>
    </section>
  );
} 