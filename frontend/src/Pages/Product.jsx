import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Component/Breadcrums/Breadcrums'
import ProductDisplay from '../Component/ProductDisplay/ProductDisplay'
import DiscriptionBox from '../Component/DiscriptionBox/DiscriptionBox'
import RelatedProducts from '../Component/RelatedProducts/RelatedProducts'

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId));
  return (
    <div>
      <Breadcrums product={product}/>
     
    
      <ProductDisplay product={product}/>
      <DiscriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
