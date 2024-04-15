import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HeaderDropdown } from './HeaderDropDown'
import { ArrowLeft, Home, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbarlink = ({ title, path }: { title: string; path: string }) => {
  return (
    <NavLink
      end
      id="navlink"
      to={`${path}`}
      // className={`text-sm  text-white transition-all duration-200 ease-in hover:text-green-400 `}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isActive
            ? 'text-sm text-green-300 transition-all duration-200 ease-in hover:text-green-400'
            : 'text-sm text-white transition-all duration-200 ease-in hover:text-green-400',
        ].join(' ')
      }
    >
      {title}
    </NavLink>
  )
}

function Sidebar({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      className="group fixed bottom-0 top-0 z-50  w-52 flex-col border border-white/10 bg-darkGrey px-2 "
    >
      <ul className="flex flex-col space-y-6 ">
        <div className="flex items-center justify-between">
          <ArrowLeft onClick={() => setOpen(false)} className="text-white" />
          <p className=" text-2xl font-semibold text-gray-50 ">
            Diet <span className="text-green-400">Dining</span>
          </p>
        </div>
        <a className="relative flex" href="">
          <Home className=" text-white" />
          <span className="hidden text-white group-hover:block">Dashboard</span>
        </a>
        <a className="relative flex" href="">
          <Home className=" text-white" />
          <span className="hidden text-white group-hover:block">Products</span>
        </a>
      </ul>
    </motion.div>
  )
}

const adminLinks = [
  {
    path: '/dashboard',
    title: 'Overview',
  },
  {
    path: '/dashboard/orders',
    title: 'Orders',
  },
  {
    path: '/dashboard/store',
    title: 'Stores',
  },
  {
    path: '/store-onboarding',
    title: 'Onboarding',
  },
  {
    path: '/dashboard/notifications',
    title: 'Notifications',
  },
]

const affiliateLinks = [
  {
    path: '/affiliate',
    title: 'Dashboard',
  },
  {
    path: 'orders',
    title: 'Orders',
  },
  {
    path: 'store',
    title: 'Store',
  },
  // {
  //   path: 'products',
  //   title: 'Products',
  // },
  // {
  //   path: '/notifications',
  //   title: 'Notifications',
  // },
]

export function Header({ isAffiliate, minimal, title }: { minimal?: boolean; title?: string; isAffiliate?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const firstname = localStorage.getItem('firstname')
  const store_name = localStorage.getItem('store_name')
  return (
    <>
      <div className=" sticky top-0 z-50 max-w-7xl  bg-darkGrey  ">
        <div className=" mx-auto flex w-full max-w-7xl items-center justify-between  border-b border-white/10 px-4 py-2 sm:px-6">
          {/* HEADER LEFT */}
          {!minimal && (
            <p className="hidden text-2xl font-semibold text-gray-50 md:block">
              Diet <span className="text-green-400">Dining</span>
            </p>
          )}

          {/* SIDEBAR BUTTON */}
          <Menu onClick={() => setOpen(true)} className="text-white md:hidden" />

          {/* MINIMAL HEADER BACK BUTTON */}
          {minimal && (
            <div
              onClick={() => navigate(isAffiliate ? '/affiliate' : '/dashboard')}
              className="group hidden cursor-pointer items-center gap-x-2 md:flex"
            >
              <ArrowLeft className="text-white transition-all duration-300 ease-in group-hover:text-green-400" />
              <p className="text-sm text-white transition-all duration-300 ease-in group-hover:text-green-400">Exit</p>
            </div>
          )}

          {/* MINIMAL STORE HEADER */}
          {minimal && <p className="hidden font-medium text-green-400 md:block ">{title}</p>}

          {/* ADMIN LINKS */}
          {!isAffiliate && !minimal && (
            <div className="hidden gap-4 sm:flex">
              {adminLinks.map((link) => (
                <Navbarlink key={link.path} path={link.path} title={link.title} />
              ))}
            </div>
          )}

          {/* AFFILIATE LINKS */}
          {isAffiliate && !minimal && (
            <div className="hidden gap-4 sm:flex">
              {affiliateLinks.map((link) => (
                <Navbarlink key={link.path} path={link.path} title={link.title} />
              ))}
              <HeaderDropdown />
            </div>
          )}

          {/* HEADER RIGHT */}
          {!isAffiliate && (
            <div className=" flex items-center gap-x-2">
              <div className="flex flex-col">
                <span className="text-xs text-white">Logged in as</span>
                <span className="text-right text-xs text-white">{firstname}</span>
              </div>
              <div className="grid h-8 w-8 place-content-center rounded-full border border-white">
                <p className="text-lg font-black uppercase text-green-400">{firstname?.charAt(0)}</p>
              </div>
            </div>
          )}
          {isAffiliate && (
            <div className=" flex items-center gap-x-2">
              <div className="flex flex-col">
                <span className="text-xs text-white">Logged in as</span>
                <span className="text-right text-xs text-white">{store_name}</span>
              </div>
              <div className="grid h-8 w-8 place-content-center rounded-full border border-white">
                <p className="text-lg font-black uppercase text-green-400">{store_name?.charAt(0)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {open && <Sidebar setOpen={setOpen} />}
    </>
  )
}
