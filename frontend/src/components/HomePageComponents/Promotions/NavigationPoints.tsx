import React from 'react'

export const NavigationPoints = React.memo(function NavigationPoints({
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
})

