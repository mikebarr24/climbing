# Climbing NI

So welcome to my little project. This has been my baby for the last while and I certainly feel it's growing fast.

## General Info

I've been a climber for quite a few years now and I just decided that I wanted to build an app to help climbers communicate and share information on crags, sectors and routes. I'm Northern Irish so that is where I'm concentrating the bulk of my effort to get the app working.

At some stage I will be looking for people to go out and use this. I understand that that Northern Irish Climbing and developer community may be quite small but if you like both these things, please get in touch.

## Setup

To set up a .env file in the correct place, run the following in your terminal.

```
cp .env.example ./.env
```

Install npm packages for both front end and backend using:

```
npm install --prefix ./api-climbing && npm install --prefix ./frontend-climb
```

You will need to fill out the varous fields for yourself, the most important being JWT_CLIMBING_PRIVATE_KEY.

Make sure you have docker running and use the command:

```
docker compose up
```

This should get everything up and running after setting up the .env file.
