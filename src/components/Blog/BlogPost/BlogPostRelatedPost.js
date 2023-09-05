import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd';

import styles from '../../../styles/Blog.module.css'

const BlogPostRelatedPost = (props) => {
    // const { t } = props;
    
    const { blogRelatedPosts } = props;

    let listRelatedPosts = (
        blogRelatedPosts ?
        blogRelatedPosts.slice(0, 3).map((post, index) =>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
                <div className={styles.postRelated}>
                    <Link as={`/blog/${post.slug}`} href={`/blog/${post.slug}`}>
                        <a className={styles.image}>
                            <img src={post.images.medium} alt={post.title.rendered} />
                        </a>
                    </Link>
                    <div className={styles.subjectRelated}>
                        <Link as={`/blog/category/${post.categories[0]}`} href={`/blog/category/${post.categories[0]}`}>
                            <a className={styles.categoryName}>
                                {post.categories_names[0]}
                            </a>
                        </Link>
                        <Link as={`/blog/${post.slug}`} href={`/blog/${post.slug}`}>
                            <a>
                                <h2>{post.title.rendered}</h2>
                            </a>
                        </Link>
                    </div>
                </div>
            </Col>
        )
        : null
    )

    
    return (
        <>
            <div className={styles.blogPostRelatedPost}>
                <div className={styles.subject}>
                    <h2>مطالب مرتبط</h2>
                </div>
                <div className={styles.content}>
                    <Row gutter={[20,20]}>
                        { listRelatedPosts }
                    </Row>
                </div>
            </div>
        </>
    )
}

BlogPostRelatedPost.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogPostRelatedPost.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogPostRelatedPost)