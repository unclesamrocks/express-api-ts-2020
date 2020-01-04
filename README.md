# express-api-ts-2020

## install prerequisites:

1. Register account on `https://cloud.mongodb.com`
2. Create cluster on any FREE-TIER server

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/clusters-1.png]

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/clusters-2.png]

3. Create User in `Database Access` and give him `readWriteAnyDatabase` privileges

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/atlas-1.png]

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/database-access-1.png]

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/database-access-2.png]

4. Add your current IP to `Network Access` in order to let your local server be able to connect to database.

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/network-access-1.png]

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/network-access-2.png]

> In order to view data in database you can use [MongoDB Compass Community](https://www.mongodb.com/download-center/compass)

5. To connect your app to databse, copy link from `connect` menu:

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/connect-1.png]

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/connect-2.png]

   !(cluster1)[https://github.com/unclesamrocks/express-api-ts-2020/tree/master/assets/connect-3.png]

   ```
   mongodb+srv://<username>:<password>@some-link-to-db.azure.mongodb.net/<collection-name>?retryWrites=true&w=majority
   ```

   - `username` - your created user's name
   - `password` - your created user's password
   - `collection-name` - name of your documents collection (basically name of your database root)

   > omit symbols in actual settings "**\<**", "**\>**" !

## how to install:

1. `git clone` repository
2. `npm i` to install dependencies
3. `npm start` to load local server (default port: `8080`)
4. in root directory create `.env` file with link from _MongoDB Cluster_ and _JWT Secret_

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@some-link-to-db.azure.mongodb.net/<collection-name>?retryWrites=true&w=majority
   JWT_SECRET=<some-secured-key>
   ```
