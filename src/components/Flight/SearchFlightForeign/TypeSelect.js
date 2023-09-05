import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Select } from 'antd';
import { EnvironmentOutlined, TableOutlined, SearchOutlined } from '@ant-design/icons'

import styles from '../../../styles/Home.module.css'

const { Option } = Select;

const TypeSelect = (props) => {

    const [flightType, setFlightType] = useState(props.defaultValue);
    
    const handleChange = (val) => {
        setFlightType(val)
        props.setValue(val, props.label)
    }

    const { t } = props;
    return (
        <> 
            <Select 
                style={{ 'width' : '100%', 'marginLeft': '5px'}}
                className={styles.typeSelect} 
                size="large"
                value={flightType}
                onChange={handleChange}
                >

                <Option value="">{t('all')}</Option>
                <Option value="Economy" style={{ padding: 5 }}>{t('economy')}</Option>
                <Option value="Business">{t('business')}</Option>
            </Select>
        </>
    )
}

TypeSelect.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
TypeSelect.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(TypeSelect)