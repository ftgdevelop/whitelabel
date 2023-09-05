import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import BlogSearch from '../../components/Blog/BlogSearch/BlogSearch'

const BlogListPage = ({ t }) => (
    <Layout>
        <Head>
            <title>وبلاگ | حرفه‌ای‌ترین شبکه معرفی هتل‌‌های ایران | سفرانه</title>
        </Head>
        <>
            <BlogSearch />
        </>
    </Layout>
)

BlogListPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

BlogListPage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BlogListPage)