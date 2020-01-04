# express-api-ts-2020

## install prerequisites:

1. Register account on `https://cloud.mongodb.com`
2. Create cluster on any FREE-TIER server

   !(cluster1)[/assets/clusters-1.png]

   !(cluster1)[/assets/clusters-2.png]

3. Create User in `Database Access` and give him `readWriteAnyDatabase` privileges

   !(cluster1)[/assets/atlas-1.png]

   !(cluster1)[/assets/database-access-1.png]

   !(cluster1)[/assets/database-access-2.png]

4. Add your current IP to `Network Access` in order to let your local server be able to connect to database.

   !(cluster1)[/assets/network-access-1.png]

   !(cluster1)[/assets/network-access-2.png]

> In order to view data in database you can use [MongoDb Compass Community](https://www.mongodb.com/download-center/compass)

## how to install:

1. `git clone` repository
2. `npm i` to install dependencies
3. `npm start` to load local server (default port: `8080`)
