export const vehicles = [
    {
        id: 1,
        chesis_number: crypto.randomUUID().slice(0,8),
        model: crypto.randomUUID().slice(0,8),
        date: new Date(),
        price: 400000,
        status: 'in-stock',
    },
    {
        id: 2,
        chesis_number: crypto.randomUUID().slice(0,8),
        model: crypto.randomUUID().slice(0,8),
        date: new Date(),
        price: 375000,
        status: 'sold',
    },
    {
        id: 3,
        chesis_number: crypto.randomUUID().slice(0,8),
        model: crypto.randomUUID().slice(0,8),
        date: new Date(),
        price: 300000,
        status: 'in-emi',
    }
]