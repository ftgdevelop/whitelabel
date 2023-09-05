import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Skeleton, Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import { HomeOutlined } from '@ant-design/icons'

import styles from '../../../styles/Blog.module.css'
import BlogListContent from './BlogListContent'
import {
  GetBlogPostCategory,
  GetCategories,
  GetBlogPosts,
} from '../../../actions/blog/blogActions'
import BlogListCategory from './BlogListCategory'
import BlogPagination from './BlogPagination'
import BlogListLatestPost from './BlogListLatestPost'
import BlogListPopularHotel from './BlogListPopularHotel'

const BlogCategory = () => {
  // const { t } = props;
  const [blogLatestPosts, setBlogLatestPosts] = useState('')
  const [blogPosts, setBlogPosts] = useState('')
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const router = useRouter()

  useEffect(() => {
    const getPosts = async () => {
      const id = router.query.id[0]
      const res = await GetBlogPostCategory(id)
      if (res.status == 200) {
        const data = res.data
        setBlogPosts(data)
      } else {
        console.log('res.data.error : ', res.data.error)
      }
    }
    getPosts()

    const getCategory = async () => {
      const res = await GetCategories()
      if (res.status == 200) {
        const data = res.data
        setCategory(data)
      } else {
        console.log('res.data.error : ', res.data.error)
      }
    }
    getCategory()

    const getLatestPosts = async () => {
      const res = await GetBlogPosts()
      if (res.status == 200) {
        const data = res.data
        setBlogLatestPosts(data)
      } else {
        console.log('res.data.error : ', res.data.error)
      }
    }
    getLatestPosts()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <div className={styles.blogList}>
        <div className={styles.container}>
          <div className={styles.blogBreadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link as="/" href="/">
                  <a>
                    <HomeOutlined />
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link as={`/blog`} href={`/blog`}>
                  <a className={styles.categoryName}>
                    {blogPosts ? (
                      <span>وبلاگ</span>
                    ) : (
                      <>
                        <Skeleton.Button
                          active
                          size="small"
                          className={styles.skeletonBlogBreadcrumb}
                        />
                      </>
                    )}
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {blogPosts ? (
                  <span>{blogPosts[0].categories_names[0]}</span>
                ) : (
                  <>
                    <Skeleton.Button
                      active
                      size="small"
                      className={styles.skeletonBlogBreadcrumb}
                    />
                  </>
                )}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className={styles.subjectBlog}>
          <h1>
            {blogPosts ? (
              blogPosts[0].categories_names[0]
            ) : (
              <>
                <Skeleton.Input
                  active
                  size="large"
                  className={styles.blogCategoryNameSkeleton}
                />
              </>
            )}
          </h1>
          <h3>حرفه‌ای‌ترین شبکه معرفی هتل‌‌های ایران</h3>
        </div>

        <div className={styles.container}>
          <Row gutter={[20, 0]}>
            <Col sm={24} md={24} lg={18} xl={18}>
              <BlogListContent blogPosts={currentPosts} />
              <BlogPagination
                postsPerPage={postsPerPage}
                totalPosts={blogPosts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div className={styles.stickyAside}>
                <BlogListCategory category={category} />
                <BlogListLatestPost blogLatestPosts={blogLatestPosts} />
                <BlogListPopularHotel />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

BlogCategory.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BlogCategory.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BlogCategory)
