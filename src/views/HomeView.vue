<template>
  <main class="container">
    <div class="pt-4 mb-8 relative">
      <i class="fa-solid fa-magnifying-glass absolute text-[#3f474a] top-[30px] px-2"></i>
      <input
        type="text"
        placeholder="Search for city ..."
        class="px-10 text-zinc-800 py-2 w-full mb-2 bg-white rounded-lg border-b border-slate-400 focus:border-slate-500 focus:outline-none focus:shadow-xl"
        v-model="searchValue"
        @input="getSearchResults"
      />
      <div
        v-show="searchValue"
        class="px-10 z-9 relative transition-all max-h-[140px] overflow-scroll shadow-md duration-500 text-zinc-800 py-2 w-full bg-white rounded-lg flex-col flex gap-2"
      >
        <p
          v-for="item in searchResults"
          :key="item.id"
          @click="getWeather(item)"
          class="cursor-pointer text-slate-700 hover:text-indigo-500 hover:font-semibold tracking-wide transition-all duration-500"
        >
          {{ `${item.name}, ${item.region ? item.region + ',' : ''} ${item.country}` }}
        </p>
      </div>
      <div class="card-container z-8 top-[100px] text-slate-800 w-full flex justify-center p-4">
        <Transition name="flip">
          <div
            v-if="mainContentIsShow"
            class="card w-[350px] h-[400px] p-4 relative rounded-lg shadow-lg bg-sky-300"
          >
            <div class="card-header h-[30px] flex justify-between text-white">
              <div class="location flex items-center gap-2">
                <i class="fa-solid fa-map-location-dot"></i>
                <p>{{ weatherInfo.location.name }}</p>
              </div>
              <div class="update-time flex items-center gap-2">
                <i class="fa-solid fa-clock"></i>
                <p>{{ weatherInfo.current.last_updated }}</p>
              </div>
            </div>
            <div
              class="card-body text-white w-full h-auto relative py-4 flex flex-col items-center gap-4"
            >
              <div class="h-[80px] img">
                <img :src="weatherInfo.current?.condition?.icon" alt="image" class="h-full" />
              </div>
              <div class="h-5/12 temperature">
                <h2 class="text-[80px] tracking-wider font-bold">
                  {{ `${weatherInfo.current?.temp_c}&deg;` }}
                </h2>
              </div>
              <div class="h-2/12 status font-semibold">
                <h2 class="text-[20px]">
                  {{ weatherInfo.current?.condition?.text }}
                </h2>
              </div>
            </div>
            <div class="card-footer p-4 absolute bottom-0 flex right-0">
              <div
                @click="onFlipCard"
                class="more cursor-pointer flex items-center gap-2 text-gray-200 hover:text-white transition-all duration-300"
              >
                More
                <i class="fa-solid fa-arrow-right-long"></i>
              </div>
            </div>
          </div>

          <div
            v-else
            class="detail w-[350px] h-[400px] p-4 relative rounded-lg shadow-lg bg-sky-300"
          >
            <div class="detail-info">
              <div class="flex mb-2 gap-2 temp">
                <h4 class="font-semibold">Temparature:</h4>
                {{ `${weatherInfo.current?.temp_c} &deg; ` }}
              </div>
              <div class="flex mb-2 gap-2 feel-temp">
                <h4 class="font-semibold">Real feels:</h4>
                {{ `${weatherInfo.current?.feelslike_c} &deg;C ` }}
              </div>
              <div class="flex mb-2 gap-2 wind">
                <h4 class="font-semibold">Wind:</h4>
                {{ `${weatherInfo.current?.wind_mph}Mph ` }}
              </div>
              <div class="flex mb-2 gap-2 wind-degree">
                <h4 class="font-semibold">Wind degree:</h4>
                {{ `${weatherInfo.current?.wind_degree}Mph ` }}
              </div>
              <div class="flex mb-2 gap-2 pressure">
                <h4 class="font-semibold">Real feels:</h4>
                {{ `${weatherInfo.current?.pressure_mb}hPa ` }}
              </div>
              <div class="flex mb-2 gap-2 humidity">
                <h4 class="font-semibold">Humidity:</h4>
                {{ `${weatherInfo.current?.humidity}%` }}
              </div>
              <div class="flex mb-2 gap-2 cloudity">
                <h4 class="font-semibold">Cloud:</h4>
                {{ `${weatherInfo.current?.cloud}%` }}
              </div>
              <div class="flex mb-2 gap-2 uv">
                <h4 class="font-semibold">UV index:</h4>
                {{ `${weatherInfo.current?.cloud}%` }}
              </div>
            </div>
            <div class="card-footer p-4 absolute bottom-0 flex left-0">
              <div
                @click="onFlipCard"
                class="more cursor-pointer flex items-center gap-2 text-gray-200 hover:text-white transition-all duration-300"
              >
                <i class="fa-solid fa-arrow-left-long"></i>
                Back
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'

const searchValue = ref('')
const queryTimeout = ref(null)
const searchResults = ref(null)
const weatherInfo = reactive({
  current: 'null',
  forecast: 'null',
  location: 'null',
})
const mainContentIsShow = ref(true)
const onFlipCard = () => {
  mainContentIsShow.value = !mainContentIsShow.value
}
/**
 * get the city and location on type
 */
const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (!searchValue.value) return
    const result = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=baecfb523603437b9c073552240903&q=${searchValue.value}&aqi=no`,
    )
    searchResults.value = result.data
    return
  }, 300)
}

const getWeather = async (item) => {
  try {
    let response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=baecfb523603437b9c073552240903&q=id:${item.name}&days=3&aqi=no&alerts=no`,
    )
    console.log(response.data)

    const { current, forecast, location } = response.data

    weatherInfo.current = current
    weatherInfo.forecast = forecast
    weatherInfo.location = location
  } catch (err) {
    throw new Error(err)
  }
  searchValue.value = ''
}
</script>

<style scoped>
.flip-enter-active {
  transition: all 0.5s ease-in 0.3s;
}

.flip-leave-active {
  transition: all 0.5s ease-in-out;
}

.flip-enter-from {
  opacity: 0;
  transform: scale(1);
}
.flip-leave-to {
  transform: scale(0);
}
</style>
