import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { TableCell } from '../ui/table'
import React from 'react'
import { TcartItem } from '../../types/cart'
type Props = {
  // setCart: () => React.SetStateAction<TcartItem[]>
  cart: TcartItem[] | null
}

function CartItem({ price, name, quantity, image }: { price: number; name: string; quantity: number; image: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2">
      <img src={image} alt="" className="h-24 w-24 object-contain" />
      <div className="flex-1 px-2">
        <p>{name}</p>
        {/* <p>${price}</p> */}
      </div>
      <p>X{quantity}</p>
    </div>
  )
}

// ! DIALOG TRIGGER IS POSITIONED ABSOLUTE INSET-0 ON TABLE CELL
// TODO:TRIGGER BUTTON WITH REF INSTEAD
function CartModal({ cart }: Props) {
  return (
    <Dialog>
      <TableCell className="group relative w-1/5 max-w-sm  cursor-pointer border-x text-white transition-all duration-300 ease-in hover:bg-white hover:text-white ">
        <DialogTrigger className="hover absolute inset-0 w-full  text-center font-medium text-green-400 ">
          View Cart
        </DialogTrigger>
      </TableCell>
      <DialogContent>
        <div className="w-full space-y-4 ">
          <p className="text-lg font-medium">Cart</p>
          {cart?.map((item, index) => (
            <CartItem image={item.image} price={item.price} name={item.name} quantity={item.quantity} key={index} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CartModal
