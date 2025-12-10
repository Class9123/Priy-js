import items from "../globals/cart.js"



<div class="cart bg-[#f4f5fc] min-h-screen">

  <div class="px-4 py-3 text-2xl text-center font-semibold text-gray-900">
    Your Cart
  </div>


  <div class="px-3 pb-40 space-y-3" $for={obj, index in items()}>


    <div class="flex justify-between items-center bg-white rounded-3xl p-3 shadow-sm animate-slideUp">


      <div class="flex flex-row items-center">
        <img
          class="w-16 h-16 rounded-xl object-cover shadow-sm"
          src={obj.thumbnail}
        />

        <div class="ml-3 flex flex-col">
          <span class="font-semibold text-sm text-gray-900">{obj.name}</span>
          <span class="text-xs text-gray-500 mt-0.5">Eat it</span>
          <span class="font-bold text-base text-gray-900 mt-1">{obj.price}</span>
        </div>
      </div>


      <div class="flex items-center gap-1.5 bg-orange-50 rounded-xl px-2.5 py-2 shadow-inner">


        <button
          class="bg-red-500 text-white rounded-lg px-3 py-1.5 text-sm font-semibold  shadow-sm active:scale-90 transition-transform"
        >
          −
        </button>


        <span class="mx-1 min-w-[18px] text-center font-medium text-gray-900  animate-bounceScale">
          {obj.num}
        </span>


        <button
          class="rounded-lg px-3 py-1.5 text-sm font-semibold text-white  shadow-sm active:scale-90 transition-transform bg-gradient-to-br from-orange-500 to-red-500"
        >
          +
        </button>

      </div>
    </div>

  </div>

</div>