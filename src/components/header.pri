import {
  push
} from "priy/router";

function notification() {
  alert("😁")
  push("/notification")
}

<header>
  <div class="fixed top-0 w-screen p-4 z-30 bg-white shadow-gray-100 rounded-b-3xl">
    <div class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <div class="flex flex-row gap-5 items-center">
        <input type="text" placeholder="Search for restaurants or dishes..." class="font-[470] pl-12 pr-4 py-2.5 bg-white border-[1.2px] border-gray-200 rounded-full" />
      <img class="px-3 w-12 h-12 rounded-full border-[1.2px] border-gray-200" src="/notification.svg" />
  </div>
</div>

</div>
<img class="rounded-b-3xl w-[100vw] object-cover h-80 mt-16" src="/banner.svg" />

</header>