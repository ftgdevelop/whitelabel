import moment from "moment-jalaali";

const Time = moment();

const year = {
  jalali: moment().format("jYYYY"),
  miladi: moment().format("YYYY"),
};
const rangDate = {
  INF:[moment().subtract(2, "Year"), moment().subtract(10, "day")],
  CHD: [moment().subtract(12, "Year"), moment().subtract(2, "Year")],
  ADT:[moment().subtract(140, "Year"), moment().subtract(12, "Year")],
  passportExpire:[moment().add(6, "month"), moment().add(15, "Year")]
}

const years = {
  INF: {
    jalali: [year.jalali, year.jalali - 1, year.jalali - 2],
    miladi: [year.miladi, year.miladi - 1, year.miladi - 2],
  },

  CHD: {
    jalali: Array.from({ length: 11 }, (v, k) => year.jalali - 2 - k),
    miladi: Array.from({ length: 11 }, (v, k) => year.miladi - 2 - k),
  },

  ADT: {
    jalali: Array.from({ length: 120 }, (v, k) => year.jalali-12 - k),
    miladi: Array.from({ length: 120 }, (v, k) => year.miladi-12 - k),
  },
  passportExpire: Array.from({ length: 16 }, (v, k) => Number(year.miladi) + k),
  monthMiladi: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthJalali: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
};

const dateInfo = () => {
    return {
        rangDate,
        years
    }
}

export default dateInfo;