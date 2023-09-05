import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import Image from 'next/image'
import { withTranslation } from '../../../../i18n'

import styles from '../../../styles/Home.module.css'

const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const soTomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 2000)
const dayt = ('0' + (tomorrowDate.getDate() + 1)).slice(-2)
const montht = ('0' + (tomorrowDate.getMonth() + 1)).slice(-2)
const yeart = tomorrowDate.getFullYear()
const dayst = ('0' + (soTomorrowDate.getDate() + 1)).slice(-2)
const monthst = ('0' + (soTomorrowDate.getMonth() + 1)).slice(-2)
const yearst = soTomorrowDate.getFullYear()
const shirazUrl = `/hotels/هتل-های-شیراز`
const tehranUrl = `/hotels/هتل-های-تهران`
const cipEmamUrl = `/cip/فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات`

class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shirazUrl: shirazUrl,
      tehranUrl: tehranUrl,
      cipEmamUrl: cipEmamUrl,
    }
  }

  render() {
    const { t } = this.props
    return (
      <div
        className={`${styles.banner} ${
          process.env.THEME_NAME === 'TRAVELO' && styles.bannerHomeTravelo
        }`}
      >
        <div className={styles.container}>
          {process.env.THEME_NAME === 'TRAVELO' && (
            <>
              <h2>ویژه‌های سفر</h2>
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <a
                    href={this.state.shirazUrl}
                    className={styles.imgLinkBanner1}
                    title={t('big-banner-h4')}
                  >
                    <div className={styles.inspTextCard1}>
                      <h2>{t('big-banner-h4')}</h2>
                      <span>{t('big-banner-span')}</span>
                    </div>
                    <div className={styles.inspBtnCard1}>
                      <span>{t('big-banner-button')}</span>
                    </div>
                    <div className={`unset-img ${styles.inspImgCard1}`}>
                      <Image
                        layout="fill"
                        className="custom-img"
                        src="https://cdn2.safaraneh.com/images/home/shirazhomebanner.jpg"
                        alt={t('big-banner-h4')}
                        title={t('big-banner-h4')}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </a>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <a
                    href={this.state.cipEmamUrl}
                    className={styles.imgLinkBanner2}
                    title={t('small-banner1-h4')}
                  >
                    <div className={styles.inspTextCard2}>
                      <h2>{t('small-banner1-h4')}</h2>
                    </div>
                    <div className={styles.inspBtnCard2}>
                      <span>{t('small-banner1-button')}</span>
                    </div>
                    <div className={`unset-img ${styles.inspImgCard2}`}>
                      <Image
                        layout="fill"
                        className="custom-img"
                        src="https://cdn2.safaraneh.com/images/home/cipemamhomebanner.jpg"
                        alt={t('small-banner1-h4')}
                        title={t('small-banner1-h4')}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </a>
                  <a
                    href={this.state.tehranUrl}
                    className={styles.imgLinkBanner2}
                    title={t('small-banner2-h4')}
                  >
                    <div className={styles.inspTextCard2}>
                      <h2>{t('small-banner2-h4')}</h2>
                      <span>{t('small-banner2-span')}</span>
                    </div>
                    <div className={styles.inspBtnCard2}>
                      <span>{t('small-banner2-button')}</span>
                    </div>
                    <div className={`unset-img ${styles.inspImgCard2}`}>
                      <Image
                        layout="fill"
                        className="custom-img"
                        src="https://cdn2.safaraneh.com/images/home/hotelhomebanner.jpg"
                        alt={t('small-banner2-h4')}
                        title={t('small-banner2-h4')}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </a>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    )
  }
}

Banner.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Banner.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Banner)
