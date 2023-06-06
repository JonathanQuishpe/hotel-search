import { defineStore } from 'pinia'

export const hotelStore = defineStore('hotel', {
    state: () => ({
        hotels: [
            {
                name: 'Lakewood',
                img: 'https://cdn.forbes.com.mx/2020/07/hoteles-Grand-Velas-Resorts-e1596047698604.jpg',
                rating: 3,
                weekdayRates: { regular: 110, reward: 80 },
                weekendRates: { regular: 90, reward: 80 }
            },
            {
                name: 'Bridgewood',
                img: 'https://content.r9cdn.net/himg/62/c0/84/ice-85676218-68620422_3XL-430714.jpg',
                rating: 4,
                weekdayRates: { regular: 160, reward: 110 },
                weekendRates: { regular: 60, reward: 50 }
            },
            {
                name: 'Ridgewood',
                img: 'https://static1.eskypartners.com/travelguide/vancouver-hotels.jpg',
                rating: 5,
                weekdayRates: { regular: 220, reward: 100 },
                weekendRates: { regular: 150, reward: 40 }
            }
        ],
    })

})