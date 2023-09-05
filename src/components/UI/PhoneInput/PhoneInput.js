import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import ir from 'react-phone-input-2/lang/ir.json';

import {notification} from 'antd';
const PhoneInput = (props) => {
  
  const onKeyDown = e => {
    const message = "لطفا زبان صفحه کلید خود را به انگلیسی تغییر دهید!"
    const numbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    if (numbers.includes(e.key)) {
      notification.config({
        duration: 3,
        rtl: true
      });
      notification["error"]({
        placement: 'bottomRight',
        message: 'خطا',
        description: message
      });
    }
  }
  return (
    <ReactPhoneInput
      {...props}
      containerClass="ltr-tel-input w-100"
      inputClass={'w-100'}
      localization={ir}
      searchPlaceholder="Search"
      enableSearch
      onChange={props.onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default PhoneInput;