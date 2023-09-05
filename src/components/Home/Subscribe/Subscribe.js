import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col, Form, Input } from 'antd'
import { i18n, withTranslation } from '../../../../i18n'
import { SendOutlined } from '@ant-design/icons';

import styles from '../../../styles/Home.module.css'
class Subscribe extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={`${styles.subscribe} ${process.env.THEME_NAME === "TRAVELO" && styles.subscribeTravelo}`}>
                <div className={styles.container}>
                    <div className={`${process.env.THEME_NAME === "TRAVELO" && styles.contentSubscribeTravelo}`}>
                        <Row>
                            <Col xs={24} sm={24} md={8} lg={10} xl={12}>
                                <div className={styles.subscribeText}>
                                    <h3>{t('subscribe')}</h3>
                                    <span>{t('subscribe-desc')}</span>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={14} xl={12}>
                                <div className={styles.subscribeRegister}>
                                    <Row>
                                        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                            <div className={styles.subscribeInput}>
                                                <Input 
                                                    size="large" 
                                                    placeholder={t('firstname-and-family')}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                            <div className={styles.subscribeInput}>
                                                <Input 
                                                    size="large"
                                                    placeholder={t('email')}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                                            <Button 
                                                size="large"
                                            >
                                                <SendOutlined />
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

Subscribe.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Subscribe.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Subscribe)
