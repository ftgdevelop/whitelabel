import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'

function onChange(value) {
    console.log('onChange: ', value);
}

class FilterAvailability extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>
                <div className={styles.filterAvailability}>
                    <div className={styles.subTextFilter}>
                        {t("available-hotel")}
                        <button className={styles.btnResetFilter}>حذف</button>
                    </div>
                    <Row>
                        <Col flex="auto">
                            <Checkbox onChange={onChange}>{t("just-available-hotel")}</Checkbox>
                        </Col>
                        <Col flex="50px" className={styles.countFilter}>
                            <span>(231)</span>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

FilterAvailability.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterAvailability.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterAvailability)
