import {useState} from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { Form, Input, Select, Button, Space, Alert, Row, Col, notification } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { RightOutlined } from '@ant-design/icons'
import { LoadingOutlined } from "@ant-design/icons";

import styles from '../../styles/Home.module.css'
import AsideMyAccount from '../../components/MyAccount/AsideMyAccount'
import { TravellersIcon, WalletIcon, ProfileIcon, BookingIcon, PasswordIcon, InvoiceLargeIcon } from '../../components/UI/Icons'
import RequireAuth from '../../utils/requireAuth'
import { changePassword } from '../../actions/user/authActions'
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

const openNotification = (type, placement, msg) => {
    notification[type]({
      message: msg,
      description: "",
      placement,
      style: {
        color: "#fff",
        background: "rgba(0,0,0,0.8)",
      },
    });
  };

const PasswordPage = ({ t }) => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish =async (values) => {
        if(!loading){
            if(values.newPassword === values.repeatPassword){
                setLoading(true);
                const res = await changePassword({
                    "currentPassword": values.currentPassword,
                    "newPassword": values.newPassword,
                })
                setLoading(false);
                if(res && res.status == 200){
                    openNotification('success','bottomRight',t("password-changed-successfully"))
                    form.resetFields();
                }else{
                    openNotification('error','bottomRight',t('unsuccessfull-send'))
                }

            }else{
                openNotification('error','bottomRight',t('password-not-match'))
            }
        }
       
    }
    
    return(
        <Layout>
            <Head>
                <title>{t("my-account")}</title>
            </Head>
            <div
                className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
                >
                <div className={styles.container}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={7} xl={8}>
                            <div className={styles.asideMobile}>
                                <AsideMyAccount/>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={17} xl={16}>
                            <div className={styles.backHomeProfile}>
                                <Link as="/myaccount" href="/myaccount">
                                    <a>
                                        <RightOutlined />
                                        {t('return')}
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.passwordPage}>
                                <div className={styles.headPasswordPage}>
                                    <PasswordIcon/>
                                    <div className={styles.headProfilePageText}>
                                        <h2>{t('password')}</h2>
                                        <span>{t("change-password")}</span>
                                    </div>
                                </div>
                                <div className={styles.contentPasswordPage}>
                                    <div className={styles.passwordInformation}>
                                        <span className={styles.alertNote}>{t("change-password-desc")}</span>
                                        <Form
                                            name="complex-form"
                                            layout="vertical"
                                            onFinish={onFinish}
                                            form={form}
                                        >
                                            <Row>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item
                                                        label={t('current-password')}
                                                        name="currentPassword"
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: t("current-password-desc"),
                                                            }
                                                        ]}
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                        >
                                                        <Input.Password size="large" className={styles.input95} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item
                                                        label={t("new-password")}
                                                        name="newPassword"
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: t('new-password-desc'),
                                                            },
                                                            { message: t('at-least-six-char'), min:6 }
                                                        ]}
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                        >
                                                        <Input.Password size="large" className={styles.input95}/>
                                                       
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item label={t('repeat-new-password')} name="repeatPassword"
                                                     rules={[
                                                        {
                                                          required: true,
                                                          message: t('repeat-new-password-desc'),
                                                        }
                                                      ]}
                                                      className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                      >
                                                        <Input.Password size="large" className={styles.input95} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Button type="primary" size="large" htmlType="submit">
                                                {t("change-password")}
                                                {loading ? <LoadingOutlined spin className={styles.icon} style={{marginRight: '10px'}} />:''}

                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    )
}

PasswordPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

PasswordPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(RequireAuth(PasswordPage))
