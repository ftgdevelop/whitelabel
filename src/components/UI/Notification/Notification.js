import { notification } from 'antd'

const openNotification = (type, placement, msg) => {
  notification[type]({
    message: msg,
    description: '',
    placement,
    style: {
      color: '#fff',
      background: 'rgba(0,0,0,0.8)',
    },
  })
}
export default openNotification
