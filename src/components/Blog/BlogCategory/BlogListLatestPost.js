import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Skeleton } from 'antd';

import styles from '../../../styles/Blog.module.css'

const BlogListLatestPost = (props) => {
    // const { t } = props;
    const { blogLatestPosts } = props;
    
    let latestPostList = (
        blogLatestPosts ?
        blogLatestPosts.slice(0, 3).map((post, index) =>
            <li key={index}>
                <Link as={`/blog/${post.slug}`} href={`/blog/${post.slug}`}>
                    <a className={styles.itemPostImage}>
                        <div className={styles.titlePost}>
                            <span>{post.title.rendered}</span>
                        </div>
                        <div className={styles.smallImagePost}>
                            <img src={post.images.medium} alt={post.title.rendered} title={post.title.rendered} />
                        </div>
                    </a>
                </Link>
            </li>
            
        )
        :
        <>
            <li>
                <a>
                    <div className={styles.smallImagePost}><Skeleton.Image className={styles.smallImagePostSkeleton} /></div>
                    <div className={styles.titlePost}><Skeleton.Input active size="small" className={styles.titlePostSkeleton} /></div>
                </a>
            </li>
            <li>
                <a>
                    <div className={styles.smallImagePost}><Skeleton.Image className={styles.smallImagePostSkeleton} /></div>
                    <div className={styles.titlePost}><Skeleton.Input active size="small" className={styles.titlePostSkeleton} /></div>
                </a>
            </li>
            <li>
                <a>
                    <div className={styles.smallImagePost}><Skeleton.Image className={styles.smallImagePostSkeleton} /></div>
                    <div className={styles.titlePost}><Skeleton.Input active size="small" className={styles.titlePostSkeleton} /></div>
                </a>
            </li>
        </>
    )
    
    return (
        <>
            <div className={styles.blogListLatestPost}>
                <div className={styles.subject}>
                    <h4>جدیدترین مطالب</h4>
                </div>
                <div className={styles.listLatestPost}>
                    <ul>
                        {latestPostList}
                    </ul>
                </div>
            </div>
        </>
    )
}

BlogListLatestPost.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogListLatestPost.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogListLatestPost)