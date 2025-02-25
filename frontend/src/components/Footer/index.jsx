import "./index.css";
import { useGetContactInfo } from "@/hooks/useGetContactInfo";
import { FacebookIcon } from "@/icons/FacebookIcon";
import { InstagramIcon } from "@/icons/InstagramIcon";
import { EmailIcon } from "@/icons/EmailIcon";
import { PhoneIcon } from "@/icons/PhoneIcon";

function Footer() {
  const { contactInfo } = useGetContactInfo();
  return (
    <article className="footer">
      <div className="social-networks-and-contact-container">
        {contactInfo?.facebook || contactInfo?.instagram ? (
          <section>
            <h4>Estamos en:</h4>
            <div className="social-networks">
              {contactInfo?.facebook ? (
                <a
                  href={contactInfo?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <FacebookIcon />
                </a>
              ) : null}
              {contactInfo?.instagram ? (
                <a
                  href={contactInfo?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <section>
          <h4>Contáctanos:</h4>
          <div className="contact-section">
            {contactInfo?.email ? (
              <a
                href={`mailto:${contactInfo?.email}`}
                target="__blank"
                rel="noopener noreferrer"
                title={contactInfo?.email}
              >
                <EmailIcon />
              </a>
            ) : null}
            {contactInfo?.phone ? (
              <a
                href={`tel:${contactInfo?.phone}`}
                target="__blank"
                rel="noopener noreferrer"
                title={contactInfo?.phone}
              >
                <PhoneIcon />
              </a>
            ) : null}
          </div>
        </section>
      </div>

      {contactInfo?.location ? (
        <section className="address">
          <h4>Nos hubicamos en:</h4>
          <div>{contactInfo?.location}</div>
        </section>
      ) : null}

      <footer className="privacity">
        Esther Store. Todos los derechos reservados
      </footer>
    </article>
  );
}

export default Footer;
