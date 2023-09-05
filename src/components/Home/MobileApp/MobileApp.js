import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { withTranslation } from '../../../../i18n'
import { MobileOutlined, CheckOutlined } from '@ant-design/icons';

import styles from '../../../styles/Home.module.css'
class MobileApp extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.mobileApp}>
                <div className={styles.container}>
                    <Row>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <div className={styles.mobileAppIcon}>
                                <MobileOutlined />
                                <h3>{t('mobile-app-h3')}</h3>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={7} lg={8} xl={8}>
                            <div className={styles.mobileAppText}>
                                <ul>
                                    <li>
                                        <CheckOutlined />
                                        <h6>{t('mobile-app-desc1')}</h6>
                                    </li>
                                    <li>
                                        <CheckOutlined />
                                        <h6>{t('mobile-app-desc2')}</h6>
                                    </li>
                                    <li>
                                        <CheckOutlined />
                                        <h6>{t('mobile-app-desc3')}</h6>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={9} lg={8} xl={8}>
                            <div className={styles.mobileAppLink}>
                                <h6>{t('download')}</h6>
                                <a href="#">
                                    {/* <img src="images/bazaar.png" alt="اپ استور" /> */}
                                </a>
                                <a href="#">
                                    {/* <img src="images/googleplay.png" alt="گوگل پلی" /> */}
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

MobileApp.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
MobileApp.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(MobileApp)
