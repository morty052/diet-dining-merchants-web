import { useQuery } from '@tanstack/react-query'
import { Plus, Star } from 'lucide-react'
import React from 'react'

import { StorePhoneMockUp } from '../../components/phone-mockup'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { baseUrl } from '../../constants/baseUrl'

const fetchStores = async () => {
  // const res = await fetch(`http://192.168.100.16:3000/stores/get-all`)
  const res = await fetch(`${baseUrl}/stores/get-all`)
  const data = await res.json()
  console.log(data)
  return data
}
// function AllStores() {
//   const { data: stores, isLoading } = useQuery(['stores'], fetchStores)

//   if (!stores) {
//     return null
//   }

//   return (
//     <div className="">
//       <div className="ml-1 pt-4">
//         <p className="text-white">Manage All Stores</p>
//       </div>
//       <StoreTable title="Manage all stores" stores={stores} />
//     </div>
//   )
// }

// function ApprovedStoresScreen() {
//   const { data: stores, isLoading } = useQuery(['stores'], fetchStores)
//   return (
//     <div className="">
//       <div className="ml-1 pt-4">
//         <p className="text-white">Manage All Approved Stores</p>
//       </div>
//       <StoreTable title="Manage all stores" stores={stores} />
//     </div>
//   )
// }

// function OnboardingStoresScreen() {
//   const { data: stores, isLoading } = useQuery(['stores'], fetchStores)
//   return (
//     <div className="">
//       <div className="ml-1 pt-4">
//         <p className="text-white">Manage All Onboarding Stores</p>
//       </div>
//       <StoreTable title="Manage all stores" stores={stores} />
//     </div>
//   )
// }

// function Addproduct() {
//   return (
//     <div className="">
//       <p className="text-white">Add Product</p>
//     </div>
//   )
// }

// const products = [
//   {
//     name: 'Sandy hook Special',
//     image: '',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate unde repellat reiciendisarchitecto quidem ad non accusantium distinctio quisquam accusamus provident, sequi harum et vero iusto ipsum quae fugit?',
//     price: 400,
//   },
//   {
//     name: 'Krabby Patty',
//     image: '',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate unde repellat reiciendisarchitecto quidem ad non accusantium distinctio quisquam accusamus provident, sequi harum et vero iusto ipsum quae fugit?',
//     price: 400,
//   },
//   {
//     name: 'Orange Soda',
//     image: '',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate unde repellat reiciendisarchitecto quidem ad non accusantium distinctio quisquam accusamus provident, sequi harum et vero iusto ipsum quae fugit?',
//     price: 400,
//   },
// ]

