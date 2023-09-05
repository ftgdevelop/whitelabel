import React, { useState} from 'react'
import PropTypes from 'prop-types'
import {  withTranslation } from '../../../../i18n'
import { Tabs, Tab, TabPanel, TabList } from 'react-re-super-tabs'
import { Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { connect } from "react-redux";

import CustomTab from '../../UI/CustomTab/CustomTab'
import AddCredit from './AddCredit'
import TransactionList from './TransactionList'

const { Panel } = Collapse;

const Wallet = props => {
    const [activeTab, setActiveTab] = useState('increase-credit');    
    const { t } = props;


    return (
        <>
            <div>
                <Tabs activeTab={activeTab}>
                    <TabList>
                        <Tab component={CustomTab} label={<div>{t('charge-credit')}</div>} id='increase-credit'/>
                        <Tab component={CustomTab} label={<div>{t('transaction')}</div>} id='transactions'/>
                        <Tab component={CustomTab} label={<div>{t('faq')}</div>} id='faq'/>
                    </TabList>
                    <TabList>
                        <TabPanel component={() => <div>
                           <AddCredit />
                        </div>} id='increase-credit'/>
                        <TabPanel component={() => <div>
                           <TransactionList />
                        </div>} id='transactions'/>
                        <TabPanel component={() => <div>
                            <Collapse
                                bordered={false}
                                // defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                                className="site-collapse-custom-collapse"
                            >
                                <Panel header={t('pq1')} key="1" className="site-collapse-custom-panel">
                                    <p>{t('pq1-desc')}</p>
                                </Panel>
                                <Panel header={t('pq2')} key="2" className="site-collapse-custom-panel">
                                    <p>{t('pq2-desc')}</p>
                                </Panel>
                                <Panel header={t('pq3')} key="3" className="site-collapse-custom-panel">
                                    <p>{t('pq3-desc')}</p>
                                </Panel>
                                <Panel header={t('pq4')} key="4" className="site-collapse-custom-panel">
                                    <p>{t('pq4-desc')}</p>
                                </Panel>
                                <Panel header={t('pq5')} key="5" className="site-collapse-custom-panel">
                                    <p>{t('pq5-desc')}</p>
                                </Panel>
                                <Panel header={t('pq6')} key="6" className="site-collapse-custom-panel">
                                    <p>{t('pq6-desc')}</p>
                                </Panel>
                            </Collapse>
                            <br/>
                        </div>} id='faq'/>
                    </TabList>
                </Tabs>
            </div>
        </>
    )
}

Wallet.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Wallet.propTypes = {
t: PropTypes.func.isRequired,
}
  
const mapStateToProp = (state) => {
    return {
      creditAmount: state.creditAmount
    };
};
export default withTranslation('common')(connect(mapStateToProp, null)(Wallet))
