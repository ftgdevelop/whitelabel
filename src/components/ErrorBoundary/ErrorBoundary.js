import React from 'react'
import { Button, Result } from 'antd';
import Logo from '../Layout/Logo';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //console.log('ErrorBoundary: ', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="warning"
          title="یک مشکلی در بارگذاری صفحه بوجود آمده است."
          subTitle="لطفا دقایقی دیگر تلاش کنید"
          // extra={}
        />
      )
    }

    return this.props.children
  }
}
export default ErrorBoundary
