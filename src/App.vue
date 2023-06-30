<template>
  <div
    class="bg-cover bg-no-repeat bg-cold"
    :class="cityData && cityData.main.temp > 16 ? 'bg-warm' : 'bg-cold'"
  >
    <div id="overlay" class="h-full bg-dark">
      <header class="py-4 text-white">
        <nav
          class="flex w-4/5 m-auto md:justify-between flex-col md:flex-row gap-3"
        >
          <div class="flex gap-2 justify-center">
            <input
              type="text"
              class="bg-input-bg border-none w-64 p-2 outline-none rounded-tl-lg rounded-br-lg capitalize shadow text-white placeholder-white placeholder-opacity-50"
              v-model="cityName"
              placeholder="Enter city name..."
            />
            <button @click="getData" class="tracking-wide">Search</button>
          </div>
          <div class="flex justify-center tracking-wide">
            {{ getDateForToday() }}
          </div>
        </nav>
      </header>
      <div class="w-full h-screen text-white p-6">
        <div v-if="cityData" class="flex flex-col items-center gap-4">
          <div class="flex gap-2">
            <div class="uppercase text-3xl font-bold tracking-wide">
              {{ cityData.name }},
            </div>
            <div class="uppercase text-3xl font-bold">
              {{ cityData.sys.country }}
            </div>
          </div>
          <div class="flex p-6 rounded bg-input-bg bg-opacity-30 shadow">
            <div class="text-3xl font-bold">
              {{ Math.round(cityData.main.temp) }}°C
            </div>
          </div>
          <div class="capitalize font-semibold text-xl">
            {{ cityData.weather[0].main }}
          </div>
          <div class="bg-input-bg px-12 py-2.5 rounded">
            <img :src="weatherIcon" alt="weather icon" class="w-60" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sun from "./assets/sun.png";
import clouds from "./assets/cloudy.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import fog from "./assets/fog.png";
import storm from "./assets/storm.png";

export default {
  name: "App",
  data() {
    return {
      api: "3ba98b4b745fa42c31dff2a783d52b5c",
      cityName: "",
      cityData: null,
      icon: "",
    };
  },
  computed: {
    weatherIcon() {
      switch (this.icon.toLocaleLowerCase()) {
        case "clouds":
          return clouds;
        case "clear":
          return sun;
        case "rain":
          return rain;
        case "snow":
          return snow;
        case "storm":
          return storm;
        case "fog":
          return fog;
        case "mist":
          return fog;
      }
    },
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.api}&units=metric`
        )
        .then((res) => (this.cityData = res.data))
        .then((data) => (this.icon = data.weather[0].main))
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.status);
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      this.cityName = "";
    },
    getDateForToday() {
      const today = new Date();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = months[today.getMonth()];

      const day = days[today.getDay()];
      const timestamp = `${day}, ${today.getDate()} ${month}`;
      return timestamp;
    },
  },
};
</script>
