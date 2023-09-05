import React from 'react'
import { StarFilled } from '@ant-design/icons'
import Image from 'next/image'

const Rating = (props) => {
  let stars = []
  for (let i = 0; i < props.rate; i++) {
    stars.push('star')
  }
  return (
    <div
      className={`start-rating start-rating-svg ${
        process.env.THEME_NAME === 'TRAVELO' && 'start-rating-travelo'
      }`}
    >
      {stars.map((_, index) => (
        // <StarFilled key={index} />
        <Image
          src="https://cdn2.safaraneh.com/images/home/star.svg"
          width="16"
          height="16"
          layout="fixed"
          alt="ستاره"
          title="ستاره"
          key={index}
        />
      ))}
    </div>
  )
}
export default Rating
