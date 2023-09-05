import React from 'react'
import App from 'next/app'
import { appWithTranslation, Router } from '../../i18n'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import { userProfile } from '../actions/user/authActions'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import middleware from '../actions/flight/middleware'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import reducers from '../reducers'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/antd.css'
import '../styles/global.css'
import '../styles/form.css'
import '../styles/style.css'

const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk, middleware)),
)

class MyApp extends App {
  state = {
    user: null,
  }

  getInitialProps = async (appContext) => ({
    ...(await App.getInitialProps(appContext)),
  })

  componentDidMount = async () => {
    await store.dispatch(userProfile())
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <DefaultSeo {...SEO} />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    )
  }
}

export default appWithTranslation(MyApp)
