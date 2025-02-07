import "./pagesStyles/Home.css";
import { Hero } from "@/components/HomePageComponents/Hero";
import { CategoriesGrid } from "@/components/HomePageComponents/CategoriesGrid";
import { HomePagePromotions } from "@/components/HomePageComponents/Promotions";
import ButtonGoTop from "@/components/HomePageComponents/ButtonGoTop";
import { pagesTitle } from "@/constants";
import { RecommendedProducts } from "@/components/HomePageComponents/RecommendedProducts";
import NavBar from "@/components/NavBar";

function Home() {
  return (
    <main className = "home-page">
      <NavBar/>
      <title>{pagesTitle.home}</title>
      <ButtonGoTop/>
      <Hero/>
      <span id = {"promotions"}/>
      <HomePagePromotions/>
      <span id = {"categories"}/>
      <CategoriesGrid/>
      <span id = "recommended-products"/>
      <RecommendedProducts />
    </main>
  );
}

export default Home;
