import React, { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd';

import styles from '../../../styles/Blog.module.css'
import { ArrowRightIcon } from '../../UI/Icons'

const BlogLatestListPost = (props) => {
    // const { t } = props;
    const { blogLatestPosts } = props;
    let postList = (
        blogLatestPosts ?
        blogLatestPosts.slice(0, 10).map((post, index) =>
            <div className={styles.itemPost} key={index}>
                <Row gutter={[20,0]} >
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Link as={`/blog/${post.slug}`} href={`/blog/${post.slug}`}>
                            <a className={styles.itemPostImage}>
                                <img src={post.images.large} alt="" />
                            </a>
                        </Link>
                    </Col>
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
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
                            <p>{post.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '').replace('[&hellip;]','...')}</p>
                            <div className={styles.botomItemPost}>
                                <div className={styles.dateItemPost}>
                                    <span>{post.date}</span>
                                    <span>{post.time_read ? post.time_read : post.acf.time_read}</span>
                                </div>
                                <Link as={`/blog/${post.slug}`} href={`/blog/${post.slug}`}>
                                    <a className={styles.moreItemPost}>
                                        <span>ادامه مطلب</span>
                                        <div className={styles.iconMore}>
                                            <ArrowRightIcon/>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
        :
        <>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <Skeleton active className={styles.postTitleSkeleton} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <Skeleton active className={styles.postTitleSkeleton} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <Skeleton active className={styles.postTitleSkeleton} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <Skeleton active className={styles.postTitleSkeleton} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )

    return (
        <>
            <div className={styles.container}>
                <div className={styles.blogLatestListPost}>
                    <div className={styles.subject}>
                        <h2>جدیدترین مطالب</h2>
                    </div>
                    <div className={styles.listLatestPost}>
                        {postList}
                        <Link as="/blog-list" href="/blog-list">
                            <a className={styles.morePost}>
                                مشاهده مطالب بیشتر
                                <ArrowRightIcon/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

BlogLatestListPost.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogLatestListPost.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogLatestListPost)
