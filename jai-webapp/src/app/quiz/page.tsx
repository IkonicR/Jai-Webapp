"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { neighborhoods } from "@/lib/data";

const allTags = [...new Set(neighborhoods.flatMap((n) => n.tags))];

export default function QuizPage() {
  const [rent, setRent] = useState("2500");
  const [walkScore, setWalkScore] = useState([50]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/results?rent=${rent}&walk_score=${
        walkScore[0]
      }&tags=${selectedTags.join(",")}`
    );
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex w-full max-w-lg flex-col items-start gap-2">
        <Card className="w-full">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Find Your Neighborhood</CardTitle>
              <CardDescription>
                Answer a few questions to find your perfect match.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="rent">
                    What's your ideal monthly rent? (${rent})
                  </label>
                  <Slider
                    id="rent"
                    min={500}
                    max={5000}
                    step={100}
                    value={[parseInt(rent)]}
                    onValueChange={(value) => setRent(String(value[0]))}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="walk-score">
                    How important is walkability? ({walkScore[0]})
                  </label>
                  <Slider
                    id="walk-score"
                    min={0}
                    max={100}
                    step={1}
                    value={walkScore}
                    onValueChange={setWalkScore}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label>What's your vibe?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagChange(tag)}
                        />
                        <label
                          htmlFor={tag}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Find My Neighborhood</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
} 