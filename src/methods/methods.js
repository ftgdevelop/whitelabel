const getLang = () => {
  const url = window.location.pathname
  const query = url.split('/')
  return query[0]
}
export default getLang
