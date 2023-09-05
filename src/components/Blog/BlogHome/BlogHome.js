import React, { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Breadcrumb, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import styles from '../../../styles/Blog.module.css'
import BlogCities from './BlogCities'
import BlogBestCategories from './BlogBestCategories'
import BlogLatestListPost from './BlogLatestListPost'
// import BlogInstagram from './BlogInstagram'
import { GetCities, GetBestCategoryLarge, GetBestCategorySmall, GetLatestBlogPosts, GetSearchBlogPosts } from '../../../actions/blog/blogActions'
import BlogListSearch from './BlogListSearch';

const BlogHome = (props) => {
    // const { t } = props;
    const [Cities, setCities] = useState("");
    const [bestLargeCategory, setBestLargeCategory] = useState("");
    const [bestSmallCategory, setBestSmallCategory] = useState("");
    const [blogLatestPosts, setBlogLatestPosts] = useState("");
    const [blogSearchPosts, setBlogSearchPosts] = useState(null);
    const [blogSearchListPosts, setBlogSearchListPosts] = useState(null);

    useEffect(() => {
        const getCity = async () => {
            const res = await GetCities();
            if(res.status == 200) {
                const data = res.data;
                setCities(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getCity();

        const getLargeCategory = async () => {
            const res = await GetBestCategoryLarge();
            if(res.status == 200) {
                const data = res.data;
                setBestLargeCategory(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getLargeCategory();

        const getSmallCategory = async () => {
            const res = await GetBestCategorySmall();
            if(res.status == 200) {
                const data = res.data;
                setBestSmallCategory(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getSmallCategory();

        const getLatestPosts = async () => {
            const res = await GetLatestBlogPosts();
            if(res.status == 200) {
                const data = res.data;
                setBlogLatestPosts(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getLatestPosts();

    }, []);

    useEffect(() => {

        if (blogSearchPosts) {
            const getSearchPosts = async () => {
                const res = await GetSearchBlogPosts(blogSearchPosts);
                if(res.status == 200) {
                    const data = res.data;
                    setBlogSearchListPosts(res.data)
                } else {
                    console.log("res.data.error : ", res.data.error);
                }
            }
            getSearchPosts();
        }

    }, [blogSearchPosts]);

    return (
        <>
            <div className={styles.blogHome}>
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
                                {blogLatestPosts ? <span>وبلاگ</span> : <Skeleton.Button active size="small" className={styles.skeletonBlogBreadcrumb} />}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className={styles.subjectBlog}>
                    <h1>وبلاگ</h1>
                    <h3>حرفه‌ای‌ترین شبکه معرفی هتل‌‌های ایران</h3>
                </div>
                
                <BlogCities Cities={Cities} />

                <BlogBestCategories bestLargeCategory={bestLargeCategory} bestSmallCategory={bestSmallCategory} />
                
                <div className={styles.container}>
                    <BlogListSearch
                        setBlogSearchPosts={setBlogSearchPosts}
                        blogSearchListPosts={blogSearchListPosts}
                    />
                </div>

                <BlogLatestListPost  blogLatestPosts={blogLatestPosts} />

                {/* <BlogInstagram/> */}

            </div>
        </>
    )
}

BlogHome.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
})
  
BlogHome.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('blog')(BlogHome)
