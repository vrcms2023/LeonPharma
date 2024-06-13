import React from 'react'
import Title from '../../../Common/Title'

const GalleryImage = ({image}) => {

  const {url, description, title, tags} = image
  return (
    <div className="col-md-3 mb-3">
          <img src={url} className='w-100' />
          <Title title={title} 
          cssClass="pageTitle"
          mainTitleClassess="fs-6 text-dark"
          subTitleClassess=""
          />
          
        </div>
  )
}

export default GalleryImage