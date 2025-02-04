import "./pagesStyles/Home.css";
import { Hero } from "@/components/HomePageComponents/Hero";
import { CategoriesGrid } from "@/components/HomePageComponents/CategoriesGrid";

function Home() {
  return (
    <main className = "home-page">
      <Hero/>
      <CategoriesGrid/>
    </main>
  );
}

export default Home;
