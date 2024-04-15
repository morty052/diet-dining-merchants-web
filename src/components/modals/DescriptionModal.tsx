import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import React from 'react'
type Props = {
  // setCart: () => React.SetStateAction<TcartItem[]>
  description: string
  trigger: React.RefObject<HTMLButtonElement>
}

function CartItem({ price, name, quantity, image }: { price: number; name: string; quantity: number; image: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2">
      <img src={image} alt="" className="h-24 w-24 object-contain" />
      <div className="flex-1">
        <p>{name}</p>
        <p>${price}</p>
      </div>
      <p>X{quantity}</p>
    </div>
  )
}

// ! DIALOG TRIGGER IS POSITIONED ABSOLUTE INSET-0 ON TABLE CELL
function DescriptionModal({ description, trigger }: Props) {
  console.log(description)
  return (
    <Dialog>
      <DialogTrigger
        ref={trigger}
        className="hover absolute  inset-0 hidden w-full  text-center font-medium text-green-400 "
      >
        View Description
      </DialogTrigger>
      <DialogContent>
        <div className="w-full ">
          <p>{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DescriptionModal
