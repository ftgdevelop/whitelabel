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
    defaultValue.adult + defaultValue.children
  );
  const [sumAcc, setSumAcc] = useState(
    defaultValue.accompanying
  );

  useEffect(()=>{
    setPersons(props.defaultValue);
    setSum(props.defaultValue.adult + props.defaultValue.children);
    setSumAcc(props.defaultValue.accompanying);
  },[props.defaultValue])

  const changeItem = (action, label) => {
    let item = { ...persons };
    const countChild = (item["children"] + item["accompanying"] + 1) / item["adult"];
    if (label === "adult" && action === "minus" && item[label] === 1) {
      openNotification('error','bottomRight',"تعداد بزرگسالان نمیتواند کمتر از 1 باشد")
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
    setSum(item.adult + item.children);
    setSumAcc(item.accompanying);
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
      <div
        className={`paxSelect ${process.env.THEME_NAME === "TRAVELO" && "paxSelectTravelo" }`}
        >
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
                    onClick={() => changeItem("minus", "children")}
                  />
                  <span className="paxPopoverCount">{persons.children}</span>
                  <PlusCircleFilled
                    onClick={() => changeItem("plus", "children")}
                  />
                </div>
              </div>
              <div className="paxPopover">
                <span>همراه (مشایعت کننده)</span>
                <div>
                  <MinusCircleFilled
                    onClick={() => changeItem("minus", "accompanying")}
                  />
                  <span className="paxPopoverCount">{persons.accompanying}</span>
                  <PlusCircleFilled
                    onClick={() => changeItem("plus", "accompanying")}
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
            <h6>{sum} {t('passengers')}, {sumAcc} همراه</h6>
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
