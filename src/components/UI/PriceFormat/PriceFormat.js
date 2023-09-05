const PriceFormat = ({ price }) => {
  const numberWithCommas = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  };

  return <>{numberWithCommas(price)}</>;
};
export default PriceFormat;
