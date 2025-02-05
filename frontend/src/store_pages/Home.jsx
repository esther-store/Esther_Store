import "./pagesStyles/Home.css";
import { Hero } from "@/components/HomePageComponents/Hero";
import { CategoriesGrid } from "@/components/HomePageComponents/CategoriesGrid";
import { HomePagePromotions } from "@/components/HomePageComponents/Promotions";
import ButtonGoTop from "@/components/HomePageComponents/ButtonGoTop";

function Home() {
  return (
    <main className = "home-page">
      <ButtonGoTop/>
      <Hero/>
      <HomePagePromotions/>
      <CategoriesGrid/>
    </main>
  );
}

export default Home;
