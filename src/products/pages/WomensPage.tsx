import { ProductList, useProducts } from ".."

export const WomensPage = () => {

  const { product, isLoading } = useProducts({
    filterKey: "women's clothing"
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      {
        isLoading && <p>Cargando productos...</p>
      }
      <ProductList products={product} />

    </div>
  )
}