import { Button, Image, Input,NumberInput, Textarea } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller} from "react-hook-form"
import { createProduct } from "../services/createProduct.action";

interface FormInputs {
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
}

export const NewProduct = () => {

  const productMutation = useMutation({
    mutationFn: createProduct
  })

 const { control, handleSubmit, watch } = useForm<FormInputs>({
  defaultValues:{
    title:"",
    price: 0,
    description: "",
    category: "men's clothing",
    image: ""
  }
 }); 
 const newImage = watch('image');

  
 const onSubmit: SubmitHandler<FormInputs> = (data) => {
  console.log(data)
  productMutation.mutate(data)
 }

  return (
    <div className="flex-col w-full">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="items-center justify-center w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex items-center justify-around">
          
          <div className="flex-col w-[500px]">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field}
                  className="mt-2" 
                  type="text" 
                  label="Titulo del producto"
                />
              )}
            />
            
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumberInput 
                  {...field}
                  className="mt-2" 
                  label="Precio del producto"
                />
              )}
            />
            
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field}
                  value= {field.value}
                  className="mt-2" 
                  type="url" 
                  label="Url del producto"
                />
              )}
            />
            
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea 
                  {...field}
                  className="mt-2" 
                  label="Description" 
                  placeholder="Enter your description"
                />
              )}
            />
            
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full p-3 mt-2 bg-gray-800 rounded-md">
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button 
              type="submit" 
              className="mt-2" 
              color="primary" 
              isLoading={productMutation.isPending}
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? 'Cargando...' : 'Crear producto'}
            </Button>
          </div>

          <div className="flex items-center p-10 bg-white rounded-2xl" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              isZoomed
              src={newImage}
            />
          </div>
          
        </div>


      </form>

    </div>
  )
}