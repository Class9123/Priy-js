import Header from "../components/header.pri"
import CardGroups from "../ui/cardsGroup.pri"
import Card from "../cards/card1.pri"

const dup = [7,5,53,4,8,8,7,7,6,8]


<div class="flex flex-col justify-center items-center bg-[#f4f5fc]">
  <Header />
  <CardGroups />
  
  <div class="px-4 mb-6">
    <div class="mb-3">
      <h2 class="text-lg font-bold text-gray-900">Popular for you</h2>
    </div>
    <div class="grid gap-3" $for= {_ in dup }>
      <Card />
    </div>
  </div>

  <p class="mb-60"></p>
  
</div>