import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Collapse, Row, Col, Button, Form, Input } from 'antd'
// import AnimatedShowMore from "react-animated-show-more";

import styles from '../../../styles/Home.module.css'
import { BookingIcon } from '../../UI/Icons'
import AsideMyAccount from '../AsideMyAccount'
import { RightOutlined } from '@ant-design/icons'
import { getAllOrders, HotelDomesticReserveDetail } from '../../../actions'
import BookingItem from './BookingItems'

const { Panel } = Collapse

const BookingHotel = (props) => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [loading, setLoading] = useState(true)
  const [pendingList, setPendingList] = useState({ items: [], totalCount: 0 })

  const { t } = props

  const getData = async () => {
    setLoading(true)
    const res = await getAllOrders(0, 20, 'Pending')
    if (res.status === 200) {
      const pendingList = res.data.result
      setPendingList(pendingList)
      setLoading(false)
    } else {
      useState({ items: [], totalCount: 0 })
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const numberWithCommas = (x) => {
    if (x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x
    }
    return 0
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={7} xl={8}>
          <div className={styles.asideMobile}>
            <AsideMyAccount />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17} xl={16}>
          <div className={styles.backHomeProfile}>
            <Link as="/myaccount" href="/myaccount">
              <a>
                <RightOutlined />
                {t('return')}
              </a>
            </Link>
          </div>
          <div className={styles.bookingPage}>
            <div className={styles.headBookingPage}>
              <BookingIcon />
              <div className={styles.headBookingPageText}>
                <h2>{t('my-reserves')}</h2>
                <span>{t('visiting-reserves')}</span>
              </div>
            </div>
            <div className={styles.contentBookingPage}>
              <div>
                {/* <div className={styles.myBookingPage}>
                  <div className={styles.listBookingPage}>
                    <div className={styles.myBook}>
                      <div className={styles.subjectMyBook}>
                        {t("waiting-for-pay")}
                      </div>
                      {pendingList.items.map((order, index) => (
                        <>
                          {order.type === "Hotel" && (
                            <div className={styles.contentMyBook} key={index}>
                              <div className={styles.imageMyBook}>
                                <Link
                                  as={`/myaccount/booking/hotelforeign?username=${order.username}&reserveId=${order.id}`}
                                  href={`/myaccount/booking/hotelforeign?username=${order.username}&reserveId=${order.id}`}
                                >
                                  <a>
                                    <span>{t("foreign-hotels")}</span>
                                    <div
                                      className={
                                        styles.hotelDefaultImage
                                      }
                                    >
                                      <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im05Ni4xODUgMzMuMDM0aDIxLjY1MnY4OC40MzJoLTIxLjY1MnoiIGZpbGw9IiNjMWNkZDMiLz48cGF0aCBkPSJtMTE3LjgzNyAxMjIuNDY1aC0yMS42NTFhMSAxIDAgMCAxIC0xLTF2LTg4LjQzMWExIDEgMCAwIDEgMS0xaDIxLjY1MWExIDEgMCAwIDEgMSAxdjg4LjQzMmExIDEgMCAwIDEgLTEgLjk5OXptLTIwLjY1MS0yaDE5LjY1MXYtODYuNDMxaC0xOS42NTF6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTEwLjE2MyAzMy4wMzRoMjEuNjUydjg4LjQzMmgtMjEuNjUyeiIgZmlsbD0iI2MxY2RkMyIvPjxwYXRoIGQ9Im0zMS44MTQgMTIyLjQ2NWgtMjEuNjUxYTEgMSAwIDAgMSAtMS0xdi04OC40MzFhMSAxIDAgMCAxIDEtMWgyMS42NTFhMSAxIDAgMCAxIDEgMXY4OC40MzJhMSAxIDAgMCAxIC0xIC45OTl6bS0yMC42NTEtMmgxOS42NTF2LTg2LjQzMWgtMTkuNjUxeiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0yOC40OTMgNi41MzVoNzEuMDE0djExNC45MzFoLTcxLjAxNHoiIGZpbGw9IiNkOWUyZTkiLz48cGF0aCBkPSJtOTkuNTA3IDEyMi40NjVoLTcxLjAxNGExIDEgMCAwIDEgLTEtMXYtMTE0LjkzYTEgMSAwIDAgMSAxLTFoNzEuMDE0YTEgMSAwIDAgMSAxIDF2MTE0LjkzYTEgMSAwIDAgMSAtMSAxem0tNzAuMDE0LTJoNjkuMDE0di0xMTIuOTNoLTY5LjAxNHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDE1LjU2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgMjcuNjA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTM4LjY1NCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgNDUuODc0aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTY5LjUyMiA0NS44NzRoLTExLjA0NGExIDEgMCAwIDEgLTEtMXYtMTEuMDQ0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDQ0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ1LTJoOS4wNDV2LTkuMDQ0aC05LjA0NHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtNzguMzAyIDMzLjgzaDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtODkuMzQ2IDQ1Ljg3NGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDQtMmg5LjA0NHYtOS4wNDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0zOC42NTQgNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNDkuNyA2NC4xNGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ0LTJoOS4wNDR2LTkuMDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im01OC40NzggNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNjkuNTIyIDY0LjE0aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDUtMmg5LjA0NXYtOS4wNGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA1Mi4wOTZoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgNjQuMTRoLTExLjA0NmExIDEgMCAwIDEgLTEtMXYtMTEuMDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0aC05LjA0NnoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDcwLjM2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgODIuNDA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTUzLjEgOTYuMDdoMjEuOHYyNS4zOTVoLTIxLjh6IiBmaWxsPSIjOTI5N2FiIi8+PHBhdGggZD0ibTc0LjkgMTIyLjQ2NWgtMjEuOGExIDEgMCAwIDEgLTEtMXYtMjUuMzk1YTEgMSAwIDAgMSAxLTFoMjEuOGExIDEgMCAwIDEgMSAxdjI1LjRhMSAxIDAgMCAxIC0xIC45OTV6bS0yMC44LTJoMTkuOHYtMjMuMzk1aC0xOS44eiIgZmlsbD0iIzJmM2E1YSIvPjxnIGZpbGw9IiM4NDg3OWMiPjxwYXRoIGQ9Im0xMDUuNzA0IDQzLjE0Nmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgNTUuODk1aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTA1LjcwNCA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDgxLjM5Mmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgOTQuMTRoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgNDMuMTQ2aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDU1Ljg5NWg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTE2LjUyNSA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgODEuMzkyaDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDk0LjE0aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjwvZz48cGF0aCBkPSJtMTI3IDEyMi40NjVoLTEyNmExIDEgMCAwIDEgMC0yaDEyNmExIDEgMCAwIDEgMCAyeiIgZmlsbD0iIzJmM2E1YSIvPjwvc3ZnPg==" />
                                    </div>
                                  </a>
                                </Link>
                              </div>
                              <div className={styles.detailMyBook}>
                                <div>
                                  <Link
                                    as={`/myaccount/booking/hotelforeign?username=${order.username}&reserveId=${order.id}`}
                                    href={`/myaccount/booking/hotelforeign?username=${order.username}&reserveId=${order.id}`}
                                  >
                                    <a>{t("foreign-hotels")}</a>
                                  </Link>
                                  <div className={styles.dateMyBook}>
                                    <DatePersion
                                      date={order.departureDate}
                                    />
                                    {order.returnDate ? (
                                      <>
                                        -
                                        <DatePersion
                                          date={order.returnDate}
                                        />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <Link
                                    as="/hotel/payment"
                                    href="/hotel/payment"
                                  >
                                    <a>
                                      <button>
                                        {t("parsian-hotel-pay", {
                                          number: numberWithCommas(
                                            order.salePrice
                                          ),
                                        })}
                                      </button>
                                    </a>
                                  </Link>
                                </div>
                                <div>
                                  <Link
                                    as={`/myaccount/booking/hotelforeign?username=${order.username}&reserveId=${order.id}`}
                                    href={`/myaccount/booking/hotelforeign?username=${order.username}&reserveId=${order.id}`}
                                  >
                                    <a className={styles.linkMyBook}>
                                      <ArrowRightIcon />
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                          {order.type === "HotelDomestic" && (
                            <div className={styles.contentMyBook} key={index}>
                              <div className={styles.imageMyBook}>
                                <Link
                                  as={`/myaccount/booking/hotel?username=${order.username}&reserveId=${order.id}`}
                                  href={`/myaccount/booking/hotel?username=${order.username}&reserveId=${order.id}`}
                                >
                                  <a>
                                    <span>{t("domestic-hotels")}</span>
                                    <div
                                      className={
                                        styles.hotelDefaultImage
                                      }
                                    >
                                      <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im05Ni4xODUgMzMuMDM0aDIxLjY1MnY4OC40MzJoLTIxLjY1MnoiIGZpbGw9IiNjMWNkZDMiLz48cGF0aCBkPSJtMTE3LjgzNyAxMjIuNDY1aC0yMS42NTFhMSAxIDAgMCAxIC0xLTF2LTg4LjQzMWExIDEgMCAwIDEgMS0xaDIxLjY1MWExIDEgMCAwIDEgMSAxdjg4LjQzMmExIDEgMCAwIDEgLTEgLjk5OXptLTIwLjY1MS0yaDE5LjY1MXYtODYuNDMxaC0xOS42NTF6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTEwLjE2MyAzMy4wMzRoMjEuNjUydjg4LjQzMmgtMjEuNjUyeiIgZmlsbD0iI2MxY2RkMyIvPjxwYXRoIGQ9Im0zMS44MTQgMTIyLjQ2NWgtMjEuNjUxYTEgMSAwIDAgMSAtMS0xdi04OC40MzFhMSAxIDAgMCAxIDEtMWgyMS42NTFhMSAxIDAgMCAxIDEgMXY4OC40MzJhMSAxIDAgMCAxIC0xIC45OTl6bS0yMC42NTEtMmgxOS42NTF2LTg2LjQzMWgtMTkuNjUxeiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0yOC40OTMgNi41MzVoNzEuMDE0djExNC45MzFoLTcxLjAxNHoiIGZpbGw9IiNkOWUyZTkiLz48cGF0aCBkPSJtOTkuNTA3IDEyMi40NjVoLTcxLjAxNGExIDEgMCAwIDEgLTEtMXYtMTE0LjkzYTEgMSAwIDAgMSAxLTFoNzEuMDE0YTEgMSAwIDAgMSAxIDF2MTE0LjkzYTEgMSAwIDAgMSAtMSAxem0tNzAuMDE0LTJoNjkuMDE0di0xMTIuOTNoLTY5LjAxNHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDE1LjU2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgMjcuNjA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTM4LjY1NCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgNDUuODc0aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTY5LjUyMiA0NS44NzRoLTExLjA0NGExIDEgMCAwIDEgLTEtMXYtMTEuMDQ0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDQ0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ1LTJoOS4wNDV2LTkuMDQ0aC05LjA0NHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtNzguMzAyIDMzLjgzaDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtODkuMzQ2IDQ1Ljg3NGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDQtMmg5LjA0NHYtOS4wNDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0zOC42NTQgNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNDkuNyA2NC4xNGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ0LTJoOS4wNDR2LTkuMDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im01OC40NzggNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNjkuNTIyIDY0LjE0aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDUtMmg5LjA0NXYtOS4wNGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA1Mi4wOTZoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgNjQuMTRoLTExLjA0NmExIDEgMCAwIDEgLTEtMXYtMTEuMDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0aC05LjA0NnoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDcwLjM2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgODIuNDA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTUzLjEgOTYuMDdoMjEuOHYyNS4zOTVoLTIxLjh6IiBmaWxsPSIjOTI5N2FiIi8+PHBhdGggZD0ibTc0LjkgMTIyLjQ2NWgtMjEuOGExIDEgMCAwIDEgLTEtMXYtMjUuMzk1YTEgMSAwIDAgMSAxLTFoMjEuOGExIDEgMCAwIDEgMSAxdjI1LjRhMSAxIDAgMCAxIC0xIC45OTV6bS0yMC44LTJoMTkuOHYtMjMuMzk1aC0xOS44eiIgZmlsbD0iIzJmM2E1YSIvPjxnIGZpbGw9IiM4NDg3OWMiPjxwYXRoIGQ9Im0xMDUuNzA0IDQzLjE0Nmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgNTUuODk1aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTA1LjcwNCA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDgxLjM5Mmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgOTQuMTRoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgNDMuMTQ2aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDU1Ljg5NWg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTE2LjUyNSA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgODEuMzkyaDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDk0LjE0aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjwvZz48cGF0aCBkPSJtMTI3IDEyMi40NjVoLTEyNmExIDEgMCAwIDEgMC0yaDEyNmExIDEgMCAwIDEgMCAyeiIgZmlsbD0iIzJmM2E1YSIvPjwvc3ZnPg==" />
                                    </div>
                                  </a>
                                </Link>
                              </div>
                              <div className={styles.detailMyBook}>
                                <div>
                                  <Link
                                    as={`/myaccount/booking/hotel?username=${order.username}&reserveId=${order.id}`}
                                    href={`/myaccount/booking/hotel?username=${order.username}&reserveId=${order.id}`}
                                  >
                                    <a>{t("domestic-hotels")}</a>
                                  </Link>
                                  <div className={styles.dateMyBook}>
                                    <DatePersion
                                      date={order.departureDate}
                                    />
                                    {order.returnDate ? (
                                      <>
                                        -
                                        <DatePersion
                                          date={order.returnDate}
                                        />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <Link
                                    as="/hotel/payment"
                                    href="/hotel/payment"
                                  >
                                    <a>
                                      <button>
                                        {t("parsian-hotel-pay", {
                                          number: numberWithCommas(
                                            order.salePrice
                                          ),
                                        })}
                                      </button>
                                    </a>
                                  </Link>
                                </div>
                                <div>
                                  <Link
                                    as={`/myaccount/booking/hotel?username=${order.username}&reserveId=${order.id}`}
                                    href={`/myaccount/booking/hotel?username=${order.username}&reserveId=${order.id}`}
                                  >
                                    <a className={styles.linkMyBook}>
                                      <ArrowRightIcon />
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                          {order.type === "FlightDomestic" && (
                            <div className={styles.contentMyBook}>
                              <div className={styles.imageMyBook}>
                                <Link
                                  as={`/myaccount/booking/flight?username=${order.username}&reserveId=${order.id}`}
                                  href={`/myaccount/booking/flight?username=${order.username}&reserveId=${order.id}`}
                                >
                                  <a>
                                    <div
                                      className={styles.flightMyBook}
                                    >
                                      <div className={styles.top}>
                                        <div className={styles.city}>
                                          {t("domestic-flight")}
                                        </div>
                                      </div>
                                      <div className={styles.bottom}>
                                        {order.returnDate
                                          ? t("round-trip")
                                          : t("one-way")}
                                      </div>
                                    </div>
                                    <img
                                      src="/images/flight.jpg"
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className={styles.detailMyBook}>
                                <div>
                                  <Link
                                    as={`/myaccount/booking/flight?username=${order.username}&reserveId=${order.id}`}
                                    href={`/myaccount/booking/flight?username=${order.username}&reserveId=${order.id}`}
                                  >
                                    <a>{t("domestic-flight")}</a>
                                  </Link>
                                  <div className={styles.dateMyBook}>
                                    <DatePersion
                                      date={order.departureDate}
                                    />
                                    {order.returnDate ? (
                                      <>
                                        -
                                        <DatePersion
                                          date={order.returnDate}
                                        />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <Link
                                    as="/hotel/payment"
                                    href="/hotel/payment"
                                  >
                                    <a>
                                      <button>
                                        {t("parsian-hotel-pay", {
                                          number: numberWithCommas(
                                            order.salePrice
                                          ),
                                        })}
                                      </button>
                                    </a>
                                  </Link>
                                </div>
                                <div>
                                  <Link
                                    as={`/myaccount/booking/flight?username=${order.username}&reserveId=${order.id}`}
                                    href={`/myaccount/booking/flight?username=${order.username}&reserveId=${order.id}`}
                                  >
                                    <a className={styles.linkMyBook}>
                                      <ArrowRightIcon />
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>

              <div className={styles.myBookList}>
                <>
                  {/* <h3>جستجو سفارش</h3>
                <Form
                    layout="vertical"
                    className={styles.walletSearch}
                    >
                    <Row gutter={[20, 20]}>
                        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                            <Form.Item label={t('order-no')} tooltip={t('order-no-desc')}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Form.Item label={t('from-date')}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Form.Item label={t("to-date")}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>
                            <Form.Item>
                                <Button type="button" className="ant-btn-secondary">
                                    {t('search')}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form> */}
                </>

                <div className={styles.headMyBook}>
                  <div className={styles.headItem}>
                    <span>شماره سفارش</span>
                  </div>
                  <div className={styles.headItem}>
                    <span>نوع سفارش</span>
                  </div>
                  <div className={styles.headItem}>
                    <span>تاریخ و ساعت</span>
                  </div>
                  <div className={styles.headItem}>
                    <span>مبلغ کل (ریال)</span>
                  </div>
                  <div className={styles.headItem}>
                    <span>وضعیت</span>
                  </div>
                </div>

                <div className={styles.contentMyBook}>
                  <BookingItem pendingList={pendingList} />
                </div>
              </div>

              {/* <div>
                <div className={styles.noReserveContentBookingPage}>
                  <VerifyUserIcon />
                  <div className={styles.subjectNoReserve}>
                    {t("please-confirm-registration")}
                  </div>
                  <div className={styles.contentNoReserve}>
                    {t("please-confirm-registration-desc")}
                  </div>
                  <Link
                    as="/myaccount/profile"
                    href="myaccount/profile"
                  >
                    <a>
                      <Button>{t("confirm-profile")}</Button>
                    </a>
                  </Link>
                </div>
              </div>             */}
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

BookingHotel.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BookingHotel.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BookingHotel)
