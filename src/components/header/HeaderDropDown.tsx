import * as React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function HeaderDropdown() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex items-center">
          <p className="cursor-pointer text-sm text-white transition-all duration-200 ease-in group-hover:text-green-400">
            Products
          </p>
          <ChevronDown
            size={16}
            className=" cursor-pointer text-white transition-all duration-200 ease-in group-hover:text-green-400"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-darkGrey ">
        {/* <DropdownMenuLabel className="text-white">Product Manager</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => navigate('products')} className="w-full  text-white">
          View Products
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('products/add')} className="text-white">
          Add Product
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('products/edit')} className="text-white">
          Edit Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
