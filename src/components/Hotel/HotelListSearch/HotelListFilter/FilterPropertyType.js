import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import { Input, Checkbox, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'

function onChange(value) {
    console.log('onChange: ', value);
}

class FilterPropertyType extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>
                <div className={styles.filterPropertyType}>
                    <div className={styles.subTextFilter}>
                        {t("hotel-type")}
                        <button className={styles.btnResetFilter}>حذف</button>
                    </div>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("hotel")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(120)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("hotel-apartment")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(290)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("guest-type")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(77)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("beach")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(59)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("traditional-hotel")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(69)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("guest1")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(12)</span>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

FilterPropertyType.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterPropertyType.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterPropertyType)
