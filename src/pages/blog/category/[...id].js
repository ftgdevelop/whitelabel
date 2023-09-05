import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'

import BlogCategory from '../../../components/Blog/BlogCategory/BlogCategory'

const BlogCategoryPage = ({ t }) => (
    <Layout>
        <Head>
            <title>وبلاگ | حرفه‌ای‌ترین شبکه معرفی هتل‌‌های ایران | سفرانه</title>
        </Head>
        <>
            <BlogCategory />
        </>
    </Layout>
)

BlogCategoryPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

BlogCategoryPage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BlogCategoryPage)