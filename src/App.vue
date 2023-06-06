<template>
  <div class="container">
    <h1 class="text-center">Hotel Reservación</h1>
    <div class="search">
      <div class="row mt-4">
        <label class="col-4">Fechas:</label>
        <div>
          <input type="date" name="date" v-model="date">
        </div>
        <div>
          <button @click="addDate">Agregar fecha</button>
        </div>
      </div>
      <div v-if="selectedDates.length">
        <table>
          <tr v-for="(date, index) in selectedDates" :key="index">
            <td>
              {{ date }}
            </td>
            <td>
              <button @click="deleteDate(index)">Eliminar</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="row mt-4">
        <label class="col-4">Tipo cliente:</label>
        <div>
          <select class="form-control" v-model="customerType">
            <option value="regular">Regular</option>
            <option value="reward">Recompensa</option>
          </select>
        </div>
      </div>
      <div class="row mt-4">
        <button @click="getCheapestHotel" :disabled="!selectedDates.length">
          Buscar
        </button>
        <button @click="cleanSearch" :disabled="!cheapestHotel">
          Limpiar
        </button>
      </div>
    </div>
    <hotel-cheap v-if="cheapestHotel" :hotel="cheapestHotel" :customer-type="customerType" />
  </div>
</template>

<script>
import HotelCheap from './components/HotelCheap.vue';
import { hotelStore } from './store/hotelStore'
export default {
  components: {
    HotelCheap
  },
  data() {
    return {
      date: '',
      customerType: 'regular',
      selectedDates: [],
      cheapestHotel: null,
      hotels: [],
    }
  },
  methods: {
    getHotelPrice(hotel) {
      const rates = this.customerType === 'regular' ? hotel.weekdayRates : hotel.weekendRates;
      return rates[this.customerType];
    },
    getCheapestHotel() {
      if (!this.selectedDates.length) {
        alert('Debes ingresar al menos una fecha');
        return;
      }
      this.cheapestHotel = null;
      let minPrice = null;
      let maxRating = null;

      for (const hotel of this.hotels) {
        const price = this.selectedDates.reduce((total, date) => {
          const isWeekend = ['Saturday', 'Sunday'].includes(new Date(date).toLocaleDateString('en-US', { weekday: 'long' }));
          const rates = isWeekend ? hotel.weekendRates : hotel.weekdayRates;
          return total + rates[this.customerType];
        }, 0);

        if (minPrice === null || price < minPrice || (price === minPrice && hotel.rating > maxRating)) {
          minPrice = price;
          maxRating = hotel.rating;
          this.cheapestHotel = hotel;
        }
      }
    },
    addDate() {
      if (!this.date) {
        return
      }
      this.selectedDates.push(this.date);
      this.date = '';
    },
    deleteDate(i) {
      this.selectedDates.splice(i, 1);
    },
    cleanSearch() {
      this.cheapestHotel = null;
      this.selectedDates = [];
    }
  },
  created() {
    const store = hotelStore();
    this.hotels = store.$state.hotels
  }
}
</script>
<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: solid 1px;
  border-radius: 10px;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}

.row {
  display: flex;
}

.col-4 {
  flex: 0 0 33.33%;
  max-width: 33.33%;
}

.search {
  background: rgb(235, 228, 228);
  padding: 1rem;
  border-radius: 10px;
}

button {
  margin: 0 0.5rem;
}
</style>