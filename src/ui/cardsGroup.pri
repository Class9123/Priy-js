import {
  Link,
  push
} from "priy/router";

const pickedCardsData = [{
  className: "bg-red-500",
  tag: "HOT",
  title: "Golden Dragon",
  bgImage: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600",
  time: "30min",
  price: "$20"
},
  {
    className: "bg-pink-500",
    tag: "LOVED",
    title: "Sushi Master",
    bgImage: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600",
    time: "35min",
    price: "$25"
  },
  {
    className: "bg-blue-400",
    tag: "4.5★",
    title: "Taco Fiesta",
    bgImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600",
    time: "20min",
    price: "$12"
  },
  {
    className: "bg-green-500",
    tag: "NEW",
    title: "Green Bowl",
    bgImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    time: "25min",
    price: "$15"
  }]

<div class="p-4 overflow-hidden">
  <div class="flex items-center justify-between mb-3 w-full">
    <div class="flex items-center gap-2">
      <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-5 h-5 text-white">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4"></path>
          <path d="M22 5h-4"></path>
          <path d="M4 17v2"></path>
          <path d="M5 18H3"></path>
        </svg>
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Recommended for You</h2>
        <p class="text-xs text-gray-500">
          Handpicked just for you
        </p>
      </div>
    </div>
    <button class="text-sm font-semibold text-red-500 hover:text-red-600 transition">
      See All
    </button>
  </div>

  <Link href="/cart">
    <div class="relative w-[90vw] h-56 rounded-3xl overflow-hidden mb-4 shadow-xl">
      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" alt="Bella Italia" class="w-full h-full object-cover" />

    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
    </div>

    <div class="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
      </svg>
      <span class="text-xs font-bold">TOP PICK</span>
    </div>

    <div class="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
      <span class="text-sm font-bold">4.7</span>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-5">
      <h3 class="text-2xl font-bold text-white mb-2">Bella Italia</h3>
      <p class="text-white/90 text-sm mb-3 line-clamp-2">
        Authentic Italian cuisine with fresh pasta and wood-fired pizza
      </p>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span class="text-sm font-semibold text-white">25 min</span>
        </div>
        <div
          class = "flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg" >
          <span class="text-sm font-bold text-white">From $15</span>
        </div>
      </div>
    </div>
  </div>
</Link>

<div class="grid grid-cols-2 gap-3 mb-4" $for={obj in pickedCardsData}>

  <Link href="/food" class="relative rounded-2xl overflow-hidden shadow-lg h-[170px]">
    <img src={obj.bgImage} alt={obj.title} class="w-full h-full object-cover opacity-80" />
  <div class={`absolute top-2 right-2 ${obj.className} text-white px-2 py-1 rounded-full text-xs font-bold shadow-md`}>
    {obj.tag}
  </div>
  <div class="absolute bottom-0 left-0 right-0 p-3">
    <h3 class="text-white font-bold text-sm mb-1 line-clamp-1">
      {obj.title}
    </h3>
    <div class="flex items-center justify-between text-white/90 text-xs">
      <span>{obj.time}</span>
      <span class="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{obj.price} </span>
    </div>
  </div>
</Link>
</div>


</div>