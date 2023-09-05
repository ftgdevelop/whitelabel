import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'

import styles from '../../../styles/Blog.module.css'

const BlogInstagram = () => {
    // const { t } = props;
    return (
        <>
            <div className={styles.blogInstagram}>
                BlogInstagram
            </div>
        </>
    )
}

BlogInstagram.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogInstagram.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogInstagram)
