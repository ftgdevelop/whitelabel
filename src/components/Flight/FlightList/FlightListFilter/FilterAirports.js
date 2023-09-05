import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../i18n'
import { Collapse, Checkbox, Row, Col } from 'antd'
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

import styles from '../../../../styles/Flight.module.css'


class FilterAirports extends React.Component {
    
    render() {
        const { t } = this.props;
        const checkStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginRight: '0',
        };
        return (
            <>
                <div className={styles.filterAirports}>
                    <Collapse 
                        bordered={false} 
                            defaultActiveKey={['1']} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0}
                        />}>
                        <Panel header="فرودگاه ها" key="1">
                            <div className={styles.subjectAirports}>{t("flight-from")} اصفهان</div>
                            <Row>
                                <Col flex="auto" style={checkStyle}>
                                    <Checkbox>{t("airport")} شهید بهشتی</Checkbox>
                                </Col>
                            </Row>
                            <div className={styles.subjectAirports}>{t("flight-to")} تهران</div>
                            <Row>
                                <Col flex="auto" style={checkStyle}>
                                    <Checkbox>{t("airport")} مهرآباد</Checkbox>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </div>
            </>
        )
    }
}

FilterAirports.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterAirports.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterAirports)