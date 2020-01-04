# express-api-ts-2020

## install prerequisites:

1. Register account on `https://cloud.mongodb.com`
2. Create cluster on any FREE-TIER server

   !(cluster1)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/clusters-1.png?raw=true]

   !(cluster2)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/clusters-2.png?raw=true]

3. Create User in `Database Access` and give him `readWriteAnyDatabase` privileges

   !(atlas-1)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/atlas-1.png?raw=true]

   !(atlas-2)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/database-access-1.png?raw=true]

   !(atlas-3)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/database-access-2.png?raw=true]

4. Add your current IP to `Network Access` in order to let your local server be able to connect to database.

   !(network1)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/network-access-1.png?raw=true]

   !(network2)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/network-access-2.png?raw=true]

> In order to view data in database you can use [MongoDB Compass Community](https://www.mongodb.com/download-center/compass)

5. To connect your app to databse, copy link from `connect` menu:

   !(connect1)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/connect-1.png?raw=true]

   !(connect2)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/connect-2.png?raw=true]

   !(connect3)[https://raw.githubusercontent.com/unclesamrocks/express-api-ts-2020/assets/connect-3.png?raw=true]

   ```
   mongodb+srv://<username>:<password>@some-link-to-db.azure.mongodb.net/<collection-name>?retryWrites=true&w=majority
   ```

   - `username` - your created user's name
   - `password` - your created user's password
   - `collection-name` - name of your documents collection (basically name of your database root)

   - > omit symbols in actual settings "**\<**", "**\>**" !

## how to install:

1. `git clone` repository
2. `npm i` to install dependencies
3. `npm start` to load local server (default port: `8080`)
4. in root directory create `.env` file with link from _MongoDB Cluster_ and _JWT Secret_

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@some-link-to-db.azure.mongodb.net/<collection-name>?retryWrites=true&w=majority
   JWT_SECRET=<some-secured-key>
   ```
