# Mahjong Score Broadcast by LINE Message API

This repository contains a system for broadcasting the Mahjong Score through LINE Message API

## About

You can broadcast the results of Mahjong scores to all users included in the official account using the LINE API. For more details, please refer to the LINE Developer Tools below.

 https://developers.line.biz/en/docs/messaging-api/overview/

## Features

- Today's score results
- Today's rankings

Broadcast this as a message.

## Prerequisite

1. You have to setup majong-backend
see this [repository](https://github.com/tomoki-yamamura/mahjon-backend)

2. Create the LINE official account
see this [specification](https://developers.line.biz/en/docs/line-developers-console/login-account/)

3. You set the credential like below
```
CHANNEL_ACCESS_TOKEN=XXX
CHANNEL_SECRET=XXX
```

## Installation

To install the Mahjong Score Collector, follow these steps:

1. npm i (node >= 18)
2. npm run start

## Test

To run test:

1. npm run test
