import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../i18n";
import { Group, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "../../../styles/Home.module.css";

const DiscountCode = (props) => {
  const { t, setDiscountCode, addDiscountCode, discountMessage, discountLoading, setDiscountResponse } = props;
  const [inputValue, setInputValue] = useState("");
  const [deleteValue, setDeleteValue] = useState(false);

  useEffect(() => {
    setDiscountCode(inputValue);
  }, [inputValue]);
  
  const onChange = (e) => {
    setInputValue(e.target.value);
  }

  const submit = () => {
    addDiscountCode();
    setDeleteValue(true);
  };

  const resetInputField = () => {
    setInputValue("");
    setDeleteValue(false);
    setDiscountResponse('');
  }

  const showMessage = () => {
    if (discountMessage == null) {
      return "کد تخفیف اضافه گردید"
    } else {
      switch (discountMessage.code) {
        case 6101:
          return "این کد تخفیف وجود ندارد"
          break;
        case 6102:
          return "این کد تخفیف برای این سرویس نیست"
          break;
        case 6103:
          return "این کد تخفیف شروع نشده است"
          break;
        case 6104:
          return "این کد تخفیف به اتمام رسیده است"
          break;
        case 6105:
          return "این کد تخفیف را دیگر نمیتوانید استفاده کنید"
          break;
      }
    }
  }

  return (
    <div className={styles.discountCode}>
      <div className={styles.subject}>
        <div>کد تخفیف</div>
      </div>
      <div className={styles.content}>
        <Input.Group compact className="discount-code" size="large">
          <Input
            placeholder="افزودن کد تخفیف"
            onChange={onChange}
            value={inputValue}
            disabled={deleteValue}
          />
          {!deleteValue ?
            <Button
              type="primary"
              size="large"
              onClick={() => submit()}
              >ثبت</Button>
              :
            <Button
              type="primary"
              size="large"
              onClick={resetInputField}
            >حذف</Button>}
        </Input.Group>
        {deleteValue ?
          <span className={styles.textAddCode}>
            {discountLoading ? 
              <>
                <LoadingOutlined spin className={styles.alertLoading} />
                {"در حال بررسی کد تخفیف"}
              </>
            : showMessage()}
          </span> : null}
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
