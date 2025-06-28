export interface Neighborhood {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  description: string;
  walk_score: number;
  transit_score: number;
  crime_rate: 'low' | 'medium' | 'high';
  median_rent: number;
  population_density: 'low' | 'medium' | 'high';
  tags: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    id: 1,
    name: "Greenwood",
    city: "Seattle",
    state: "WA",
    country: "USA",
    description: "A quiet, residential neighborhood with a strong sense of community.",
    walk_score: 85,
    transit_score: 60,
    crime_rate: 'low',
    median_rent: 2000,
    population_density: 'medium',
    tags: ["family-friendly", "quiet", "parks"],
  },
  {
    id: 2,
    name: "Capitol Hill",
    city: "Seattle",
    state: "WA",
    country: "USA",
    description: "A vibrant, energetic neighborhood known for its nightlife and arts scene.",
    walk_score: 95,
    transit_score: 80,
    crime_rate: 'medium',
    median_rent: 2500,
    population_density: 'high',
    tags: ["nightlife", "artsy", "foodie"],
  },
  {
    id: 3,
    name: "Williamsburg",
    city: "New York",
    state: "NY",
    country: "USA",
    description: "A trendy neighborhood with a mix of vintage shops, boutiques, and restaurants.",
    walk_score: 92,
    transit_score: 88,
    crime_rate: 'medium',
    median_rent: 4000,
    population_density: 'high',
    tags: ["trendy", "artsy", "foodie", "nightlife"],
  },
  {
    id: 4,
    name: "Silver Lake",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    description: "A hip, eclectic neighborhood with a laid-back vibe.",
    walk_score: 75,
    transit_score: 50,
    crime_rate: 'medium',
    median_rent: 3000,
    population_density: 'medium',
    tags: ["hip", "artsy", "foodie"],
  },
  {
    id: 5,
    name: "The Mission",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    description: "A diverse, vibrant neighborhood with a rich cultural history.",
    walk_score: 98,
    transit_score: 90,
    crime_rate: 'high',
    median_rent: 3500,
    population_density: 'high',
    tags: ["diverse", "foodie", "nightlife", "artsy"],
  },
]; 