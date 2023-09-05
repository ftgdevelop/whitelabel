import React, { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { useRouter } from 'next/router';
import { Row, Col, Breadcrumb, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head'

import styles from '../../../styles/Blog.module.css'
import { TelegramIcon, TwitterIcon, LinkedinIcon } from '../../UI/Icons'
import { GetBlogPostDetails, GetCategories, GetBlogPosts, GetBlogLastPostCategory, GetCommentsByPostId, PostComment, GetLatestBlogPosts } from '../../../actions/blog/blogActions'
import BlogPostCategory from './BlogPostCategory';
import BlogListLatestPost from './BlogListLatestPost';
import BlogPostCommentList from './BlogPostCommentList';
import BlogPostRelatedPost from './BlogPostRelatedPost';
import BlogPostCommentAdd from './BlogPostCommentAdd';
import BlogListPopularHotel from './BlogListPopularHotel';
import BlogSearch from './BlogSearch';
import BlogFaq from './BlogFaq';

const BlogPost = () => {
    // const { t } = props;
    const [commetnsId, setCommetnsId] = useState("");
    const [commetnsPost, setCommetnsPost] = useState("");
    const [blogRelatedPosts, setBlogRelatedPosts] = useState("");
    const [blogLatestPosts, setBlogLatestPosts] = useState("");
    const [blogPosts, setBlogPosts] = useState("");
    const [category, setCategory] = useState("");
    const [searchBlogFlag, setSearchBlogFlag] = useState("BlogSearch");
    
    const router = useRouter();
    
    useEffect(() => {
        const getPosts = async () => {
            const id = router.query.slug;
            const res = await GetBlogPostDetails(id);
            if(res.status == 200) {
                const data = res.data;
                setBlogPosts(data);
            } else {
                console.log("res.data.error : ", res.data.error);
            }
        }
        getPosts();

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
        if (blogPosts) {
            const getRelatedPosts = async () => {
                const res = await GetBlogLastPostCategory(blogPosts[0].categories);
                if(res.status == 200) {
                    const data = res.data;
                    setBlogRelatedPosts(data);
                } else {
                    console.log("res.data.error : ", res.data.error);
                }
            }
            getRelatedPosts();

            const getCommentsPost = async () => {
                const res = await GetCommentsByPostId(blogPosts[0].id);
                setCommetnsId(blogPosts[0].id)
                if(res.status == 200) {
                    const data = res.data;
                    setCommetnsPost(data);
                } else {
                    console.log("res.data.error : ", res.data.error);
                }
            }
            getCommentsPost();
        }
    }, [blogPosts]);

    return (
        <>
            {
                blogPosts ?
                <div className={styles.container}>
                    <div className={styles.blogPost}>
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
                                        <span>وبلاگ</span>
                                    </a>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link as={`/blog/category/${blogPosts[0].categories}`} href={`/blog/category/${blogPosts[0].categories}`}>
                                    <a className={styles.categoryName}>
                                        <span>{blogPosts[0].categories_names}</span>
                                    </a>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <span>{blogPosts[0].title.rendered}</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.topDetailPost}>
                            <div className={styles.subjectPost}>
                                <Link as={`/blog/category/${blogPosts[0].categories}`} href={`/blog/category/${blogPosts[0].categories}`}>
                                    <a className={styles.categoryName}>
                                        {blogPosts[0].categories_names}
                                    </a>
                                </Link>
                                <h1>{blogPosts[0].title.rendered}</h1>
                            </div>
                            <div className={styles.shadowBox}></div>
                            <img src={blogPosts[0].images.large} />
                        </div>
                        <div className={styles.dateBlogPost}>
                            <div className={styles.box}>
                                <span>{blogPosts[0].date}</span>
                                <span>{blogPosts[0].time_read ? blogPosts[0].time_read : blogPosts[0].acf.time_read}</span>
                            </div>
                        </div>
                        <div className={styles.sharePost}>
                            <ul>
                                <li>
                                    <a href={`whatsapp://send?text=${window.location.href}`} target="__blank">
                                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBzdHlsZT0iZmlsbDojNENBRjUwOyIgZD0iTTI1Ni4wNjQsMGgtMC4xMjhsMCwwQzExNC43ODQsMCwwLDExNC44MTYsMCwyNTZjMCw1NiwxOC4wNDgsMTA3LjkwNCw0OC43MzYsMTUwLjA0OGwtMzEuOTA0LDk1LjEwNAoJbDk4LjQtMzEuNDU2QzE1NS43MTIsNDk2LjUxMiwyMDQsNTEyLDI1Ni4wNjQsNTEyQzM5Ny4yMTYsNTEyLDUxMiwzOTcuMTUyLDUxMiwyNTZTMzk3LjIxNiwwLDI1Ni4wNjQsMHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZBRkFGQTsiIGQ9Ik00MDUuMDI0LDM2MS41MDRjLTYuMTc2LDE3LjQ0LTMwLjY4OCwzMS45MDQtNTAuMjQsMzYuMTI4Yy0xMy4zNzYsMi44NDgtMzAuODQ4LDUuMTItODkuNjY0LTE5LjI2NAoJQzE4OS44ODgsMzQ3LjIsMTQxLjQ0LDI3MC43NTIsMTM3LjY2NCwyNjUuNzkyYy0zLjYxNi00Ljk2LTMwLjQtNDAuNDgtMzAuNC03Ny4yMTZzMTguNjU2LTU0LjYyNCwyNi4xNzYtNjIuMzA0CgljNi4xNzYtNi4zMDQsMTYuMzg0LTkuMTg0LDI2LjE3Ni05LjE4NGMzLjE2OCwwLDYuMDE2LDAuMTYsOC41NzYsMC4yODhjNy41MiwwLjMyLDExLjI5NiwwLjc2OCwxNi4yNTYsMTIuNjQKCWM2LjE3NiwxNC44OCwyMS4yMTYsNTEuNjE2LDIzLjAwOCw1NS4zOTJjMS44MjQsMy43NzYsMy42NDgsOC44OTYsMS4wODgsMTMuODU2Yy0yLjQsNS4xMi00LjUxMiw3LjM5Mi04LjI4OCwxMS43NDQKCWMtMy43NzYsNC4zNTItNy4zNiw3LjY4LTExLjEzNiwxMi4zNTJjLTMuNDU2LDQuMDY0LTcuMzYsOC40MTYtMy4wMDgsMTUuOTM2YzQuMzUyLDcuMzYsMTkuMzkyLDMxLjkwNCw0MS41MzYsNTEuNjE2CgljMjguNTc2LDI1LjQ0LDUxLjc0NCwzMy41NjgsNjAuMDMyLDM3LjAyNGM2LjE3NiwyLjU2LDEzLjUzNiwxLjk1MiwxOC4wNDgtMi44NDhjNS43MjgtNi4xNzYsMTIuOC0xNi40MTYsMjAtMjYuNDk2CgljNS4xMi03LjIzMiwxMS41ODQtOC4xMjgsMTguMzY4LTUuNTY4YzYuOTEyLDIuNCw0My40ODgsMjAuNDgsNTEuMDA4LDI0LjIyNGM3LjUyLDMuNzc2LDEyLjQ4LDUuNTY4LDE0LjMwNCw4LjczNgoJQzQxMS4yLDMyOS4xNTIsNDExLjIsMzQ0LjAzMiw0MDUuMDI0LDM2MS41MDR6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://telegram.me/share/url?url=${window.location.href}`} target="__blank">
                                        <TelegramIcon/>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://www.facebook.com/share.php?v=4&src=bm&u=${window.location.href}`} target="__blank">
                                        <TwitterIcon/>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="__blank">
                                        <LinkedinIcon/>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]=${window.location.href}`} target="__blank">
                                        <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00ODMuNzM4MjgxIDBoLTQ1NS41Yy0xNS41OTc2NTYuMDA3ODEyNS0yOC4yNDIxODcyNSAxMi42NjAxNTYtMjguMjM4MjgxIDI4LjI2MTcxOXY0NTUuNWMuMDA3ODEyNSAxNS41OTc2NTYgMTIuNjYwMTU2IDI4LjI0MjE4NyAyOC4yNjE3MTkgMjguMjM4MjgxaDQ1NS40NzY1NjJjMTUuNjA1NDY5LjAwMzkwNiAyOC4yNTc4MTMtMTIuNjQ0NTMxIDI4LjI2MTcxOS0yOC4yNSAwLS4wMDM5MDYgMC0uMDA3ODEyIDAtLjAxMTcxOXYtNDU1LjVjLS4wMDc4MTItMTUuNTk3NjU2LTEyLjY2MDE1Ni0yOC4yNDIxODcyNS0yOC4yNjE3MTktMjguMjM4Mjgxem0wIDAiIGZpbGw9IiM0MjY3YjIiLz48cGF0aCBkPSJtMzUzLjUgNTEydi0xOThoNjYuNzVsMTAtNzcuNWgtNzYuNzV2LTQ5LjM1OTM3NWMwLTIyLjM4NjcxOSA2LjIxNDg0NC0zNy42NDA2MjUgMzguMzE2NDA2LTM3LjY0MDYyNWg0MC42ODM1OTR2LTY5LjEyODkwNmMtNy4wNzgxMjUtLjk0MTQwNi0zMS4zNjMyODEtMy4wNDY4NzUtNTkuNjIxMDk0LTMuMDQ2ODc1LTU5IDAtOTkuMzc4OTA2IDM2LTk5LjM3ODkwNiAxMDIuMTQwNjI1djU3LjAzNTE1NmgtNjYuNXY3Ny41aDY2LjV2MTk4em0wIDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.contentPost}>
                            <Row gutter={[20,0]}>
                                <Col md={24} lg={18} xl={18}>
                                    <div dangerouslySetInnerHTML = {{__html: blogPosts[0].content.rendered}} className={styles.post} />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6} >
                                    <div className={styles.blogAside}>
                                        <BlogSearch searchBlogFlag={searchBlogFlag} />
                                        <BlogPostCategory category={category} />
                                        <BlogListLatestPost blogLatestPosts={blogLatestPosts} />
                                        <BlogListPopularHotel />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {blogPosts[0].tags_names.length !== 0 ? 
                            <div className={styles.tagsPost}>
                                <span>تگ ها :</span>
                                <ul>
                                    {
                                        blogPosts[0].tags_names.map((tag, index) =>
                                            <li key={index}>
                                                <a href={"tag/" + blogPosts[0].tags[index]}>#{tag}</a>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div> : null}
                    </div>
                    
                    <BlogPostRelatedPost blogRelatedPosts={blogRelatedPosts}/>

                    <BlogFaq blogPosts={blogPosts}/>

                    <BlogPostCommentList commetnsPost={commetnsPost}/>
                    
                    <BlogPostCommentAdd commetnsId={commetnsId}/>

                </div>
            :
                <div className={styles.container}>
                    <div className={styles.blogPost}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link as="/" href="/">
                                    <a>
                                        <HomeOutlined />
                                    </a>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Skeleton.Button active size="small" className={styles.skeletonBlogBreadcrumb} />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Skeleton.Button active size="small" className={styles.skeletonBlogBreadcrumb} />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Skeleton.Button active size="small" className={styles.skeletonBlogBreadcrumb} />
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.topDetailPost}>
                            <Skeleton.Image className={styles.topDetailPostImageSkeleton} />
                        </div>
                        <div className={styles.dateBlogPost}>
                            <div className={styles.box}>
                                <span>
                                    <Skeleton.Input active size="small" className={styles.postDateSkeleton} />
                                </span>
                                <span>
                                    <Skeleton.Input active size="small" className={styles.postTimeReadinigSkeleton} />
                                </span>
                            </div>
                        </div>
                        <div className={styles.sharePost}>
                            <ul>
                                <li>
                                    <a href="#">
                                        <Skeleton.Input active size="small" className={styles.sharePostSkeleton} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                    <Skeleton.Input active size="small" className={styles.sharePostSkeleton} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                    <Skeleton.Input active size="small" className={styles.sharePostSkeleton} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.contentPost}>
                            <p>
                                <Skeleton active className={styles.contentPostSkeleton} />
                            </p>
                        </div>
                    </div>
                </div>
            } 
        </>
    )
}

BlogPost.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
})
  
BlogPost.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('blog')(BlogPost)