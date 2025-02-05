import "./pagesStyles/Home.css";
import { Hero } from "@/components/HomePageComponents/Hero";
import { CategoriesGrid } from "@/components/HomePageComponents/CategoriesGrid";
import { HomePagePromotions } from "@/components/HomePageComponents/Promotions";
import ButtonGoTop from "@/components/HomePageComponents/ButtonGoTop";
import { pagesTitle } from "@/constants";

function Home() {
  return (
    <main className = "home-page">
      <title>{pagesTitle.home}</title>
      <ButtonGoTop/>
      <Hero/>
      <HomePagePromotions/>
      <CategoriesGrid/>
    </main>
  );
}

export default Home;
