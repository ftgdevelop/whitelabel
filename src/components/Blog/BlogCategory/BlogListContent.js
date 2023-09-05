import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd';

import styles from '../../../styles/Blog.module.css'
import { ArrowRightIcon } from '../../UI/Icons'

const BlogListContent = (props) => {
    // const { t } = props;
    const { blogPosts } = props;

    let postList = (
        blogPosts ?
        blogPosts.map((post, index) =>
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
                            <Skeleton.Image className={styles.itemPostImageSmallSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <h2>
                                <Skeleton.Button active size="medium" className={styles.postSmallTitleSkeleton} />
                            </h2>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSmallSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <h2>
                                <Skeleton.Button active size="medium" className={styles.postSmallTitleSkeleton} />
                            </h2>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSmallSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <h2>
                                <Skeleton.Button active size="medium" className={styles.postSmallTitleSkeleton} />
                            </h2>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSmallSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <h2>
                                <Skeleton.Button active size="medium" className={styles.postSmallTitleSkeleton} />
                            </h2>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.itemPost}>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <a href="#" className={styles.itemPostImage}>
                            <Skeleton.Image className={styles.itemPostImageSmallSkeleton} />
                        </a>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.itemPostContent}>
                            <Skeleton.Input active size="small" className={styles.categoryNameSkeleton} />
                            <h2>
                                <Skeleton.Button active size="medium" className={styles.postSmallTitleSkeleton} />
                            </h2>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
    
    return (
        <>
            <div className={styles.listLatestPost}>
                {postList}
            </div>
        </>
    )
}

BlogListContent.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogListContent.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogListContent)
