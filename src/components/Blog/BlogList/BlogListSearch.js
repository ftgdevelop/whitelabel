import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation, Router } from '../../../../i18n'
import { Input } from 'antd';

import styles from '../../../styles/Blog.module.css'

const BlogListSearch = (props) => {
    // const { t } = props;
    const { setBlogSearchPosts } = props;
    const { Search } = Input;

    const onSearch = value => {
        setBlogSearchPosts(value);
        Router.push(`/blog-search/${value}`);
    }
    
    return (
        <>
            <div className={styles.blogListSearch}>
                <div className={styles.subject}>
                    <h4>جستجو</h4>
                </div>
                <div className={styles.searchPost}>
                    <Search size="large" placeholder="جستجوی مطلب ..." onSearch={onSearch} style={{ width: "100%" }} enterButton />
                </div>
            </div>
        </>
    )
}

BlogListSearch.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

BlogListSearch.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogListSearch)