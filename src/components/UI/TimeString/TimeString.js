import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const TimeString = (props) => {
  const { time, showMiladi } = props;
  const value = time.split(":");
  return (
    <>
      <span>
        {`${value[0]} ساعت`}
        {value[1] !== "00" && ` و ${value[1]} دقیقه`}
      </span>
      {time && showMiladi ? (
        <span>
          {`${value[0]} h`}
          {value[1] !== "00" && ` و ${value[1]} m`}
        </span>
      ) : (
        ""
      )}
    </>
  );
};
export default TimeString;
