const busdata = {
    "bus": {
        "busId": 1,
        "seats": [
            { "seatId": 1, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 2, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 3, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 4, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 5, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 6, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 7, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 8, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 9, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 10, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 11, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 12, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 13, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 14, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 15, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 16, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 17, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 18, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 19, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 20, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 21, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 22, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 23, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 24, "type": "Double", "isAvailable": true, "price": 300 },
            { "seatId": 25, "type": "Single", "isAvailable": true, "price": 500 },
            { "seatId": 26, "type": "Double", "isAvailable": true, "price": 300 },
          
        ]
    }
}



const destinations = {
    Mumbai: {
        value: "mumbai",
        Pune: { distance: 150, pricePerKm: 5 },
        Solapur: { distance: 400, pricePerKm: 4 },
        Latur: { distance: 500, pricePerKm: 3.5 },
    },
    Pune: {
        value: "pune",
        Mumbai: { distance: 150, pricePerKm: 5 },
        Solapur: { distance: 250, pricePerKm: 4 },
        Latur: { distance: 300, pricePerKm: 3.5 },
    },
    Solapur: {
        value: "solapur",
        Mumbai: { distance: 400, pricePerKm: 4 },
        Pune: { distance: 250, pricePerKm: 4 },
        Latur: { distance: 150, pricePerKm: 3 },
    },
    Latur: {
        value: "latur",
        Mumbai: { distance: 500, pricePerKm: 3.5 },
        Pune: { distance: 300, pricePerKm: 3.5 },
        Solapur: { distance: 150, pricePerKm: 3 },
    },
};

export {busdata,destinations}
