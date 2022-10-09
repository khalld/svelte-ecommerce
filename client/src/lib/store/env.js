export default {
    host: 'http://localhost:3000',
    status: ["PENDING", "REJECTED", "SHIPPED", "DELIVERED"],
    sales: [    // TODO: create a schema for db
        {
            code: "WELCOME10",
            sale: 20
        },
        {
            code: "EVERYTHINGFREE",
            sale: 15
        }
    ],
    shipment: [
        {
            code: "POSTE-ITALIANE",
            price: 11,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus, lectus malesuada scelerisque gravida, ante felis suscipit eros, ut iaculis elit arcu a libero."
        },
        {
            code: "BARTOLINIEXPRESS",
            price: 8.99,
            description: "Nam nec lorem sed leo posuere commodo. Maecenas efficitur commodo arcu mattis finibus. Aenean id imperdiet enim. In hac habitasse platea dictumst. "
        }
    ]
}