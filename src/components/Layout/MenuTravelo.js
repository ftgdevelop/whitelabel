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
            <Link as="/hotels-home" href="/hotels-home">
              <a title={t('domestic-hotels')}>
                <HotelIcon />
                <span className='margin-start-10'>{t('domestic-hotels')}</span>
              </a>
            </Link>
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
            <Link as="/blog" href="/blog">
               <a title={t('blog')}>
                   <BlogIcon/>
                   <span className='margin-start-10'>{t('blog')}</span>
               </a>
           </Link>
          </li>}
          <li>
            <Link as="/organizational-reservation" href="/organizational-reservation">
              <a title={t('organizational-reservation')}>
                <span>{t('organizational-reservation')}</span>
              </a>
            </Link>
          </li>
          <li>
            <Link as="/contact" href="/contact">
              <a title={t('contact-us')}>
                <span>{t('contact-us')}</span>
              </a>
            </Link>
          </li>
          <li>
            <Link as="/faq" href="/faq">
              <a title={t('faq')}>
                <span>{t('faq')}</span>
              </a>
           </Link>
          </li>
          <li>
            <Link as="/terms" href="/terms">
              <a title={t('rules-regulations')}>
                <span>{t('rules-regulations')}</span>
              </a>
            </Link>
          </li>
          <li>
            <Link as="/about" href="/about">
              <a title={t('about-us')} >
                <span>{t('about-us')}</span>
              </a>
           </Link>
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
    
    
