import {
  push
} from "priy/router"
import Icon from "../utils/lucide.js"
import avtar from "@assets/generated_images/avtar.svg"
import burgerImg from "@assets/generated_images/gourmet_cheeseburger.png"
import products from "@/store/productStore.js"
import { restaurants } from "@/dummy.js"
import { motion, motionValue, useTransform } from "@/utils/motion.js"

export default function Home() {

  const restaurant = {}
  const product = {}
  return <div class="min-h-screen bg-gray-50 dark:bg-slate-900">
    <header class="sticky top-0 z-40 bg-gray-50 dark:bg-slate-900 px-4 pt-2 pb-3">
      <div class="flex items-center justify-between mb-3">

        <div class="flex-1 flex">
          <button class="w-full flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30 rounded-full group hover:shadow-md transition-all duration-300 overflow-hidden"
            >
            <div class="p-2 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm"
              >
              <Icon name="MapPin" size={16} class="text-orange-500" />
            </div>

            <div class="flex flex-col text-left overflow-hidden">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Deliver to</span>
              <span class="text-sm font-bold text-slate-900 dark:text-white truncate">{location.name}</span>
            </div>

            <div class="ml-auto">
              <Icon name="ChevronDown" size={14} class="text-orange-500" />
            </div>
          </button>
        </div>

        <button
          type="button"
          on:click={() => push('/profile')}
          aria-label="Open profile"
          class="ml-3 relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-900 hover:scale-105 transition-transform"
          >
          <img
          src={avtar}
          alt="User avatar"
          on:error={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avtar;
          }}
          class="w-full h-full object-cover"
          />
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full" />
      </button>
    </div>

    <div class="flex items-center gap-3">
      <button
        on:lick={() => push('/search/true')}
        class="flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 shadow-sm rounded-full px-4 py-3 group"
        >
        <Icon name="Search" size={20} class="text-gray-400" />
        <span class="text-gray-400 dark:text-gray-500 text-sm">Search food...</span>
      </button>
      <button
        class="relative p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
        <Icon name="Bell" size={20} class="text-gray-600 dark:text-gray-300" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </button>
    </div>
  </header>
  <HeroCard/>
  <div class="px-4 py-3">
    <div class="bg-orange-500 rounded-3xl p-6 relative overflow-hidden">
      <div class="relative z-10">
        <p class="text-orange-100 text-sm mb-1">
          Hungry?
        </p>
        <h2 class="text-white text-2xl font-bold mb-1">Food delivery</h2>
        <h2 class="text-white text-2xl font-bold">in Mirchaiya</h2>
        <button class="mt-4 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium" data-testid="button-order-now">
          Order Now
        </button>
      </div>
      <div class="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-20">
        <Icon name="Pizza" size={120} class="text-white" />
      </div>
      <div class="absolute -right-4 -top-4 w-24 h-24 bg-orange-400 rounded-full opacity-50" />
      <div class="absolute right-16 -bottom-8 w-32 h-32 bg-orange-600 rounded-full opacity-30" />
    </div>
  </div>

  <div class="px-4 py-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">Nearby Restaurants</h3>
      <button class="text-orange-500 text-sm font-medium flex items-center gap-1" data-testid="button-see-all-restaurants">
        See all <Icon name="ChevronRight" size={16} />
      </button>
    </div> 
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" $for={restaurant in restaurants}>
      <div class="w-[30vw] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm cursor-pointer min-w-[200px] flex-shrink-0">
        <div class="relative h-28">
          <img src={restaurant.image} alt={restaurant.name} class="w-full h-full object-cover" />
        <div class="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Icon name="Star" size={12} class="text-yellow-400 fill-yellow-400" />
          <span class="text-xs font-medium text-slate-900 dark:text-white">{restaurant.rating}</span>
        </div> 
      </div>
      <div class="p-3">
        <h4 class="text-lg truncate font-semibold text-slate-900 dark:text-white text-sm">{restaurant.name}</h4>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {restaurant.cuisine}
        </p>
        <div class="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <Icon name="Clock" size={12} />
          <span>{restaurant.deliveryTime}</span>
          <span class="text-gray-300 dark:text-gray-600">|</span>
          <Icon name="MapPin" size={12} />
          <span>{restaurant.location.address}</span>
        </div>
      </div>
    </div>
  </div>
</div>

  <div class="px-4 py-2 pb-24">
    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Recommended</h3>
    <div class="space-y-4 p-1" $for={product in products()}>
      <>
        <HorizontalCard item={product} />
      </>
    </div>
  </div>
</div>

}

function HorizontalCard( { 
  item
}) {
  const isSoldOut = !item.isAvailable
return <div class={`group relative flex gap-4 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 ease-out ${isSoldOut ? 'opacity-70 cursor-not-allowed grayscale-[0.8]': 'cursor-pointer hover:border-orange-100 dark:hover:border-slate-600'} `}>
  <div class="relative shrink-0">
    <img src={item.image} alt={item.name} class="w-24 h-24 rounded-xl object-cover bg-slate-100 dark:bg-slate-700" />
    <div $if={isSoldOut} class="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center backdrop-blur-[1px]">
      
      <Icon name="PackageX" size={20} class="text-white drop-shadow-md" />
    </div>
  </div>
  <div class="flex-1 flex flex-col justify-between py-1 min-w-0">
    <div>
      <div class="flex justify-between items-start gap-2">
        <h4 class="font-bold text-lg leading-tight text-slate-800 dark:text-slate-100 truncate pr-2">
          {item.name}
        </h4>
        <span class={`shrink-0 font-bold text-base ${isSoldOut ? 'text-slate-400': 'text-orange-600 dark:text-orange-400'}`}>Rs. {item.price.toFixed(0)}
        </span>
      </div>
      
      <div class="flex items-center gap-1.5 mt-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
        <Icon name="Store" size={14} class="shrink-0" />
        <span class="truncate">{item.restaurantName}</span>
      </div>
    </div>
    <div class="flex items-end justify-between mt-2">
      <span $if={isSoldOut} class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">Sold Out</span>
      <div $if={!isSoldOut} class="text-xs font-medium text-orange-600/80 dark:text-orange-400/80 flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Order Now
          <Icon name="ChevronRight" size={14} />
       </div>
    </div>
  </div>
</div>
}

function HeroCard() {
  const x = motionValue(0);
  const y = motionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ perspective: 1000 }}
      class="w-full h-48 sm:h-56"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileTap={{ scale: 0.98 }}
        class="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl shadow-orange-500/20 cursor-pointer"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div class="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600" />
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div class="relative z-10 p-8 h-full flex flex-col justify-center items-start">
          <span class="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
            Promo
          </span>
          <h2 class="text-3xl font-black text-white leading-none mb-1">Free Lunch</h2>
          <p class="text-orange-100 text-sm font-medium mb-4">On orders over $25</p>
          <button class="bg-white text-orange-600 px-5 py-2 rounded-xl text-xs font-bold shadow-lg">Order Now</button>
        </div>

        <motion.div 
          style={{ 
            x: useTransform(x, [-100, 100], [-15, 15]), 
            y: useTransform(y, [-100, 100], [-15, 15]) 
          }}
          class="absolute -right-5 bottom-0 w-44 h-44"
        >
          <img src={burgerImg} alt="Hero" class="w-full h-full object-contain drop-shadow-2xl "/>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 

