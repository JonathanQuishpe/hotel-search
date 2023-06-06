<template>
  <div class="hotel">
    <h3>Mejor oferta</h3>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ hotel.name }}
        </h5>
        <div class="img">
          <img :src="hotel.img" />
        </div>
        <div class="card-text">
          <span class="text-muted">Calificación: </span>
          <span class="rating" v-for="n in hotel.rating - 1" :key="n">&#9733;</span>
        </div>
        <div class="card-text">
          <span class="text-muted">Precio: </span>
          {{ getHotelPrice() }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hotel: {
      type: Object,
      required: true,
    },
    customerType: {
      type: String,
      required: true,
    }
  },
  methods: {
    getHotelPrice() {
      const rates = this.customerType === 'regular' ? this.hotel.weekdayRates : this.hotel.weekendRates;
      return rates[this.customerType];
    },
  }
}
</script>
<style>
h3 {
  text-align: center;
}

.hotel {
  width: 100%;
  text-align: center;
  line-height: 0.4rem;
}

.img {
  width: 100%;
}

img {
  width: 50%;
}

.card {
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  margin-top: 10px;
}

.text-muted {
  color: #6c757d;
}

.rating {
  color: orange;
}

.price {
  font-weight: bold;
}
h5 {
  color: rgb(60, 60, 222);
}
</style>