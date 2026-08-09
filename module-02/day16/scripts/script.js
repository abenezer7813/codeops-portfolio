'use strict'

const billRaw ="567"
const bill=Number(billRaw)
const partySize=5;
 let totoal, perPerson,tip=0
if(bill>300){
    tip=(bill*10)/100
    totoal=bill+tip
    perPerson=totoal/partySize

}else{
    tip=(bill*5)/100
    totoal=bill+tip
    perPerson=totoal/partySize

}
console.log(`Total Bill ${totoal} ETB \nPer-Person ${perPerson} ETB`)