'use strict'

const billRaw ="567"
const bill=Number(billRaw)
const partySize=5;
const tip=bill>300?bill*0.1:bill*0.05;
const total=bill+tip
const perPerson=total/partySize

switch (serviceProvider.toLowerCase()) {
    case 'telebirr':
        console.log("pay with telebirr")
        break;
    case 'cbebirr':
       console.log('Pay with CBEBirr')
        break;
    default:
        console.log('Pat With Other')
        break;
}
console.log(`Total Bill ${total} ETB \nPer-Person ${perPerson} ETB`)