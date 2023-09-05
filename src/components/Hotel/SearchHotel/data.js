
// export const iranOptions = [
//     { value: 'tehran', label: 'تهران' },
//     { value: 'shiraz', label: 'شیراز' },
//     { value: 'esfahan', label: 'اصفهان' },
//     { value: 'kish', label: 'کیش' },
// ];

// export const foreignOptions = [
//     { value: 'london', label: 'لندن' },
//     { value: 'dubai', label: 'دبی' },
// ];
 
export default (iranOptions,foreignOptions) => [
  {
    SearchValue: 'هتل داخلی',
    options: iranOptions,
  },
  {
    SearchValue: 'هتل خارجی',
    options: foreignOptions,
  },
];
  