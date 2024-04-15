import React, { useRef, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Tcart } from '../../../types/cart'
import { Tproduct } from '../../../types/product'
import DescriptionModal from '../../../components/modals/DescriptionModal'
import { useNavigate } from 'react-router-dom'

type Props = {
  title: string
  products: Tproduct[]
}

// const orders = [
//   {
//     store: 'Papa johns',
//     status: 'PENDING',
//     _id: '',
//     cart: [
//       {
//         name: 'Food',
//         price: '20',
//         quantity: '1',
//         item_id: '848grgrgrv777',
//         extras: [],
//       },
//     ],
//     customer: 'anthonyChopra@mail.com',
//     total: '400',
//   },
// ]

function DownLoadReportButton() {
  return (
    <div className="">
      <div className="flex gap-x-2">
        {/* @ts-ignore */}
        <label htmlFor=""></label>
        <input className="w-40 rounded-md px-2 placeholder:text-center" title="date" placeholder="" type="date" />
        <Button className="bg-white text-black">Download</Button>
      </div>
    </div>
  )
}

const ViewCartModal = ({ cart, setViewingCart }: { cart: any; setViewingCart: any }) => {
  return (
    <div className="fixed inset-0   bg-black py-4">
      <div className="mx-auto w-2/4 rounded-lg bg-white p-2">
        <p onClick={() => setViewingCart(null)} className="text-xl font-medium text-black">
          Cart:
        </p>
        {cart?.map((cart: Tcart) => {
          const { name, price, quantity, _id, extras } = cart
          return (
            <div key={_id} className=" ">
              <div className="divide-y py-2">
                <div className=" p-2">
                  <p className="text-black">Name:{name}</p>
                </div>
                <div className=" p-2">
                  <p className="text-black">Price:{price}</p>
                </div>
                <div className="p-2">
                  <p className="text-black">Quantity:{quantity}</p>
                </div>
                {extras.length > 0 && (
                  <div className=" p-2">
                    <p className="text-black">extras:{quantity}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
function OrderUpdateDropdown({ pending, _id }: { pending: boolean; _id: string }) {
  const [newStatus, setNewStatus] = useState<'Pending' | 'Completed' | 'Cancelled' | null>(null)

  const handleUpdateStatus = async () => {
    let status = {
      completed: false,
      pending: true,
      cancelled: false,
    }
    switch (newStatus) {
      case 'Completed':
        status = {
          completed: true,
          pending: false,
          cancelled: false,
        }
        break
      case 'Cancelled':
        status = {
          completed: false,
          pending: false,
          cancelled: true,
        }
        break
      case 'Pending':
        status = {
          completed: false,
          pending: true,
          cancelled: false,
        }
        break

      default:
        break
    }

    const res = await fetch('http://localhost:3000/orders/update-status', {
      method: 'POST',
      body: JSON.stringify({ status, _id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  }

  return (
    <TableCell className="flex items-center justify-between border-x  text-white ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-1/2 items-center justify-between rounded-lg border px-4 py-2">
          {!newStatus && <p className="text-center">{pending ? 'Pending' : 'Completed'}</p>}
          {newStatus && <p className="text-center">{newStatus}</p>}
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuGroup>
          <DropdownMenuContent className="w-72 space-y-2 border-b bg-gray-200 shadow-md">
            <div className="bg-white p-2">
              <span className="text-sm">Select Option</span>
            </div>
            <DropdownMenuItem onClick={() => setNewStatus('Completed')} className="cursor-pointer border ">
              <p>Completed</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setNewStatus('Pending')} className="cursor-pointer border bg-gray-200">
              <p>Pending</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setNewStatus('Cancelled')} className="cursor-pointer border bg-gray-200">
              <p>Cancelled</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuGroup>
      </DropdownMenu>
      <button
        disabled={!newStatus}
        onClick={handleUpdateStatus}
        className="group group rounded-lg bg-white px-4 py-2 transition-all duration-300  ease-in hover:bg-green-400 hover:text-white disabled:bg-gray-600"
      >
        <span className="text-xs font-medium text-gray-800 ">Update</span>
      </button>
    </TableCell>
  )
}

function EditProductTable({ title, products }: Props) {
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const trigger = useRef<HTMLButtonElement>(null)
  function handleClick(description: string) {
    setDescription(description)
    trigger.current?.click()
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between  pb-6">
        <div className="">
          <div className="flex">
            <input
              placeholder="Search products"
              type="text"
              className="w-72 rounded-lg border bg-transparent p-2 text-white focus:outline-green-400"
            />
          </div>
        </div>
        <DownLoadReportButton />
      </div>
      <Table>
        {/* <TableCaption>A list of your recent orders.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-white">Image</TableHead>
            <TableHead className=" text-center text-white">Name</TableHead>
            <TableHead className=" text-center text-white">Description</TableHead>
            <TableHead className=" text-center text-white">Price</TableHead>
            <TableHead className=" text-center text-white">Category</TableHead>
            <TableHead className=" text-center text-white">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {products?.map((product) => {
            const { name, image, price, _id, description } = product

            return (
              <TableRow key={_id}>
                {/* IMAGE */}
                <TableCell className=" w-1/6 max-w-sm  cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                  <img src={image} alt="" className="mx-auto h-20 w-20 object-cover" />
                </TableCell>
                {/* NAME */}
                <TableCell className=" w-1/6 max-w-sm  cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                  <p className="text-center font-medium text-gray-50 ">{name}</p>
                </TableCell>
                {/* DESCRIPTION */}
                <TableCell
                  onClick={() => handleClick(description)}
                  className="group relative w-1/5 max-w-sm  cursor-pointer border-x text-white transition-all duration-300 ease-in hover:bg-white hover:text-white "
                >
                  <p className="text-center group-hover:text-green-300">View Description</p>
                </TableCell>
                <TableCell className="w-1/6 border-x text-center text-white ">${price}</TableCell>
                <TableCell className="w-1/6 border-x text-center font-medium text-white">{'date'}</TableCell>
                <TableCell
                  onClick={() => navigate(`${_id}`)}
                  className="group w-1/6 cursor-pointer border-x text-center font-medium text-white"
                >
                  <button className=" group-hover:text-green-400">Edit</button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <DescriptionModal trigger={trigger} description={description} />
    </div>
  )
}

export default EditProductTable
