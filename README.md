# **NPM**:

1. `git clone` repository
2. `npm i` to install dependencies
3. [Install prerequisites](#install-prerequisites)
   - [MongoDB](#MongoDB)
   - [.env](#.env) file
4. `npm start` to load local server (default port: `8080`)

# **Install prerequisites**:

## **MongoDB**:

1. Register account on `https://cloud.mongodb.com`
2. Create cluster on any FREE-TIER server

   ![cluster1](/assets/clusters-1.png)

   ![cluster2](/assets/clusters-2.png)

3. Create User in `Database Access` and give him `readWriteAnyDatabase` privileges

   ![atlas-1](/assets/atlas-1.png)

   ![atlas-2](/assets/database-access-1.png)

   ![atlas-3](/assets/database-access-2.png)

4. Add your current IP to `Network Access` in order to let your local server be able to connect to database.

   ![network1](/assets/network-access-1.png)

   ![network2](/assets/network-access-2.png)

> In order to view data in database you can use [MongoDB Compass Community](https://www.mongodb.com/download-center/compass)

5. To connect your app to databse, copy link from `connect` menu:

   ![connect1](/assets/connect-1.png)

   ![connect2](/assets/connect-2.png)

   ![connect3](/assets/connect-3.png)

   ```
   mongodb+srv://<username>:<password>@some-link-to-db.azure.mongodb.net/<collection-name>?retryWrites=true&w=majority
   ```

   - `username` - your created user's name
   - `password` - your created user's password
   - `collection-name` - name of your documents collection (basically name of your database root)

   - > omit symbols in actual settings "**\<**", "**\>**" !

## **.env**

in root directory create `.env` file with link from _MongoDB Cluster_ and _JWT Secret_

```
MONGO_URI=mongodb+srv://<username>:<password>@some-link-to-db.azure.mongodb.net/<collection-name>?retryWrites=true&w=majority
JWT_SECRET=<some-secured-key>
```
