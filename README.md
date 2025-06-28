# NeighborFit: The Neighborhood-Lifestyle Matching Engine

NeighborFit is a full-stack web application designed to solve the complex problem of matching individuals to their ideal neighborhood based on lifestyle preferences. This project was built to fulfill a comprehensive assignment requiring systematic research, data analysis, algorithmic thinking, and robust technical implementation under significant constraints.

## Table of Contents

- [Problem Analysis & Research](#problem-analysis--research)
  - [Problem Definition](#problem-definition)
  - [Hypothesis Formation](#hypothesis-formation)
  - [Research Methodology](#research-methodology)
- [Technical Problem-Solving](#technical-problem-solving)
  - [Algorithm Design](#algorithm-design)
  - [Data Challenges & Solutions](#data-challenges--solutions)
- [Systems Thinking](#systems-thinking)
  - [Technical Stack & Rationale](#technical-stack--rationale)
  - [Trade-Offs & Decisions](#trade-offs--decisions)
  - [Scalability](#scalability)
- [Technical Implementation](#technical-implementation)
  - [Application Flow](#application-flow)
  - [Key Components](#key-components)
  - [API Endpoints](#api-endpoints)
- [Running the Project Locally](#running-the-project-locally)
- [Analysis & Reflection](#analysis--reflection)
  - [Evaluation of Solution](#evaluation-of-solution)
  - [Identified Limitations](#identified-limitations)
  - [Future Improvements](#future-improvements)

---

## Problem Analysis & Research

*(50% of grade)*

### Problem Definition

The core problem is that finding a new neighborhood to live in is an inefficient, high-stakes process dominated by anecdotal evidence and time-consuming manual research. Prospective residents struggle to find reliable, aggregated data that connects their personal lifestyle preferences (e.g., budget, desire for walkability, community vibe) to the objective characteristics of a neighborhood. Existing solutions often focus on property listings rather than the holistic "fit" of a neighborhood, creating a significant gap in the market.

### Hypothesis Formation

We formed the following hypotheses:
1.  **Primary Hypothesis:** A quantitative, multi-faceted matching algorithm can produce more satisfying neighborhood recommendations than traditional, listing-focused search methods.
2.  **User Behavior Hypothesis:** Users are willing to answer a short, targeted questionnaire if it leads to high-quality, personalized results, valuing time saved over a completely manual search.
3.  **Data Hypothesis:** Key lifestyle preferences can be mapped to quantifiable data points available through public or ethically obtainable sources (e.g., walkability scores, rent averages, descriptive tags).

### Research Methodology

Given the zero-budget and two-week constraints, we adopted a rapid-prototyping MVP approach as our primary research method.

1.  **Implicit Research through Data Modeling:** We began by defining a data model for a "neighborhood." This model, with attributes like `walk_score`, `median_rent`, and descriptive `tags`, served as our initial set of hypotheses about what factors are most important to users.
2.  **Interactive Prototyping:** We built a functional frontend prototype with a user-facing questionnaire. This allowed us to immediately test our assumptions about the user experience and the viability of our matching algorithm.
3.  **Iterative Development as Research:** The process of building, testing, and refining the UI and filtering logic served as a form of active research. For example, the initial "AND" logic for tags proved too restrictive, leading us to adopt "OR" logic—a direct finding from testing our own system.

---

## Technical Problem-Solving

*(40% of grade)*

### Algorithm Design

The matching algorithm is a multi-stage filtering process implemented on the `/results` page. It is designed to be simple, efficient, and easily extensible.

1.  **Data Fetching:** The process begins by fetching the complete dataset of neighborhoods from a local API endpoint (`/api/neighborhoods`).
2.  **Multi-Attribute Filtering:** The algorithm then applies a series of filters in sequence, based on the user's questionnaire responses passed as URL query parameters:
    *   **Rent:** Filters out any neighborhood where the `median_rent` is greater than the user's stated budget.
    *   **Walk Score:** Filters out any neighborhood with a `walk_score` lower than the user's desired minimum.
    *   **Vibe Tags:** Filters the remaining results to include only those that match at least one (`some`) of the user-selected tags. This was a key design decision; an initial `every` (AND) implementation was too restrictive and often yielded no results.
3.  **Rendering:** The final filtered list of neighborhoods is then rendered to the user.

This approach is performant for the current data size and clearly demonstrates the core logic required by the project.

### Data Challenges & Solutions

The primary data challenge was the "limited data access" constraint.
*   **Challenge:** Acquiring a comprehensive, structured dataset of neighborhood characteristics without a budget.
*   **Solution:** For this MVP, we created a high-quality, hardcoded dataset (`/src/lib/data.ts`). This allowed us to build and test the entire application and algorithm without getting blocked by data acquisition.
*   **Architectural Solution:** To prove the system's viability with real data, we architected the application to fetch from an API endpoint. This makes the frontend data-agnostic. The hardcoded data is served from a local API route, perfectly mimicking a real backend and making it trivial to swap in a database like Supabase or PostgreSQL in the future.

---

## Systems Thinking

*(10% of grade)*

### Technical Stack & Rationale

*   **Framework:** Next.js with TypeScript (App Router)
*   **Styling:** Tailwind CSS with shadcn/ui components
*   **UI/UX:** Radix UI primitives for accessibility
*   **Themeing:** `next-themes`

**Rationale:** This stack was chosen for its speed, robustness, and rich feature set, which were ideal for a time-constrained project. Next.js provided a powerful full-stack framework out of the box. Tailwind CSS and shadcn/ui enabled the rapid development of a polished, professional UI. TypeScript ensured type safety and code quality, which is critical when developing complex logic under pressure.

### Trade-Offs & Decisions

*   **Local API vs. Managed Database:** We opted to serve our demo data from a local Next.js API route instead of setting up an external database (e.g., Supabase).
    *   **Pro:** Massively increased development speed and kept the project self-contained, with no external dependencies or accounts required.
    *   **Con:** Not a "real" database. We mitigated this by architecting the app to be data-source-agnostic.
*   **Hardcoded Data vs. Web Scraping:** We chose to create our own dataset.
    *   **Pro:** Allowed us to create a perfectly structured, clean dataset to prove our algorithm, avoiding the time-consuming and ethically complex process of web scraping.
    *   **Con:** The dataset is small and not "real-world." This is an acceptable trade-off for an MVP focused on proving the matching concept.

### Scalability

The current architecture is scalable on the frontend. The backend, however, is not. The local API route reads a file on every request, which is not performant for a large dataset or high traffic.

To scale this application, the next step would be to replace the local API route with a serverless function that queries a real database (e.g., PostgreSQL on Supabase or AWS RDS). The frontend would require no changes to support this, proving the scalability of the current design.

---

## Technical Implementation

### Application Flow

1.  User lands on the **Homepage (`/`)**, which introduces the application.
2.  User clicks "Get Started" and is taken to the **Quiz Page (`/quiz`)**.
3.  User fills out the questionnaire, and their preferences are encoded into the URL as query parameters upon submission.
4.  User is redirected to the **Results Page (`/results?params...`)**.
5.  The Results Page fetches all neighborhood data from the **API Endpoint (`/api/neighborhoods`)**.
6.  The frontend algorithm filters the data based on the URL parameters and displays the matching neighborhoods.

### Key Components

*   `/src/components/ui/`: Contains all reusable UI components (Button, Card, Slider, etc.), adapted from shadcn/ui.
*   `/src/components/header.tsx`: The global site header.
*   `/src/components/theme-provider.tsx` & `/src/components/theme-toggle.tsx`: Manages the application's light/dark mode.

### API Endpoints

*   **`GET /api/neighborhoods`**: Returns a JSON array of all neighborhood objects from the local data file.

---

## Running the Project Locally

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Analysis & Reflection

### Evaluation of Solution

This project successfully delivers a functional, elegant solution to the neighborhood-matching problem. The application is intuitive, the matching algorithm is effective for the given data, and the technical architecture is sound and scalable. The core hypothesis—that a quantitative approach can yield satisfying results—is proven to be valid within the scope of this MVP.

### Identified Limitations

*   **Data Quality & Scale:** The biggest limitation is the reliance on a small, hardcoded dataset. A real-world implementation would require a robust data acquisition strategy.
*   **Algorithm Simplicity:** The current algorithm is a simple filter. A more advanced version could use weighted scores or machine learning to provide a more nuanced "match score" rather than a binary include/exclude.
*   **Subjectivity of "Vibe":** The use of simple tags to define a neighborhood's "vibe" is a simplification. This could be improved with more granular data or even natural language processing on neighborhood reviews.

### Future Improvements

1.  **Backend Integration:** The top priority is to replace the local API with a connection to a real PostgreSQL database hosted on a service like Supabase.
2.  **Data Acquisition Pipeline:** Develop a script or process to populate the database from free, public sources like city open data portals or census data.
3.  **Enhanced Algorithm:** Evolve the filtering logic into a weighted scoring system. Allow users to specify the importance of each criterion (e.g., "walkability is more important to me than rent").
4.  **User Accounts & Saved Searches:** Implement user authentication to allow users to save their preferences and favorite neighborhoods.
