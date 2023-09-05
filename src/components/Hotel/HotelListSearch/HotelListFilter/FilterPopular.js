import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'

function onChange(value) {
    console.log('onChange: ', value);
}

class FilterPopular extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>
                <div className={styles.filterPopular}>
                    <div className={styles.subTextFilter}>
                    {t("common-filters")}
                        <button className={styles.btnResetFilter}>حذف</button>
                    </div>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("free-cancel")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(231)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("with-breakfast")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(45)</span>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

FilterPopular.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterPopular.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterPopular)
