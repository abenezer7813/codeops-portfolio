'use strict'

const billRaw ="567"
const bill=Number(billRaw)
const partySize=5;
const tip=bill>300?bill*0.1:bill*0.05;
const total=bill+tip
const perPerson=total/partySize
console.log(`Total Bill ${total} ETB \nPer-Person ${perPerson} ETB`)