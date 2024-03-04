import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation } from '../../../../i18n'
import { Skeleton } from 'antd'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import { GetFourBlogPosts } from '../../../actions/blog/blogActions'

const LatestBlogPost = (props) => {
  const [blogLatestPosts, setBlogLatestPosts] = useState('')

  useEffect(() => {
    const getLatestPosts = async () => {
      const res = await GetFourBlogPosts()
      if (res?.status == 200) {
        const data = res.data
        setBlogLatestPosts(data)
      } else {
        console.log('res.data.error : ', res?.data?.error)
      }
    }
    getLatestPosts()
  }, [])

  let latestPostList = blogLatestPosts ? (
    blogLatestPosts.map((post, index) => (
      <li key={index}>
        {/* TODO DELETE process.env.NEW_5_URL
        <Link as={`/blog/${post.slug}`} href={`/blog/${post.slug}`}></Link> */}
          <a className={styles.itemPostImage} title={post.title.rendered} href={`${process.env.NEW_5_URL}/blog/${post.slug}`}>
            {!!post.images?.medium && <div
              className={`unset-img ${styles.smallImagePost}`}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                layout="fill"
                className="custom-img"
                src={post.images.medium}
                alt={post.title.rendered}
                title={post.title.rendered}
              />
            </div>}
            <div className={styles.titlePost}>
              <span>{post.title.rendered}</span>
              <small>{post.date}</small>
            </div>
          </a>
      </li>
    ))
  ) : (
    <>
      <li>
        <a>
          <div className={styles.smallImagePost}>
            <Skeleton.Image className={styles.smallImagePostSkeleton} />
          </div>
          <div className={styles.titlePost}>
            <Skeleton.Input
              active
              size="small"
              className={styles.titlePostSkeleton}
            />
          </div>
        </a>
      </li>
      <li>
        <a>
          <div className={styles.smallImagePost}>
            <Skeleton.Image className={styles.smallImagePostSkeleton} />
          </div>
          <div className={styles.titlePost}>
            <Skeleton.Input
              active
              size="small"
              className={styles.titlePostSkeleton}
            />
          </div>
        </a>
      </li>
      <li>
        <a>
          <div className={styles.smallImagePost}>
            <Skeleton.Image className={styles.smallImagePostSkeleton} />
          </div>
          <div className={styles.titlePost}>
            <Skeleton.Input
              active
              size="small"
              className={styles.titlePostSkeleton}
            />
          </div>
        </a>
      </li>
      <li>
        <a>
          <div className={styles.smallImagePost}>
            <Skeleton.Image className={styles.smallImagePostSkeleton} />
          </div>
          <div className={styles.titlePost}>
            <Skeleton.Input
              active
              size="small"
              className={styles.titlePostSkeleton}
            />
          </div>
        </a>
      </li>
    </>
  )

  return (
    <>
      <div className={styles.LatestBlogPost}>
        <div className={styles.container}>
          <div className={styles.subject}>
            <h2>آخرین مطالب وبلاگ</h2>
          </div>
          <div className={styles.listLatestPost}>
            <ul>{latestPostList && latestPostList}</ul>
          </div>
        </div>
      </div>
    </>
  )
}

LatestBlogPost.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

LatestBlogPost.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(LatestBlogPost)