function ProductsTab({ menu }: { menu: any }) {
  return (
    <div className="">
      {/* <input placeholder="search for product" className="w-full rounded-lg border p-2" type="text" /> */}
      <div className=" space-y-6 overflow-y-scroll ">
        {menu?.map((item: any, index: number) => (
          <div key={index} className="">
            <p className="mb-4 text-xl font-semibold text-white">{item.title}</p>
            <div className="mb-2 space-y-8">
              {item.products.map((product: any, index: number) => (
                <div key={index} className="flex  rounded-lg border">
                  <img className="h-28 w-28 rounded-l-lg object-cover" src={product.image} alt="" />
                  <div className="p-2">
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-white">${product.price}</p>
                    <p className="text-sm text-white">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoreManagerTab() {
  function StoreTag({ name, isAddNewTagButton }: { name: string; isAddNewTagButton?: boolean }) {
    if (isAddNewTagButton) {
      return (
        <div className="group  inline-flex  cursor-pointer  rounded-lg bg-white px-2  py-1 hover:bg-green-400">
          <div className="flex w-full flex-row items-center  gap-x-1 ">
            <Plus size={10} color="blue" />
            <p className="text0white flex-1 text-xs font-medium group-hover:text-white">Add new tag</p>
          </div>
        </div>
      )
    }

    return (
      <div className="inline-flex   justify-center rounded-lg   py-1">
        {<p className="text-xs font-medium text-white">{name}</p>}
      </div>
    )
  }

  function StoreRatingGrid({ store_ratings_count }: { store_ratings_count: number }) {
    return (
      <div className="flex items-center gap-x-4 py-2">
        <div className="flex  gap-x-4">
          <Star size={20} color="green" />
          <Star size={20} color="green" />
          <Star size={20} color="green" />
          <Star size={20} color="green" />
          <Star size={20} color="green" />
        </div>
        <p className="font-medium text-white">({store_ratings_count}) ratings</p>
      </div>
    )
  }

  async function fetchStore() {
    const _id = localStorage.getItem('_id')
    console.log(_id)
    const res = await fetch(`${baseUrl}/affiliates/get-affiliate-stores?afilliate_id=${_id}`)
    const data = await res.json()
    console.log(data)
    return data[0]
  }

  const { isLoading, data: store } = useQuery({ queryKey: ['affiliate_store'], queryFn: fetchStore })

  if (isLoading) {
    return null
  }

  const {
    store_name,
    store_image,
    store_logo,
    store_address,
    menu,
    store_description,
    store_ratings_count,
    store_tags,
  } = store ?? {}

  return (
    <div className="grid grid-cols-2 ">
      {/* LEFT SIDE */}
      <div className="col-span-2 lg:col-span-1">
        <div className="sticky top-0">
          {/* BACKGROUND IMAGE */}
          <div className="relative h-[200px]">
            <img className="h-full  w-full object-cover" src={store_image} alt="" />
            {/* <div className="absolute bottom-0 ">
              <img className=" h-20 w-20 rounded-full object-cover" src={store_logo} alt="" />
            </div> */}
          </div>
          {/* STORE DETAILS */}
          <div className="p-2">
            <p className="text-white">{store_name}</p>
            {/* <p className="text-white">{store_address?.street}</p> */}
            <div className="flex items-center gap-x-1 py-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 " />
              <p className="text-xs font-medium text-white">4.7 (100 ratings)</p>
            </div>
            {/* TAGS */}
            <div className="flex flex-row flex-wrap items-center gap-4 py-2">
              {store_tags?.map((tag: string, index: number) => (
                <StoreTag key={index} name={tag} />
              ))}
              {/* <StoreTag isAddNewTagButton name="Keto" /> */}
            </div>
            <div className="mt-2 h-40 rounded-lg border p-2">
              <p className="text-sm text-white">{store_description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className=" hidden space-y-4 overflow-y-scroll border-l px-4 lg:block">
        <StorePhoneMockUp store_name={store_name} store_image={store_image} tags={store_tags} />
      </div>
    </div>
  )
}

// TODO:CREATE ROUTE TO POST CHANGES
function EditStoreTab() {
  const [storeDescription, setStoreDescription] = React.useState('')
  function StoreTag({ name, isAddNewTagButton }: { name: string; isAddNewTagButton?: boolean }) {
    if (isAddNewTagButton) {
      return (
        <div className="group  inline-flex  cursor-pointer  rounded-lg bg-white px-2  py-1 hover:bg-green-400">
          <div className="flex w-full flex-row items-center  gap-x-1 ">
            <Plus size={10} color="blue" />
            <p className="text0white flex-1 text-xs font-medium group-hover:text-white">Add new tag</p>
          </div>
        </div>
      )
    }

    return (
      <div className="inline-flex   justify-center rounded-lg   py-1">
        {<p className="text-xs font-medium text-white">{name}</p>}
      </div>
    )
  }

  async function fetchStore() {
    const _id = localStorage.getItem('_id')
    console.log(_id)
    const res = await fetch(`${baseUrl}/affiliates/get-affiliate-stores?afilliate_id=${_id}`)
    const data = await res.json()
    console.log(data)
    return data[0]
  }

  const { isLoading, data: store } = useQuery({ queryKey: ['affiliate_store'], queryFn: fetchStore })

  if (isLoading) {
    return null
  }

  const {
    store_name,
    store_image,
    store_logo,
    store_address,
    menu,
    store_description,
    store_ratings_count,
    store_tags,
  } = store ?? {}

  return (
    <div className="grid grid-cols-2 ">
      {/* LEFT SIDE */}
      <div className="col-span-2 lg:col-span-1">
        <div className="sticky top-0">
          {/* BACKGROUND IMAGE */}
          <div className="relative h-[200px]">
            <img className="h-full  w-full object-cover" src={store_image} alt="" />
            {/* <div className="absolute bottom-0 ">
              <img className=" h-20 w-20 rounded-full object-cover" src={store_logo} alt="" />
            </div> */}
          </div>
          {/* STORE DETAILS */}
          <div className="p-2">
            <p className="text-white">{store_name}</p>
            {/* <p className="text-white">{store_address?.street}</p> */}
            <div className="flex items-center gap-x-1 py-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 " />
              <p className="text-xs font-medium text-white">4.7 (100 ratings)</p>
            </div>
            {/* TAGS */}
            <div className="flex flex-row flex-wrap items-center gap-4 py-2">
              {store_tags?.map((tag: string, index: number) => (
                <StoreTag key={index} name={tag} />
              ))}
              <StoreTag isAddNewTagButton name="Keto" />
            </div>
            <textarea
              name="store_description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              placeholder={store_description}
              className="mt-2 h-40 w-full rounded-lg border bg-transparent p-2 text-white focus:outline-green-400"
            ></textarea>
          </div>

          <div className="p-2">
            <Button>
              <p>Save changes</p>
            </Button>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className=" hidden space-y-4 overflow-y-scroll border-l px-4 lg:block">
        <StorePhoneMockUp store_name={store_name} store_image={store_image} tags={store_tags} />
      </div>
    </div>
  )
}

export function StoreManager() {
  return (
    <div className="mx-auto max-w-7xl px-2 pt-6">
      {/* <TabsBuilder defaultValue={tabItems?.[0].value} tabItems={tabItems} /> */}
      <Tabs defaultValue="overview" className="">
        <TabsList>
          <TabsTrigger className="w-[100px]" value="overview">
            Preview
          </TabsTrigger>
          <TabsTrigger className="w-[100px]" value="edit">
            Edit
          </TabsTrigger>
          {/* <TabsTrigger className="hidden w-[100px] xl:block" value="store">
            Menu
          </TabsTrigger> */}
          {/* <TabsTrigger className="w-[100px]" value="store">
            Hours
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview">
          <StoreManagerTab />
        </TabsContent>
        <TabsContent value="edit">
          <EditStoreTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
