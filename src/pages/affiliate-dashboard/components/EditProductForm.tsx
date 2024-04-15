import { UploadBody } from '@sanity/client'
import { Pen } from 'lucide-react'
import React from 'react'
import { Combobox } from '../../../components'
import { Button } from '../../..//components/ui/button'
import { baseUrl } from '../../..//constants/baseUrl'
import { sanityClient } from '../../..//lib/sanityClient'
import { toast } from '../../..//components/ui/use-toast'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

type TnewProduct = {
  _type: 'products'
  name: string
  description: string
  price: string
  image: {
    _type: 'image'
    asset: {
      _type: 'reference'
      _ref: string
    }
  }
}

function ImageInput({ setUploadable, imageFile, setImageFile }: any) {
  function handleFileChange(e: any) {
    console.log(e.target.files[0])
    setUploadable(e.target.files[0])
    setImageFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className="gap-y-4 ">
      <div className="items-left flex flex-col gap-y-4">
        {!imageFile && (
          <label htmlFor="image" className={`flex h-36  w-36 cursor-pointer items-center justify-center border px-4`}>
            <input
              id="image"
              onChange={(e) => handleFileChange(e)}
              className="hidden border bg-transparent text-white"
              type="file"
            />
            {<span className={'text-center text-sm text-blue-600'}>{'Upload Image'}</span>}
          </label>
        )}

        {imageFile && (
          <div className={` h-36  w-36 `}>
            <img className=" h-full w-full object-cover" src={imageFile} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

function DietaryBox(params: type) {
  return (
    <div className="grid h-20 w-20 place-content-center border-2 border-green-300">
      <p className="text-center text-white">126</p>
      <p className="text-center text-white">kcal</p>
    </div>
  )
}

function DietGrid(params: type) {
  return (
    <div className="flex flex-col">
      <div className="">
        <p className=" text-white">Dietary Information</p>
      </div>
      <div className=" flex  flex-wrap ">
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
      </div>
    </div>
  )
}

function EditProductForm() {
  const { id } = useParams()

  const categories = [
    {
      value: 'next.js',
      label: 'Beverages',
    },
    {
      value: 'sveltekit',
      label: 'Salads',
    },
    {
      value: 'nuxt.js',
      label: 'Pies',
    },
    {
      value: 'remix',
      label: 'Breakfast',
    },
    {
      value: 'astro',
      label: 'Lunch',
    },
  ]
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    price: '',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: '',
      },
    },
  })

  const fetchProduct = async () => {
    const res = await fetch(`${baseUrl}/stores/get-single-product?product_id=${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  const [storeCategories, setStoreCategories] = React.useState(categories)
  const [defaultCategories, setDefaultCategories] = React.useState(categories)
  const [productMainCategory, setProductMainCategory] = React.useState('')
  const [productCategory, setProductCategory] = React.useState('')
  const [imageFile, setImageFile] = React.useState('')
  const [image, setImage] = React.useState<UploadBody | null>(null)
  const [writing, setWriting] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const { data: productData, isLoading, refetch } = useQuery({ queryKey: ['v'], queryFn: fetchProduct })

  const resetForm = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: '',
        },
      },
    })
    setImage(null)
    setImageFile('')
    setProductMainCategory('')
    setProductCategory('')
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) {
      return
    }
    setLoading(true)
    try {
      const _id = localStorage.getItem('_id')
      console.log({
        ...product,
        // category,
      })

      const { _id: image_id } = await sanityClient.assets.upload('image', image as UploadBody)

      console.log(image_id)

      if (imageFile) {
        const newProduct = {
          ...product,
          price: product.price ? Number(product.price) : productData.price,
          description: product.description ? product.description : productData.description,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: image_id,
            },
          },
        }
        const res = await fetch(`${baseUrl}/affiliates/add-product?affiliate_id=${_id}`, {
          method: 'POST',
          body: JSON.stringify(product),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()
      }

      resetForm()
      setLoading(false)
      toast({
        title: 'Added to database.',
        description: 'An onboarding email has been sent to the new vendor',
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      })
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  async function handleWriteWithAi() {
    if (!product?.name && !productData?.name) {
      alert('Please enter a product name')
      return
    }

    try {
      const url = `${baseUrl}/write_about_meal?meal_name=${product?.name ? product?.name : productData?.name}`
      if (writing) {
        return
      }
      setWriting(true)

      const res = await fetch(url)
      const data = await res.json()

      console.log(data)

      const text = data.data.response

      setWriting(false)

      setProduct((prev) => ({
        ...prev,
        description: text,
      }))

      console.log('written')
    } catch (error) {
      console.error(error)
      setWriting(false)
    }
  }

  console.log(productData)

  return (
    <div className=" pt-10 ">
      <form className=" mx-auto flex max-w-2xl flex-col gap-y-4 ">
        <div className="flex w-full items-center justify-center gap-x-2 md:justify-start">
          <ImageInput
            setImageFile={setImageFile}
            imageFile={!imageFile ? productData?.image : imageFile}
            setUploadable={setImage}
          />
          <div className="hidden lg:block">
            <p className="text-white">All fields are required</p>
            <p className="text-sm text-white ">Please fill all required fields to contiune</p>
          </div>
        </div>
        {/* CATEGORIES */}
        <div className="w-full items-center gap-4 md:flex ">
          <div className="w-full">
            <label className=" text-sm text-gray-50" htmlFor="">
              Main category
            </label>
            <Combobox Categories={defaultCategories} setValue={setProductMainCategory} value={productMainCategory} />
          </div>

          <div className="w-full">
            <label className=" text-sm text-gray-50" htmlFor="">
              Sub category
            </label>
            <Combobox creatable Categories={storeCategories} setValue={setProductCategory} value={productCategory} />
          </div>
        </div>
        {/*  NAME  AND PRICE */}
        <div className="w-full items-center gap-4 md:flex ">
          <div className="w-full">
            <label className="text-sm text-gray-50" htmlFor="">
              Product Name
            </label>
            <input
              value={!product.name ? productData?.name : product.name}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Product Name"
              type="text"
              className="w-full rounded-lg p-2"
            />
          </div>
          <div className="w-full">
            <label className="text-sm text-gray-50" htmlFor="">
              Product price
            </label>
            <input
              value={!product.price ? productData?.price : product.price}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              placeholder="Product Price"
              type="number"
              className="h-9 w-full rounded-md px-2 py-2"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="">
          <div className="flex items-center justify-between pb-2">
            <label className="text-sm text-gray-50" htmlFor="">
              Product description
            </label>
            <div onClick={handleWriteWithAi} className={`group flex  items-center gap-x-[2px]`}>
              <Pen
                className={` h-5 w-5 text-gray-50 transition-all  ease-linear   ${
                  writing ? 'animate-spin cursor-progress' : 'cursor-pointer group-hover:-rotate-45'
                }`}
              />
              <span
                className={`text-xs font-medium text-gray-50 transition-all ease-linear group-hover:text-green-400 ${
                  writing ? 'animate-pulse cursor-progress' : 'cursor-pointer duration-300  '
                } `}
              >
                {!writing ? 'Write with A.I' : 'Writing with A.I'}
              </span>
            </div>
          </div>
          <textarea
            value={!writing ? product.description : 'thinking...'}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder={!product.description ? productData?.description : 'Product description'}
            rows={4}
            className=" w-full rounded-lg p-2"
          />
        </div>

        <Button onClick={(e) => handleSubmit(e)} type="submit">
          {!loading ? 'Submit Product' : 'Submitting...'}
        </Button>
      </form>
      <div className="hidden space-y-6 border-l px-2 ">
        <div className="border-b pb-2">
          <p className="text-white">Additional Information</p>
        </div>
        <DietGrid />
        <div className="my-2 border-b"></div>
        <div className="space-y-2 pt-4">
          <p className="text-white">Ingredients:</p>
          <input
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Enter new ingredient"
            type="text"
            className="w-full rounded-lg p-2"
          />
        </div>
        <div className="my-2 border-b"></div>
        <div className="space-y-2 pt-4">
          <p className="text-white">Sides:</p>
          <input
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Enter new ingredient"
            type="text"
            className="w-full rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  )
}

export default EditProductForm
