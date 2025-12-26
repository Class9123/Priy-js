import {
  Link,
  path
} from "priy/router";
import {
  useState,
  useEffect
} from "priy"
import Icon from "@/utils/lucide.js"

export default function NavBar() {
  const Dts = [{
    icon: "Home",
    label: "Home",
    view: "/home"
  },
    {
      icon: "Search",
      label: "Search",
      view: "/search"
    },
    {
      icon: "ClipboardList",
      label: "Orders",
      view: "/orders",
      badge: 4
    },
    {
      icon: "ShoppingCart",
      label: "Cart",
      view: "/cart",
      badge: 2
    },
  ]
  const activeClass =
  "relative flex flex-col justify-center items-center w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-xl scale-105 transition-all duration-300 ease-in-out ring-4 ring-red-300/30";
  const nonActiveClass =
  "relative w-12 h-12 rounded-2xl flex flex-col items-center justify-center text-gray-400 transition-all duration-50 ease-in-out";

  return (
    <nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t-2 border-red-100 z-50 shadow-2xl w-full rounded-t-2xl ">
      <div class="relative flex items-center py-3 px-6">

        <div class="w-full flex justify-evenly gap-8 items-center h-14" $for={dt in Dts}>
          <>
            <Link href={dt.view} class="flex items-center justify-center">
              <div class={path() === dt.view ? activeClass: nonActiveClass}>
                <Icon name={dt.icon} size={24} />
                <span class="absolute -top-0.5   -right-0.5 text-white text-sm bg-red-500 rounded-full w-5 h-5 text-center" $if={dt.badge}>{dt.badge}</span>
                <span class="text-xs font-bold">{dt.label}</span>
              </div> 
            </Link> 
          </>
        </div>

      </div>
    </nav>
  )
}