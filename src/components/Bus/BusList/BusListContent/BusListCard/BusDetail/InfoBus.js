import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../../../i18n'
import { Row, Col, Spin } from 'antd'
import DatePersion from '../../../../../UI/DatePersion/DatePersion'
import Time from '../../../../../UI/Time/Time'
import styles from '../../../../../../styles/Bus.module.css'
import { isValidElement } from 'react'
import Column from 'antd/lib/table/Column'
import { LoadingOutlined } from '@ant-design/icons'
import { ArrowRightIcon } from '../../../../../UI/Icons'

const antIcon = (
  <LoadingOutlined
    style={{ 'font-size': '20px', 'margin-bottom': '15px' }}
    spin
  />
)

const InfoBus = (props) => {
  const { handelSeats, readOnly, loading, data, selectBus, t, loadingValidate, token } = props
  const [selectedSeats, setSelectedSeat] = useState([])

  const handelSelectSeat = (numberSeat, status) => {
    if (status === 'Empty') {
      if (selectedSeats.includes(numberSeat)) {
        const selected = selectedSeats.filter((item) => +item !== +numberSeat)
        setSelectedSeat(selected)
      } else {
        setSelectedSeat([...selectedSeats, numberSeat])
      }
    }
  }
  useEffect(() => {
    if (handelSeats) handelSeats(selectedSeats)
  }, [selectedSeats.length])

  return (
    <div className={styles.infoBus}>
      {/* <div className={styles.infoBusRoot}>
        <div className={`${styles.root} ${styles.startRoot}`}>
          <span>تهران پایانه بیهقی</span>
        </div>
        <div className={`${styles.root} ${styles.middleRoot}`}>
          <span>فاصله تا مقصد 439 کیلومتر</span>
        </div>
        <div className={`${styles.root} ${styles.endRoot}`}>
          <span>اصفهان پایانه کاوه</span>
        </div>
      </div> */}
      {/* <div className={styles.infoBusAlert}>
        <span>
          توجه! به دلیل نزدیک بودن زمان حرکت اتوبوس و آغاز فروش حضوری بلیط در
          ترمینال، احتمال تکمیل ظرفیت اتوبوس و از دست رفتن بلیط شما وجود دارد.
          پیشنهاد می‌کنیم ساعت حرکت دیگری را انتخاب کنید. سفرانه در قبال از دست
          رفتن بلیط مسئولیتی ندارد.
        </span>
      </div> */}
      {!loading && data ? (
        <div className={styles.infoBusCabin}>
          <div
            className={`${styles.contentCabin} ${
              readOnly ? styles.contentCabinReadOnly : ''
            }`}
          >
            <div className={`${styles.wrapperCabin} ${styles.wrapperCabinEnd}`}>
              <svg
                width="24px"
                viewBox="0 0 24 222"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="bevel"
                >
                  <g
                    transform="translate(-783.000000, -671.000000)"
                    stroke="#D2D2D2"
                    stroke-width="2"
                  >
                    <g transform="translate(200.000000, 569.000000)">
                      <g transform="translate(86.000000, 101.000000)">
                        <path
                          d="M618.573733,104.560377 C618.546093,114.034824 610.872403,121.708513 601.397956,121.736153 C539.635141,122.852926 477.872325,122.852926 416.109509,121.736153 C406.635062,121.708513 398.961372,114.034824 398.933733,104.560377 L398.933733,101.066267"
                          transform="translate(508.753733, 111.820000) rotate(-90.000000) translate(-508.753733, -111.820000) "
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className={styles.wrapperCabinMiddle}>
              {[...Array(data.columns).keys()].map((column) => (
                <div key={column} className={styles.rowCabin}>
                  <ol>
                    {[...Array(data.rows).keys()].map((row) => {
                      const selected = selectedSeats.includes(
                        data.seats[row][column].number,
                      )
                      if (selected) data.seats[row][column].selected = true
                      else data.seats[row][column].selected = false
                      return (
                        <li key={row}>
                          {data.seats[row][column].status === 'Aisle' && (
                            <div
                              className={`${styles.seatItem} ${styles.seatNone}`}
                            >
                              <small></small>
                            </div>
                          )}
                          {data.seats[row][column].status !== 'Aisle' &&
                            +data.seats[row][column].number > 0 && (
                              <div
                                className={`${styles.seatItem} ${
                                  data.seats[row][column].status !== 'Empty' &&
                                  !data.seats[row][column].selected
                                    ? styles.reserveItem
                                    : ''
                                } ${data.seats[row][column].selected
                                  ? styles.selectedItem
                                  : ''}`}
                                onClick={() =>
                                  handelSelectSeat(
                                    data.seats[row][column].number,
                                    data.seats[row][column].status,
                                  )
                                }
                              >
                                <small>
                                  {data.seats[row][column].status === 'Empty' &&
                                    data.seats[row][column].number}
                                  {/* {data.seats[row][column].selected && 'fff'} */}
                                  {data.seats[row][column].status === 'Man' &&
                                    'آقا'}
                                  {data.seats[row][column].status === 'Woman' &&
                                    'خانم'}
                                </small>
                              </div>
                            )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              ))}
            </div>
            <div
              className={`${styles.wrapperCabin} ${styles.wrapperCabinStart}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="92"
                viewBox="0 0 160 362"
              >
                <g
                  fill="none"
                  fill-rule="evenodd"
                  stroke="#D2D2D2"
                  transform="translate(1 1)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="bevel"
                    stroke-width="3.256"
                    d="M.29264293 39.0955557C.33764492 23.5632631 12.8316601 10.9831102 28.2576013 10.9377979 128.650596 2.68730897 229.544349 2.68730897 329.937345 10.9377979 345.363286 10.9831102 357.857301 23.5632631 357.902303 39.0955557L357.902303 44.8237559M45.9976157 8.05012497C46.7175173 3.96023718 50.7794011.648253109 55.8889467.324126554 60.9984922-2.01677564e-12 65.353019 2.68141059 66.6347951 6.59450208M313.040142 8.05012497C312.32024 3.96023718 308.258356.648253109 303.178075.324126554 298.097794-2.01677564e-12 293.70815 2.68141059 292.426374 6.59450208"
                    transform="rotate(-90 179.928 178.986)"
                  ></path>{' '}
                  <path
                    fill="#D2D2D2"
                    fill-rule="nonzero"
                    stroke-width="1.02"
                    d="M65.8090764,253.319894 C61.7507613,253.377569 57.6350269,254.437015 53.8651755,256.612209 C42.1899151,263.371238 38.1897029,278.3305 44.9214338,290.03727 C51.6723046,301.743355 66.5979084,305.766913 78.2724853,299.009257 C89.9470622,292.250914 93.9664142,277.271741 87.2346832,265.565657 C82.8106618,257.883818 74.8485169,253.512832 66.5979084,253.319894 C66.3285844,253.319894 66.0790839,253.319894 65.8090764,253.319894 Z M65.8090764,254.417103 C66.0790839,254.417103 66.3285844,254.397878 66.5787686,254.417103 C74.4643544,254.590817 82.0614764,258.768177 86.292733,266.103962 C92.7551401,277.308818 88.9087296,291.595198 77.7338374,298.045938 C66.5589453,304.515216 52.3264746,300.683909 45.8832073,289.497592 C39.4208003,278.292049 43.2289312,264.024895 54.4038234,257.555616 C58.0007333,255.475862 61.9243864,254.455554 65.8090764,254.417103 Z M65.5595758,257.748555 C62.3276887,257.844681 59.0582056,258.710501 56.0771862,260.444202 C51.1152005,263.312876 47.8457175,268.011376 46.61462,273.170595 C46.538061,273.57501 47.0186059,273.959514 47.3836287,273.786488 C52.3073349,271.495256 58.8661243,270.08907 66.0790839,270.08907 C73.2913598,270.08907 79.8692891,271.495256 84.7929952,273.786488 C85.158018,273.940976 85.6201068,273.555099 85.5435477,273.170595 C85.1012822,271.341455 84.4088327,269.512315 83.4080961,267.799212 C79.6191049,261.214583 72.6563295,257.574842 65.5595758,257.748555 Z M65.578032,258.846451 C72.2714834,258.672738 78.8685524,262.099629 82.4654623,268.338204 C83.2153312,269.628352 83.7539791,270.994715 84.1579649,272.381675 C79.1959792,270.282696 72.9454768,268.992548 66.0790839,268.992548 C59.2318307,268.992548 52.9997844,270.282696 48.0569385,272.361763 C49.3837348,267.894652 52.2690553,263.909543 56.6158341,261.38761 C59.4430517,259.750722 62.5204535,258.922665 65.578032,258.846451 Z M49.1725138,278.619564 C48.2879829,278.619564 47.403452,278.716377 46.5763405,278.889404 C46.3261563,278.927854 46.1340751,279.197007 46.1532148,279.466846 C46.3842592,282.316295 47.2305105,285.185655 48.7692114,287.82294 C52.0195547,293.483387 57.6165707,296.949415 63.6175726,297.700571 C63.9060363,297.739021 64.1944999,297.508319 64.2327795,297.219254 C64.3100221,296.525774 64.3291619,295.813755 64.3291619,295.10105 C64.3284783,286.031564 57.5776076,278.619564 49.1725138,278.619564 Z M83.0041102,278.619564 C74.5990163,278.619564 67.809866,286.03225 67.809866,295.100363 C67.809866,295.832294 67.8672853,296.544999 67.9636678,297.237793 C68.0026309,297.507632 68.2910946,297.719109 68.5597349,297.699884 C71.137452,297.372369 73.6755224,296.544312 76.0611581,295.158725 C81.9664611,291.750373 85.4854448,285.782323 86.0049529,279.466846 C86.0240926,279.197007 85.8320114,278.927854 85.5626874,278.889404 C84.7348923,278.734229 83.8893246,278.619564 83.0041102,278.619564 Z M49.1725138,279.716774 C56.9432609,279.716774 63.2511827,286.570556 63.2511827,295.099676 C63.2511827,295.562454 63.2129031,296.024546 63.1746236,296.486637 C57.7314093,295.639355 52.6730412,292.463078 49.6920218,287.283261 C48.3454022,284.934354 47.5955333,282.431646 47.3262094,279.909712 C47.9222766,279.8129 48.538167,279.716774 49.1725138,279.716774 Z M83.0041102,279.716774 C83.6193171,279.716774 84.2160678,279.8129 84.8319583,279.909026 C84.1777883,285.684824 80.9459012,291.095343 75.5225103,294.233169 C73.4458451,295.427191 71.2338344,296.159122 69.0026839,296.505862 C68.9452646,296.043084 68.8871617,295.562454 68.8871617,295.099676 C68.8864782,286.571242 75.233363,279.716774 83.0041102,279.716774 Z"
                    transform="rotate(-90 66.076 277.804)"
                  ></path>
                </g>
              </svg>
            </div>

            {readOnly && (
            <button
              className={styles.infoBusCabinBtn}
              onClick={() => selectBus()}
            >
              {loadingValidate === token ? (
                <LoadingOutlined spin />
              ) : (
                <>
                  انتخاب صندلی                  
                </>
              )}
              {/* انتخاب صندلی و خرید */}
            </button>
          )}
          </div>
          <div className={styles.footerCabin}>
            <div className={styles.itemCabin}>
              <div className={styles.seat}></div>
              <span>قابل خرید</span>
            </div>
            <div className={styles.itemCabin}>
              <div className={`${styles.seat} ${styles.selected}`}>
                <small></small>
              </div>
              <span>انتخاب‌شما</span>
            </div>
            <div className={styles.itemCabin}>
              <div className={`${styles.seat} ${styles.reserve}`}>
                <small></small>
              </div>
              <span>انتخاب‌شده </span>
            </div>
          </div>

        </div>
      ) : null}
      {loading && (
        <div className="text-center">
          <Spin indicator={antIcon} />
        </div>
      )}
    </div>
  )
}

InfoBus.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

InfoBus.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(InfoBus)
