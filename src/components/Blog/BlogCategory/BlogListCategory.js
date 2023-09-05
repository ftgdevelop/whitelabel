import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Skeleton } from 'antd';

import styles from '../../../styles/Blog.module.css'
import { ArrowRightIcon } from '../../UI/Icons'

const BlogListCategory = (props) => {
    // const { t } = props;
    const { category } = props;

    let categoryList = (
        category ?
        category.map((cat, index) =>
            <li key={index}>
                <Link as={`/blog/category/${cat.id}`} href={`/blog/category/${cat.id}`}>
                    <a>
                        {cat.name}
                    </a>
                </Link>
            </li>
        )
        :
        <>
            <li>
                <Skeleton.Input active size="small" className={styles.listCategorySkeleton} />
            </li>
            <li>
                <Skeleton.Input active size="small" className={styles.listCategorySkeleton} />
            </li>
            <li>
                <Skeleton.Input active size="small" className={styles.listCategorySkeleton} />
            </li>
            <li>
                <Skeleton.Input active size="small" className={styles.listCategorySkeleton} />
            </li>
        </>
    )
    
    return (
        <>
            <div className={styles.blogListCategory}>
                <div className={styles.subject}>
                    <h4>دسته بندی</h4>
                </div>
                <div className={styles.listCategory}>
                    <ul>
                        {categoryList}
                    </ul>
                </div>
            </div>
        </>
    )
}

BlogListCategory.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogListCategory.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogListCategory)
