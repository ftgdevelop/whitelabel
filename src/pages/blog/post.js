import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'

import styles from '../../styles/Blog.module.css'
import BlogPost from '../../components/Blog/BlogPost/BlogPost'

const BlogPostPage = ({ t }) => (
    <Layout>
        <Head>
            <title>وبلاگ | حرفه‌ای‌ترین شبکه معرفی هتل‌‌های ایران | سفرانه</title>
        </Head>
        <>
            <BlogPost/>
        </>
    </Layout>
)

BlogPostPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

BlogPostPage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BlogPostPage)