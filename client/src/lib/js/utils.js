export default function calculateVat(price, vat){
    return (((vat / 100 ) * price) + price).toFixed(2);
}