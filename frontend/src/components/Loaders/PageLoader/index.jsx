import "./index.css";
import { CompanyLogo } from "@/components/NavBar/CompanyLogo";

function PageLoader({ id }) {
  return (
    <section id={id} className="page-loader">
      <section>
        <CompanyLogo
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            gap: "5px",
          }}
        />
      </section>
    </section>
  );
}

export default PageLoader;
