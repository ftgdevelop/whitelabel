import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, withTranslation, i18n } from '../../../i18n';
import {useRouter} from 'next/router';
import {activateEmail} from '../../actions/user/authActions'
import { LoadingOutlined } from "@ant-design/icons";

import styles from '../../styles/Home.module.css'


const VerifyEmail = ({ t }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(()=>{
    const callVerify= async()=>{
      let query = window.location.search;
      query = query.replace('?','')
      let string = decodeURI(query),
      object = _.fromPairs(string.split('&').map(s => s.split('=')));
      const res = await activateEmail(object)
      setLoading(false);
      if(res && res.status === 200){
        setMessage(t("account-confirmed"))
        setStatus('success')
      }else{
        setMessage(t("error-in-operation"))
        setStatus('error')
      }
    }
    callVerify()
  },[])
   return(
   <div className={styles.verifyEmail}>
     {
      loading?
        <LoadingOutlined />
      :
        <>
          {
            status === 'success' ?
            <>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAACHCAMAAADEO0y+AAAC91BMVEUAAAAAYnYteo0DeYYBZXkBZ3r///8CZnoDaXwGan8AbH4CZXv///////92rLj///8EZXw+ips4hZb///8NZnsPe5EIboQMZnsxgJIre44Ran4LZnsFZnwGZnwFZnz9/v4jdooKc4gGaH3///////////////8Vh5wLeI2QvccQgJUCZXsCZnwYaoH///////8VboL///////////8FZn0EZXwFZnz///8vfpEVb4NRl6b///////8OZXsNZnwEZXwPZXsNaX8PZ38Ia4Iqeo4YdYq84+kVcIb///////8seIwicof///////8GZXwipbj////o8fP////l7vH///9utME1g5SBs77j8/YZiZ6Cs74/jJyc1t4UaX7///95yNT2+vpItMQDZn3F2+Hr9vgdrAj///8ipLjH3+U5hJbn8/bp9PYEZnv9//4Na4AHaH33+/v2/PUcdYkYcoZVwUX0+fsgd4oVcYQRboIKan4CZXpEuzPx+Pmz09mqzdSCtL8tf5H4/fjt+es0g5X7/vva6u7X6ezU5urQ5enJ4ea+2eBnorD5/Pzl8vTj8PPg8PPC3OG619231NpsprNRlaRMkqLu9facxM2NusVdxE4krxD7/f3c7fHN4+fE3eLh9d+mytKgxs+KuMKGtsF+sb1xqbVcnKoofI5JvTg5tyYbphHo9+Xl9uKYwsuVwMmSvsd0qrai3po7iJc4hpd4zms0tSGw0NchobVhn61IkKBGjp4leowGbHEKdGXg7O+2192tz9akydF6rrpDjZ1pyFtixlRZw0k9uSsYnh4sshkdqwny+/Dv+e1fnqxYmagalKhWmKcygJJyzGVuymFPvz9Aui7V8NHJ7MQenLAXj6Sr4aOO1oOG03sFaHcLelgNgkoSkDTp+Oe/6Lm35bAVip8RhJmD0nd90HEQij4XlyvC5uvb8tfP7spRtsZGs8Mvqryb1d5xxNE7rsAqp7ux46mc25OY2Y6R0dtcvMqiysVeoKqX2Y2W2Yyt8KbNAAAAZHRSTlMAGuQDGBX0Eg0KB/3xCP72D/6y+nr8+G6mnIJ09OHRypL8/Eg6FwP+/v399+zQwb2LgHluYzYsJPn597Spo1lRRkEk/Pr39Ono5OPg39PEu4xnVTMM/vn0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" />
              <span>{message}</span>
              <Link as="/signin" href="/signin">
                    <a>
                      <button className={`${process.env.THEME_NAME === "TRAVELO" && styles.buttonStyleTravelo}`}>
                        {t("sign-in")}
                      </button>
                    </a>
                </Link>
            </> : null
          }
          {
            status === 'error' ?
            <>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAACJCAMAAAAVBpbNAAAC9FBMVEUAAAAAYnYLZnqfxs8EbYACZ3oJc38DZXkGa38EaXygx8////9no7D///8IZ30Can3///8CZnz///86hZZ1q7hyqbb///8FZnwHaH0Ne5FrpbJhnq18sb1OkqFYmagRgZYOd4wCZnwJZnv////l8PIIan9FjJ0FZnz+/v4LZn3///8nd4tAiZr////////////f7PD///8SZHozgZMfdYkHZHsIZXv///8JZnwIcogdbIEPb4QhdYj////7/v4NZXsIZXv///////8Ya4H///////////////8SZ33///////8GZXv///////8OZXv///82hpdfnav////9/v77/v7///+SvMb///8feIsEZ30DZXwDZnv///8VZXz3+voDZHrN6fHr9vjvQFD///8ipLjl8vU5g5UCZXsFZnz9/v4VcITwQlLn8/YMaoD5srgJaX7q9fc+ipsQbYLxTVzwRlbg7vEuf5HxUF+41dvy9/jV6Oy009nY6e3E3OG92N5WmKcZc4f5/P3i8fSDtL9+sbw5hpgpfY8jeYz0c3/yWmj3+/vy+fr82dwgd4oddYnc7fDe6+793N/7yc6bw8xup7T5q7JdnKpRlaRLkaHxVWTwSVn0+vuUv8iKuMN3rbljoa8WjqNGjp795+n94OP81tmlydKBsr0ygpTwQ1P/+/v/9vfS5uqozNOXwcr6v8SGtsFam6n3l6D3k5wUhpv+6evO5Oix0dj7xMn6vMH6t734pq73mqMleo3zZnLP4ubG3uXK3+TA2uD80taiyNGPvMY0q775rrUhobUalKjyX23mQVH+6+3L4uasztX7zdEdm6/3nqb2kJo4gpT1gowLZHrORVbtQVH+8vPK6e1VuciMusRBscL4oqr2i5UfYXZYV2v+7/G+5Oqj2eGR0dr1eoYsYHVFWm9uU2eBUGOgS16x3+Z2x9Ntw9BgvsxKtcUzgJPzbHk9XHGRTmGtSly9R1jcQ1TLhZE2boJob4C5YnLUXGt5VmishVxXAAAAYXRSTlMAGor9BxYEEgoO/fX+8ykQ8fr39fz++jEh/v37+vn4/frxPxH++/fnpHU9/ffrZDUZB/7z3pyDfUz+/vj1l4V+aFMi9N3b1Mm/vrmrm3BXKufl5ODLxsbAwL6z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" />
              <span>{message}</span>
              <Link as="/signin" href="/signin">
                    <a>
                      <button className={`${process.env.THEME_NAME === "TRAVELO" && styles.buttonStyleTravelo}`}>
                        {t("sign-in")}
                      </button>
                    </a>
                </Link>
            </> : null
          }
        </>
      }
    </div>
   )
   
}

VerifyEmail.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

VerifyEmail.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(VerifyEmail)