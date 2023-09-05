import React, { useState,useRef } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../../../i18n";
import { Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "../../../styles/Home.module.css";

const DiscountCode = (props) => {
  const { addDiscountCode, discount,clearDiscountError} = props;

  const [validationError,setValidationError] = useState(false);

  const inputRef = useRef();

  const submit = () => {
    const value = inputRef.current?.value;
    if (value?.trim().length > 0){
      addDiscountCode(value);
    }else{
      setValidationError(true);
    }
  };

  const onChange = e => {
    if (validationError || discount?.status==="error"){
      const value = e.target.value;
      if (value?.trim().length > 0){
        setValidationError(false);
        clearDiscountError();
      }
    }
  }

  let message = null;
  if (discount?.status === "success") {
    message = "کد تخفیف اضافه گردید"
  } else if (discount?.status === "error"){
    switch (discount.errorCode) {
      case 6101:
        message =  "این کد تخفیف وجود ندارد"
        break;
      case 6102:
        message =  "این کد تخفیف برای این سرویس نیست"
        break;
      case 6103:
        message =  "این کد تخفیف شروع نشده است"
        break;
      case 6104:
        message =  "این کد تخفیف به اتمام رسیده است"
        break;
      case 6105:
        message =  "این کد تخفیف را دیگر نمیتوانید استفاده کنید"
        break;
      default:
      message = null;
    }
  }else if (validationError){
    message = "کد تخفیف را وارد نمایید"
  }

  return (
    <div className={styles.discountCode}>
      <div className={styles.subject}>
        <div>کد تخفیف</div>
      </div>
      <div className={styles.content}>
        <Input.Group compact className="discount-code" size="large">
          <input
            type="text"
            placeholder="افزودن کد تخفیف"
            ref ={inputRef}
            onChange={onChange}            
            className={`${styles.cipInput} ${styles.cipDiscountInput}`}
            disabled={discount?.status==="loading" || discount?.status==="success"}
          />
          <Button
            type="primary"
            size="large"
            onClick={submit}
            htmlType="button"
            disabled={discount?.status==="loading" || discount?.status==="success"}
          >
            {discount?.status === "success"?"ثبت شد":"ثبت"}
            
          </Button>
        </Input.Group>

        <span className={styles.textAddCode}>
          {discount?.status === "loading"  && <>
              <LoadingOutlined spin className={styles.alertLoading} /> در حال بررسی کد تخفیف
          </>}
          {message}
        </span>
      </div>
    </div>
  );
};

DiscountCode.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

DiscountCode.propTypes = {
  t: PropTypes.func.isRequired,
};


export default withTranslation("common")(DiscountCode);
