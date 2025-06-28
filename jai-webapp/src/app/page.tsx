import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container flex h-full flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Find your perfect neighborhood.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Stop scrolling through listings. Answer a few questions and let our
          algorithm find the perfect place for you to call home.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/quiz">
          <Button>Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
