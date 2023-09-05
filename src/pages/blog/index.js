import PropTypes from 'prop-types'
import { Link, withTranslation, i18n,Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import { useEffect } from 'react'

import styles from '../../styles/Blog.module.css'
import BlogHome from '../../components/Blog/BlogHome/BlogHome'

const BlogHomePage = ({ t }) => {
    useEffect(()=>{
        if(Router && !process.env.MODULES.includes("blog")) {Router.push("/")}
    });
    return(
        (process.env.MODULES.includes("blog")) && <Layout>
        <Head>
            <title>وبلاگ | حرفه‌ای‌ترین شبکه معرفی هتل‌‌های ایران | سفرانه</title>
            <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick.min.css" /> 
            <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick-theme.min.css" />
        </Head>
        <>
            <BlogHome />
        </>
    </Layout>
)}

BlogHomePage.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
})

BlogHomePage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('blog')(BlogHomePage)