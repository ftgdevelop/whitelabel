import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd'

import styles from '../../../styles/Blog.module.css'

const BlogBestCategories = (props) => {
  // const { t } = props;
  const { bestSmallCategory, bestLargeCategory } = props

  return (
    <>
      <div className={styles.blogBestCategories}>
        <div className={styles.container}>
          <div className={styles.subject}>
            <h2>دسته‌بندی‌های محبوب</h2>
          </div>
          <Row gutter={[20, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={[20, 0]}>
                {bestSmallCategory ? (
                  bestSmallCategory.map((category, index) => (
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index}>
                      <Link
                        as={`/blog/${category.excerpt.rendered.replace(
                          /(<([^>]+)>)/gi,
                          '',
                        )}`}
                        href={`/blog/${category.excerpt.rendered.replace(
                          /(<([^>]+)>)/gi,
                          '',
                        )}`}
                      >
                        <a className={styles.normalItem} key={index}>
                          <div className={styles.normalImage}>
                            <img src={category.images.large} />
                          </div>
                          <div className={styles.subjectCategory}>
                            <h3>{category.title.rendered}</h3>
                          </div>
                          <div className={styles.shadowBox}></div>
                        </a>
                      </Link>
                    </Col>
                  ))
                ) : (
                  <>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <a href="#" className={styles.normalItem}>
                        <div className={styles.normalImage}>
                          <Skeleton.Image
                            className={styles.normalImageSkeleton}
                          />
                        </div>
                      </a>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <a href="#" className={styles.normalItem}>
                        <div className={styles.normalImage}>
                          <Skeleton.Image
                            className={styles.normalImageSkeleton}
                          />
                        </div>
                      </a>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <a href="#" className={styles.normalItem}>
                        <div className={styles.normalImage}>
                          <Skeleton.Image
                            className={styles.normalImageSkeleton}
                          />
                        </div>
                      </a>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <a href="#" className={styles.normalItem}>
                        <div className={styles.normalImage}>
                          <Skeleton.Image
                            className={styles.normalImageSkeleton}
                          />
                        </div>
                      </a>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {bestLargeCategory ? (
                bestLargeCategory.map((category, index) => (
                  <Link
                    key={index}
                    as={`/blog/${category.excerpt.rendered.replace(
                      /(<([^>]+)>)/gi,
                      '',
                    )}`}
                    href={`/blog/${category.excerpt.rendered.replace(
                      /(<([^>]+)>)/gi,
                      '',
                    )}`}
                  >
                    <a className={styles.largeItem} key={index}>
                      <div className={styles.largeImage}>
                        <img src={category.images.large} />
                      </div>
                      <div className={styles.subjectCategory}>
                        <h3>{category.title.rendered}</h3>
                      </div>
                      <div className={styles.shadowBox}></div>
                    </a>
                  </Link>
                ))
              ) : (
                <a href="#" className={styles.largeItem}>
                  <div className={styles.largeImage}>
                    <Skeleton.Image className={styles.largeImageSkeleton} />
                  </div>
                </a>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

BlogBestCategories.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BlogBestCategories.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BlogBestCategories)
