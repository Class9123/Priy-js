import {
  Link
} from "priy/router";

<Link href="/Restaurant?id=68f48435585c5ed4091c789f" logMount >
  <div class="bg-white rounded-2xl overflow-hidden border-[1.2px] border-gray-200">

    <div class="relative h-52 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" alt="Bella Italia" class="w-full h-full object-cover" />

    <div class="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"> </path>
      </svg>
      <span class="text-sm font-bold">4.7</span>
    </div>

    <div class="absolute bottom-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-3 py-1.5 shadow-lg">
      <span class="text-sm font-bold">From $15</span>
    </div>
  </div>


  <div class="p-4">
    <h3 class="font-bold text-gray-900 mb-1 text-lg">Bella Italia</h3>
    <p class="text-sm text-gray-500 mb-3 line-clamp-1">
      Authentic Italian cuisine with fresh pasta and wood-fired pizza
    </p>

    <div class="flex items-center gap-2 text-xs text-gray-600">
      <div class="flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span class="font-semibold text-gray-700">25-35 min</span>
      </div>
      <div class="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">@ <span class="font-semibold text-gray-700 italic underline"> Shiv shank </span>
      </div>
    </div>
  </div>
</div>
</Link>