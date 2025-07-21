import { useParams } from "react-router-dom"
import { ProductCard, useProduct } from "..";
import { Spinner } from "../../shared";
import { useEffect } from "react";


export const ProductById = () => {
  const { id } = useParams();

  const { product, isLoading } = useProduct({id: +id!})

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold"> producto</h1>
      {isLoading && <Spinner/>}
      {
        product && (<ProductCard product={product} fullDescription />)
      } 
      
    </div>
  )
}
