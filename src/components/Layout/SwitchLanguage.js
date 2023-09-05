import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { withTranslation } from '../../../i18n'


const SwitchLanguage = (props) => {

    useEffect(() => {
        document.querySelectorAll('.ant-select-selection-search-input').forEach(item => {
            item.removeAttribute('aria-owns');
            item.removeAttribute('aria-controls');
            item.removeAttribute('aria-activedescendant');
            item.removeAttribute('aria-haspopup');
            item.removeAttribute('aria-autocomplete');
            item.setAttribute('aria-hidden', false);
        })
        return () => {
        document.querySelectorAll('.ant-select-selection-search-input').forEach(item => {
            item.removeAttribute('aria-owns');
            item.removeAttribute('aria-controls');
            item.removeAttribute('aria-activedescendant');
            item.removeAttribute('aria-haspopup');
            item.removeAttribute('aria-autocomplete');
            item.setAttribute('aria-hidden', false);
        })
        }
    });

    const { t,i18n } = props;
    const { Option } = Select;
    
    return (
        <Select 
            className='switchLanguage blue'
            defaultValue={i18n.language}
            onChange={value => { i18n.changeLanguage(value) }} >
            {process.env.Languages?.map(item =>
                <Option key={item.value} value={item.value}>
                    {item.title}
                </Option>
            )}
        </Select>
    )
}

SwitchLanguage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SwitchLanguage.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SwitchLanguage)
