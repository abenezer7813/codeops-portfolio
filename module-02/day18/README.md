# TeleBirr Loyalty Points Module

This project is a loyalty-points module for a TeleBirr shop.

## Features

- Earn loyalty points from spending
- Redeem loyalty points
- Check the current points balance
- Prevent the balance from going below zero
- Use a custom earning rule
- Use a holiday rule that doubles the earned points

## How It Works

The module uses a closure to keep the points balance private.

The `points` variable is declared inside the `createLoyalty()` function. Because of the closure, code outside the function cannot directly access or modify the balance.

The balance can only be accessed through the functions provided by the module:

- `earn(amount)` adds points
- `redeem(amount)` subtracts points
- `balance()` returns the current points

## Default Earning Rule

The default rule gives 1 point for every 10 ETB spent.

For example:

250 ETB = 25 points

## Holiday Earning Rule

A different earning rule can be passed to `createLoyalty()`.

The holiday rule doubles the normal points.

For example:

250 ETB = 25 × 2 = 50 points

## Privacy

The points balance is private because it is stored inside the `createLoyalty()` closure.

Outside code cannot do this:

```js
card.points