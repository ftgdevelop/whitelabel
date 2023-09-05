import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../i18n'
import { Radio, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons'

const { Panel } = Collapse;

import styles from '../../../../styles/Flight.module.css'


class FilterStops extends React.Component {
    state = {
        value: 1,
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { t } = this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginRight: '0',
        };
        const { value } = this.state;
        return (
            <>
                <div className={styles.filterStops}>
                    <Collapse 
                        bordered={false} 
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0}
                        />}>
                        <Panel header="توقف ها" key="1">
                            <Radio.Group onChange={this.onChange} value={value} style={{ display: 'flow-root' }}>
                                <Radio style={radioStyle} value={1}>
                                    {t("stop-number")}
                                </Radio>
                                <Radio style={radioStyle} value={2} disabled="true">
                                    {t("direct-flight")}
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    {t("stop-less-1")}
                                </Radio>
                                <Radio style={radioStyle} value={4} disabled="true">
                                    {t("2stop-less")}
                                </Radio>
                            </Radio.Group>
                        </Panel>
                    </Collapse>
                </div>
            </>
        )
    }
}

FilterStops.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterStops.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterStops)