import "./pagesStyles/Home.css";
import { Hero } from "@/components/HomePageComponents/Hero";
import { CategoriesGrid } from "@/components/HomePageComponents/CategoriesGrid";
import { HomePagePromotions } from "@/components/HomePageComponents/Promotions";
import ButtonGoTop from "@/components/HomePageComponents/ButtonGoTop";
import { pagesTitle } from "@/constants";
import { RecommendedProducts } from "@/components/HomePageComponents/RecommendedProducts";
import NavBar from "@/components/NavBar";
import { RemovePageLoader } from "@/components/RemovePageLoader";

function Home() {
  return (
    <main className = "home-page">
      <RemovePageLoader/>
      <NavBar/>
      <title>{pagesTitle.home}</title>
      <ButtonGoTop/>
      <Hero/>
      <span id = "recommended-products"/>
      <RecommendedProducts />
      <span id = {"promotions"}/>
      <HomePagePromotions/>
      <span id = {"categories"}/>
      <CategoriesGrid/>
    </main>
  );
}

export default Home;
