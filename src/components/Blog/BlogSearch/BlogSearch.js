import React, { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Breadcrumb, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import styles from '../../../styles/Blog.module.css'
import BlogListContent from './BlogListContent'
import { GetBlogPosts, GetCategories, GetLatestBlogPosts, GetSearchBlogPosts } from '../../../actions/blog/blogActions'
import BlogListCategory from './BlogListCategory'
import BlogPagination from './BlogPagination'
import BlogListLatestPost from './BlogListLatestPost'
import BlogListSearch from './BlogListSearch';
import { useRouter } from 'next/router';
import BlogListPopularHotel from './BlogListPopularHotel';

const BlogSearch = () => {
    // const { t } = props;
    const router = useRouter();
    const [blogPosts, setBlogPosts] = useState("");
    const [category, setCategory] = useState("");
    const [ currentPage,setCurrentPage ] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [blogLatestPosts, setBlogLatestPosts] = useState("");
    const [blogSearchPosts, setBlogSearchPosts] = useState("");
    const [blogSearchListPosts, setBlogSearchListPosts] = useState("");

    useEffect(() => {
        // const getPosts = async () => {
        //     const res = await GetBlogPosts();
        //     if(res.status == 200) {
        //         const data = res.data;
        //         setBlogPosts(data);
        //     } else {
        //         console.log("res.data.error : ", res.data.error);
        //     }
        // }
        // getPosts();

        const getCategory = async () => {
            const res = await GetCategories();
            if(res.status == 200) {
                const data = res.data;
                setCategory(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getCategory();

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
        const title = router.asPath.split("/")[3];
        let encoded = encodeURIComponent(title);
        let decoded = decodeURIComponent(encoded);
        setBlogSearchPosts(decodeURI(decoded))
        const getSearchPosts = async () => {
            const res = await GetSearchBlogPosts(decodeURI(decoded));
            if(res.status == 200) {
                const data = res.data;
                setBlogSearchListPosts(data);
                setBlogPosts(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getSearchPosts();

    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                        {blogSearchPosts ? <span>وبلاگ</span> : <Skeleton.Button active size="small" className={styles.skeletonBlogBreadcrumb} />}
                                    </a>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {blogSearchPosts ? <span>جستجوی "{ blogSearchPosts && blogSearchPosts }"</span> : <Skeleton.Button active size="small" className={styles.skeletonBlogBreadcrumb} />}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className={styles.subjectBlog}>
                    <h1>جستجوی</h1>
                    <h3>{ blogSearchPosts && blogSearchPosts }</h3>
                </div>

                <div className={styles.container}>
                    <Row gutter={[20, 0]}>
                        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                            <BlogListContent
                                blogPosts={currentPosts}
                                />
                            <BlogPagination
                                postsPerPage={postsPerPage}
                                totalPosts={blogPosts.length}
                                paginate={paginate}
                                currentPage={currentPage}
                                />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <div className={styles.stickyAside}>
                                <BlogListCategory 
                                    category={category}
                                    />
                                <BlogListSearch
                                    setBlogSearchPosts={setBlogSearchPosts}
                                    blogSearchListPosts={blogSearchListPosts}
                                />
                                <BlogListLatestPost
                                    blogLatestPosts={blogLatestPosts}
                                />
                                <BlogListPopularHotel />
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

BlogSearch.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogSearch.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogSearch)
