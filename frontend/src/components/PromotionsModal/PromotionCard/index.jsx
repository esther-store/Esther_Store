function PromotionCard({ promotion, handleOnclick, location }) {
  return (
    <article
      key={promotion.id}
      className={
        location == "home"
          ? "store-promotion-card home-location"
          : location == "home-mobile"
          ? "store-promotion-card home-mobile-location"
          : "store-promotion-card"
      }
      onClick={() => handleOnclick()}
    >
      <header  className={ location == "home-mobile"
          ? "header-mobile"
          : undefined} >
        <img alt={promotion.name} src={promotion.img} />
      </header>
      <footer className={ location == "home-mobile"
          ? "footer-mobile"
          : undefined}>
        <span>{promotion.name}</span>
        <span>{promotion.discount_in_percent}% OFF</span>
      </footer>
    </article>
  );
}

export default PromotionCard;
