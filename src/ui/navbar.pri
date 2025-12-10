import {
  Link,
  path
} from "priy/router";
import {
  useMemo
} from "priy";

const activeClass =
"relative flex flex-col justify-center items-center w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-xl scale-105 transition-all duration-300 ease-in-out ring-4 ring-red-300/30";
const nonActiveClass =
"relative w-12 h-12 rounded-2xl flex flex-col items-center justify-center text-gray-400 transition-all duration-50 ease-in-out";

<nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t-2 border-red-100 z-50 shadow-2xl w-full rounded-t-2xl ">
  <div class="relative flex items-center py-3 px-6">

    <div class="w-full flex justify-evenly gap-8 items-center h-14">
      <Link href="/" class="flex items-center justify-center">
        <div class={path() === "/" ? activeClass: nonActiveClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4Zm-8-4h6" /></svg>
          <span class="text-xs font-bold">Home</span>
        </div>
      </Link>

      <Link href="/cart" class="flex items-center justify-center text-white">
        <div class={path() === "/cart" ? activeClass: nonActiveClass}>

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3c.83.305 1.968.542 2.48 1.323c.356.545.356 1.268.356 2.715V9.76c0 2.942.061 3.912.892 4.826c.83.914 2.168.914 4.842.914h5.085c2.666 0 3.244-.601 3.756-3.193c.224-1.13.45-2.246.564-3.373c.216-2.134-.973-2.814-2.866-2.814H5.836M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z" /></svg>
          <span class="text-xs font-bold">Cart</span>
        </div>
      </Link>

      <Link href="/orders" class="flex items-center justify-center">
        <div class={path() === "/orders" ? activeClass: nonActiveClass}>

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 21.001L7 18m8-7.999l-1 1m4-8l-3 3c-.545.545-.818.818-.964 1.112a2 2 0 0 0 0 1.776c.146.294.419.567.964 1.112s.818.818 1.112.964a2 2 0 0 0 1.776 0c.294-.146.567-.419 1.112-.964l3-3M20 5l-3 3m3 13l-8-8m0 0L2 3c0 3.842 1.526 7.526 4.243 10.243L9 16z" color="currentColor" /></svg>
          <span class="text-xs font-bold">Hotels</span>
        </div>
      </Link>

      <Link href="/profile" class="flex items-center justify-center">
        <div class={path() === "/profile" ? activeClass: nonActiveClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "lucide lucide-user w-6 h-6 transition-all duration-300" >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="text-xs font-bold">Profile</span>
        </div>
      </Link>
    </div>

  </div>
</nav>