export function NavigationPoints({
  items,
  currentIndex,
  onChange,
}: {
  items: [];
  currentIndex: number;
  onChange?: (index: number) => {};
}) {
  return items.map((_, index) => (
    <button
      key={index}
      className={index === currentIndex ? "point point-active" : "point"}
      onClick={() => onChange(index)}
    />
  ));
}
