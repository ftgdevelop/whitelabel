import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Select, Popover, Button, notification } from "antd";
import {
  DownOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from "@ant-design/icons";

import styles from "../../../styles/Home.module.css";

const { Option } = Select;

const openNotification = (type, placement, msg) => {
  notification[type]({
    message: msg,
    description:'',
    placement,
    style: {
      color: '#fff',
      background: 'rgba(0,0,0,0.8)' ,
      
    },
  });
};

const PaxSelect = (props) => {
  const { t, defaultValue } = props;

  const [visible, setVisible] = useState(false);
  const [persons, setPersons] = useState(defaultValue);
  const [sum, setSum] = useState(
    defaultValue.adult + defaultValue.child + defaultValue.infant
  );

  useEffect(()=>{
    setPersons(props.defaultValue);
    setSum(props.defaultValue.adult + props.defaultValue.child + props.defaultValue.infant);
  },[props.defaultValue])

  const changeItem = (action, label) => {
    let item = { ...persons };
    const countChild = (item["child"] + item["infant"] + 1) / item["adult"];
    if (
      (label === "child" || label === "infant") &&
      action === "plus" &&
      countChild > 3
    ) {
      openNotification('error','bottomRight',"به ازای هر بزرگسال 3 کودک، یا 2 کودک و یک نوزاد مجاز است")
      return;
    } else if (label === "adult" && action === "minus" && item[label] === 1) {
      openNotification('error','bottomRight',"تعداد بزرگسالان نمیتواند کمتر از 1 باشد")
      return;
    } else if (label === "child" && action === "plus" && countChild > 3) {
      openNotification('error','bottomRight',"به ازای هر بزرگسال 3 کودک، یا 2 کودک و یک نوزاد مجاز است")
      return;
    } else if (
      label === "infant" &&
      action === "plus" &&
      item["infant"] + 1 > item["adult"]
    ) {
      openNotification('error','bottomRight',"تعداد نوزادها نمی تواند بیشتر از تعداد بزرگسالان باشد")
      return;
    }

    if (action === "plus") {
      if (sum < 9) {
        item[label] = item[label] + 1;
      } else {
        openNotification('error','bottomRight',"حداکثر تعداد مسافران 9 نفر است")
        return
      }
    } else if (action === "minus") {
      if (item[label]) {
        item[label] = item[label] - 1;
      }
    }
    setSum(item.adult + item.child + item.infant);
    setPersons(item);
    props.setValue(item, props.label);
  };

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <div className="paxSelect">
        <Popover
          content={
            <div className="paxSelectPopover">
              <div className="paxPopover">
                <span>{t('adults')}</span>
                <div>
                  <MinusCircleFilled
                    onClick={() => changeItem("minus", "adult")}
                  />
                  <span className="paxPopoverCount">{persons.adult}</span>
                  <PlusCircleFilled
                    onClick={() => changeItem("plus", "adult")}
                  />
                </div>
              </div>
              <div className="paxPopover">
                <span>{t('children')}</span>
                <div>
                  <MinusCircleFilled
                    onClick={() => changeItem("minus", "child")}
                  />
                  <span className="paxPopoverCount">{persons.child}</span>
                  <PlusCircleFilled
                    onClick={() => changeItem("plus", "child")}
                  />
                </div>
              </div>
              <div className="paxPopover">
                <span>{t('infants')}</span>
                <div>
                  <MinusCircleFilled
                    onClick={() => changeItem("minus", "infant")}
                  />
                  <span className="paxPopoverCount">{persons.infant}</span>
                  <PlusCircleFilled
                    onClick={() => changeItem("plus", "infant")}
                  />
                </div>
              </div>
            </div>
          }
          // title="Title"
          trigger="click"
          open={visible}
          onOpenChange={handleVisibleChange}
          placement="bottom"
        >
          <Button>
            <h6>{sum} {t('passengers')}</h6>
            <DownOutlined />
          </Button>
        </Popover>
      </div>
    </>
  );
};

PaxSelect.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

PaxSelect.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(PaxSelect);
