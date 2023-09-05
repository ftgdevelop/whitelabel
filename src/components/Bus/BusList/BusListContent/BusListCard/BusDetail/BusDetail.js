import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../../../i18n'
import { Tabs, Tab, TabPanel, TabList } from 'react-re-super-tabs'
import CustomTab from '../../../../../UI/CustomTab/CustomTab'
import InfoBus from './InfoBus'
import RolesBus from './RolesBus'
import styles from '../../../../../../styles/Flight.module.css'

const BusDetail = (props) => {
  const { loading, data, selectBus, t, loadingValidate, token } = props

  return (
    <>
      <Tabs activeTab="info">
        <TabList>
          <Tab component={CustomTab} label="اطلاعات سفر" id="info" />
          <Tab component={CustomTab} label="قوانین استرداد" id="role" />
        </TabList>
        <TabList className={styles.flightTab}>
          <TabPanel
            component={() =>
              <InfoBus
                readOnly
                loading={loading}
                data={data}
                selectBus={selectBus}
                loadingValidate={loadingValidate}
                token={token}
              />
            }
            id="info"
          />
          <TabPanel component={RolesBus} id="role" />
        </TabList>
      </Tabs>
      {/* <InfoBus flight={flight} /> */}
    </>
  )
}

BusDetail.getInitialProps = async () => ({
  namespacesRequired: ['flights'],
})

BusDetail.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('flights')(BusDetail)
