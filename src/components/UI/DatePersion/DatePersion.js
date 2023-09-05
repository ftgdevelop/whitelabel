import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const DatePersion = (props) => {
  const { date, showMiladi } = props;
  return (
    <>
      <span>
        {date
          ? moment(date, "YYYY-M-D").locale("fa").format("dddd jD jMMMM ")
          : ""}
      </span>
      {date && showMiladi ? (
        <span>
          ({moment(date, "YYYY-M-D").locale("fa").format(" D MMMM ")})
        </span>
      ) : (
        ""
      )}
    </>
  );
};
export default DatePersion;
