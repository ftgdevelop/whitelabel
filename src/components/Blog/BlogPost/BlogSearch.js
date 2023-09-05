import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Skeleton } from 'antd';

import styles from '../../../styles/Blog.module.css'
import { ArrowRightIcon } from '../../UI/Icons'
import TabSearchTravelo from '../../Home/SearchBox/TabSearch/TabSearchTravelo';

const BlogSearch = (props) => {
    const { t, searchBlogFlag } = props;
    
    return (
        <>
            <div className={styles.blogSearch}>
                <div className={styles.subject}>
                    <h4>جستجو</h4>
                </div>
                <div className="content-search-blog">
                    <TabSearchTravelo searchBlogFlag={searchBlogFlag} />
                </div>
            </div>
        </>
    )
}

BlogSearch.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogSearch.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogSearch)