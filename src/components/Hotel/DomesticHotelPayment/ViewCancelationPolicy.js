import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'

import styles from '../../../styles/Home.module.css'
import { Modal } from 'antd';

class ViewCancelationPolicy extends React.Component {
    state = { modalCancelationPolicy: false, };

    setModalCancelationPolicy(modalCancelationPolicy) {
        this.setState({ modalCancelationPolicy });
    }

    render() {
        const { t } = this.props;
        return (
            <div className={styles.viewCancelationPolicy}>
                <span onClick={() => this.setModalCancelationPolicy(true)}>{t("view-cancelation-policy")}</span>
                <Modal
                    open={this.state.modalCancelationPolicy}
                    onOk={() => this.setModalCancelationPolicy(false)}
                    onCancel={() => this.setModalCancelationPolicy(false)}
                    footer={null}
                    width={1180}
                    >
                    <div className={styles.contentCancelationPolicy}>
                        <div className={styles.subjectCancelationPolicy}>{t("cancelation-policy")}</div>
                        <div className={styles.contentTime}>
                            <div className={styles.startTime}>
                                <div className={styles.topTime}>
                                    <div className={styles.contentTopTime}>
                                        {<span>{t("date1")}</span>}
                                        <span>{t("date1-reserve")}</span>
                                    </div>
                                </div>
                                <div className={styles.bottomTime}>
                                    <div className={styles.dotBottomTime}>
                                        <div className={styles.contentDotBottomTime}>
                                            <div className={styles.myDotTime}>
                                                <div className={styles.myDotTime4}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.subjectBottomTime}>{t("complete-refund")}</div>
                                    <div className={styles.detailBottomTime}>{t("no-price-getting")}</div>
                                </div>
                            </div>
                            <div className={styles.endTime}>
                                <div className={styles.topEndTime}>
                                    <div className={styles.righttopEndTime}>
                                        <span>{t("date2")}</span>
                                        <span>{t("date2-time")}</span>
                                    </div>
                                    <div className={styles.lefttopEndTime}>
                                        <span>{t("date3")}</span>
                                        <span>{t("date3-date")}</span>
                                    </div>
                                </div>
                                <div className={styles.bottomEndTime}>
                                    <div className={styles.dotBottomEndTime}>
                                        <div className={styles.dotBottomEndTime1}></div>
                                        <div className={styles.dotBottomEndTime2}></div>
                                    </div>
                                    <div className={styles.typeBottomEndTime}>{t("no-return-money")}</div>
                                    <div className={styles.titleBottomEndTime}>{t("full-price-decrease")}</div>
                                    <div className={styles.nameBottomEndTime}>{t("price-rial")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

ViewCancelationPolicy.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ViewCancelationPolicy.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ViewCancelationPolicy)
