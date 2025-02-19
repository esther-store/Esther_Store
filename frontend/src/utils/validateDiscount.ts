export const validateDiscount = ({
  productDiscount,
  promotionDiscount,
  onOk,
}: {
  productDiscount?: number;
  promotionDiscount?: number;
  onOk: () => void;
}) => {
  if (promotionDiscount && promotionDiscount == 100) {
    const choice = window.confirm(
`⚠️ El descuento aplicado conllevará a precio 0 ⚠️. 
Verifica que el descuento por producto y promoción sean los deseados. 
Desea continuar de todas formas?`
    );
    if (!choice) {
      return;
    }
    return onOk();
  }
  if (productDiscount && productDiscount == 100) {
    const choice = window.confirm(
`⚠️ El descuento aplicado conllevará a precio 0 ⚠️. 
Verifica que el descuento por producto y promoción sean los deseados. 
Desea continuar de todas formas?`
    );
    if (!choice) {
      return;
    }
    return onOk();
  }
  if (
    productDiscount &&
    promotionDiscount &&
    promotionDiscount + productDiscount == 100
  ) {
    const choice = window.confirm(
`⚠️ El descuento aplicado conllevará a precio 0 ⚠️. 
Verifica que el descuento por producto y promoción sean los deseados. 
Desea continuar de todas formas?`
    );
    if (!choice) {
      return;
    }
    return onOk();
  }
  return onOk()
};
