import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  UserOutlined,
  EditOutlined,
  CalendarTwoTone,
  WalletTwoTone,
  LeftOutlined,
  InfoCircleFilled,
  LoadingOutlined 
} from "@ant-design/icons";
import {
  Radio,
  Collapse,
  Form,
  Input,
  Button,
  Row,
  Col,
  InputNumber,
  Table,
  notification,
  Select
} from "antd";

import { Link, i18n, withTranslation } from "../../../../i18n";
import styles from "../../../styles/Home.module.css";
import { CheckCircleIcon, CancelCircleIcon, LockIcon, ErrorIcon } from "../../UI/Icons";
import {
  UserDepositeBankGateway,
  MakeToken,
} from "../../../actions/user/authActions";
import ContentPayment from "../../Payment/ContentPayment";
import { setCurrency } from "../../../actions";

const AddCredit = (props) => {

  const router = useRouter();
  const { t } = props;
  const [gatewayId, setGatewayId] = useState("");
  const [bankGatewayList, setBankGatewayList] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [price, setPrice] = useState(0);
  const [showGateway, setShowGateway] = useState(false);

  useEffect(() => {
    getDepositGateway();
  }, []);

  const getDepositGateway = async () => {
    const res = await UserDepositeBankGateway();
    if (res.status === 200) {
      setBankGatewayList(res.data.result[0]);
    } else {
      setIsError(true);
    }
  };

  const { Option } = Select;

  const submitData = async (value) => {
    setLoadingSubmit(true);
    const callbackUrl =
      window.location.origin +
      (i18n.language === "fa" ? "/fa" : "/ar") +
      "/myaccount/wallet";
    const params = {
      gatewayId: gatewayId ? gatewayId : bankGatewayList.gateways[0].id,
      callBackUrl: callbackUrl,
      amount: value.price,
      currencyType: "IRR",
      ipAddress: 1,
    };
    const res = await MakeToken(params);
    if (res.status == 200) {
      window.location.replace(
        `https://payline.safaraneh.com/fa/User/Payment/PaymentRequest?tokenId=${res.data.result.tokenId}`
      );
    } else {
      openNotification("error", "bottomRight", res.data.error.message);
      setLoadingSubmit(false);
    }
  };

  const setGatewaySelected = (e) => {
    setGatewayId(e.target.value);
  };

  return (
    <div className={styles.noTransation}>
      {/* <h3>{t("charge-your-credit")}</h3>
      <small>{t("your-balance", { number: props.creditAmount })} {props.currency}</small> */}

      <Form
        layout="vertical"
        className={styles.walletIncreaseCredit}
        onFinish={submitData}
        scrollToFirstError={true}
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              label={t("increase-balance-fee-rial")}
            >
              {/* <Input size="large" /> */}
              <Input.Group compact>
                <Form.Item
                  rules={[{ required: true,message:t('enter-price') }]}
                  name="price"
                  className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                >
                  <InputNumber
                    size="large"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    // parser={value => value.replace(/\\s?|(,*)/g, '')}

                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item>
                  <Select
                    defaultValue="IRR"
                    className={styles.changeCurrancy}
                    style={{ width: "80px" }}
                    className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                    >
                    <Option value="IRR">ریال</Option>
                    <Option value="USD">دلار</Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
     
      {/* {showGateway ? ( */}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div
              className={`${styles.contentBooking} ${styles.contentPayment}`}
            >
              {isError === "0" || isError === 0 ? (
                <div className={styles.errorPayment}>
                  <div className={styles.subject}>
                    <ErrorIcon />
                    {t("error-in-pay")}
                  </div>
                  <span>{t("please-pay-again")}</span>
                </div>
              ) : (
                ""
              )}
              {bankGatewayList && bankGatewayList.gateways ? (
                <div
                  className={`${styles.howPay} ${process.env.THEME_NAME === "TRAVELO" && "how-pay-travelo"}`}
                  >
                  <div className={styles.cardTitle}>
                    {t("please-choose-pay-panel")}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.note}>
                      <img
                        src={bankGatewayList.image.path}
                        alt={bankGatewayList.image.altAttribute}
                      />
                      <span>{bankGatewayList.description}</span>
                    </div>

                    <Radio.Group
                      className="bankGateWaysRadio"
                      defaultValue={bankGatewayList.gateways[0].id}
                      onChange={(e) => setGatewaySelected(e)}
                    >
                      {bankGatewayList.gateways.map((bank) => (
                        <Radio.Button value={bank.id} key={bank.id}>
                          <img
                            className="gatewaysRadioIcon"
                            src={bank.image.path}
                            alt={bank.image.altAttribute}
                          />
                          {bank.displayName || bank.name}
                        </Radio.Button>
                      ))}

                      {/* <Radio.Button value="unknown">
                                <img className="gatewaysRadioIcon" src="/images/unknown-bank.png" />
                                ناشناخته
                            </Radio.Button> */}
                    </Radio.Group>

                    <Row>
                      <Col span={24}>
                        {/* <div className={styles.pricePayment}>
                          {t("total-price")}
                          {numberWithCommas(price)} {t("rial")}
                        </div> */}

                        <Button
                          className={`${styles.btnPayment} ${process.env.THEME_NAME === "TRAVELO" && styles.btnPaymentTravelo}`}
                        //   onClick={() => submitData()}
                          htmlType="submit"
                        >
                          {loadingSubmit ? (
                            <LoadingOutlined
                              spin
                              className={styles.loadingFlight}
                            ></LoadingOutlined>
                          ) : (
                            <LockIcon />
                          )}
                          {t("pay")}
                        </Button>
                      </Col>
                    </Row>

                    <div className={styles.textAgreePayment}>
                      <span>{t("accept-privacy")}</span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className={styles.pouyaAlert}>
                <InfoCircleFilled />
                <span>{t("second-password")}</span>
                <Link as="/other/pouya-password" href="/other/pouya-password">
                  <a target="_blank">{t("second-password-desc")}</a>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
    </Form>
      {/* ) : (
        ""
      )} */}
      {router.query && router.query.status === "1" ? (
        <div className={styles.alertSuccessDefault}>
          <CheckCircleIcon />
          <h6>کیف پول شما با موفقیت شارژ شد</h6>
        </div>
      ) : (
        ""
      )}
      {router.query && router.query.status === "0" ? (
        <div className={styles.alertWarningDefault}>
          <CancelCircleIcon />
          <h6>شارژ کیف پول با مشکل مواجه شد</h6>
        </div>
      ) : (
        ""
      )}
      <br />
      <br />
    </div>
  );
};

AddCredit.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    creditAmount: state.creditAmount,
    currency: state.currency
  };
};

// const mapDispatchToProp = (dispatch) => ({
//     changeCurrency: (d) => dispatch(setCurrency(d)),
// });

export default withTranslation("common")(
  connect(mapStateToProp, null)(AddCredit)
);
