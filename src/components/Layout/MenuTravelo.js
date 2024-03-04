import React, { useEffect } from 'react'
import { Link,withTranslation,i18n } from '../../../i18n'

import { Dropdown } from 'antd';

import { DownOutlined } from '@ant-design/icons'
import { BlogIcon, HotelIcon, FlightIcon, CipIcon, BusIcon } from '../UI/Icons'

const MenuTravelo = props => {
  useEffect(() => {
        document.querySelectorAll('.ant-dropdown-trigger').forEach(item => {
            item.setAttribute('href',"#");
        })
        return () => {
          document.querySelectorAll('.ant-dropdown-trigger').forEach(item => {
            item.setAttribute('href',"#");
          })
        }
    });
  const { t } = props;
  return (
    <Dropdown
      overlay={
        <ul className={`${i18n.language === "us" ? "ltr" : "rtl"} ant-dropdown-menu-travelo`}>
          {process.env.MODULES.includes("domesticHotel") && <li>
          {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}
            <a title={t('domestic-hotels')} href={process.env.NEW_5_URL} >
              <HotelIcon />
              <span className='margin-start-10'>{t('domestic-hotels')}</span>
            </a>
          </li>}
          {process.env.MODULES.includes("domesticFlight") && <li>
            <Link as="/flights-home" href="/flights-home">
              <a title={t('domestic-flight')}>
                <FlightIcon />
                <span className='margin-start-10'>{t('domestic-flight')}</span>
              </a>
            </Link>
          </li>}
          {process.env.MODULES.includes("foreignHotel") && <li>
            <Link as="/hotels-foreign-home" href="/hotels-foreign-home">
              <a title={t('foreign-hotels')}>
                <HotelIcon />
                <span className='margin-start-10'>{t('foreign-hotels')}</span>
              </a>
            </Link>
          </li>}
	  {process.env.MODULES.includes("foreignFlight") && <li>
            <Link as="/flights-foreign-home" href="/flights-foreign-home">
              <a title={t('foreign-flight')}>
                <FlightIcon />
                <span className='margin-start-10'>{t('foreign-flight')}</span>
              </a>
            </Link>
          </li>}
          {process.env.MODULES.includes("cip") && <li>
            <Link as="/cip-home" href="/cip-home">
              <a title={t('cip')}>
                <CipIcon />
                <span className='margin-start-10'>{t('cip')}</span>
              </a>
            </Link>
          </li>}
          {process.env.MODULES.includes("bus") && <li>
            <Link as="/bus-home" href="/bus-home">
               <a title={t('bus')}>
                   <BusIcon />
                   <span className='margin-start-10'>{t('bus')}</span>
               </a>
           </Link>
          </li>}
          {process.env.MODULES.includes("blog") && <li>
                      {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}
              <a title={t('blog')} href={`${process.env.NEW_5_URL}/blog`}>
                  <BlogIcon/>
                  <span className='margin-start-10'>{t('blog')}</span>
              </a>
          </li>}
          <li>
                      {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}
              <a title={t('organizational-reservation')} href={`${process.env.NEW_5_URL}/organizational-reservation`}>
                <span>{t('organizational-reservation')}</span>
              </a>
          </li>
          <li>
                      {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}
              <a title={t('contact-us')} href={`${process.env.NEW_5_URL}/contact`}>
                <span>{t('contact-us')}</span>
              </a>
          </li>
          <li>
                      {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}
              <a title={t('faq')} href={`${process.env.NEW_5_URL}/faq`} >
                <span>{t('faq')}</span>
              </a>
   
          </li>
          <li>
                      {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}
              <a title={t('rules-regulations')} href={`${process.env.NEW_5_URL}/terms`} >
                <span>{t('rules-regulations')}</span>
              </a>
          
          </li>
          <li>
                      {/* TODO DELETE process.env.NEW_5_URL
          <Link as="/hotels-home" href="/hotels-home"> */}

              <a title={t('about-us')} href={`${process.env.NEW_5_URL}/about`} >
                <span>{t('about-us')}</span>
              </a>

          </li>
        </ul>
      }
    trigger={['click']}
      className="margin-start-30 hidden-xs blue"
      placement={i18n.language === "us"?"bottomLeft":"bottomRight"}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {t('TravelFacilities')}
          <DownOutlined />
      </a>
    </Dropdown>
  )
}

MenuTravelo.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default (withTranslation('common'))(MenuTravelo);
    
    
