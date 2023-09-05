import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import styles from '../../../styles/Home.module.css'

const Title = dynamic(() => import('./Title'))
const TabSearch = dynamic(() => import('./TabSearch/TabSearch'))
const TabSearchTravelo = dynamic(() => import('./TabSearch/TabSearchTravelo'))

class SearchBox extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div 
                className={`${styles.searchBox} ${process.env.THEME_NAME === "TRAVELO" && styles.searchBoxTravelo}`}
                >

                <Title/>

                {process.env.THEME_NAME === "TRAVELO" && <TabSearchTravelo/>}
                {process.env.THEME_NAME === "TAJAWAL" && <TabSearch/>}

                <div className={styles.searchBoxBackground}>
                    <Image
                        layout="fill"
                        title="سفرانه"
                        alt="سفرانه"
                        src="https://cdn2.safaraneh.com/images/home/balon.jpg"
                    />
                </div>

            </div>
        )
    }
}

SearchBox.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SearchBox.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SearchBox)
