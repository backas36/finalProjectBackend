# FAT-CAT-DESSERT

### 簡介
這是 FAT-CAT-DESSERT 的後台，採用 Express 和 Sequelize 開發。

### 建置
1. 執行 npm install 安裝此專案所需的第三方套件
2. 新增 config/config.json，格式為：
```
{
  "development": {
    "username": "test",
    "password": "test",
    "database": "test",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "test",
    "password": "test",
    "database": "test",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "test",
    "password": "test",
    "database": "test",
    "host": "localhost",
    "dialect": "mysql",
  }
}
```
3. 建立環境變數 .env，格式為：
`SECRET=yoursecret`
4. 執行 `npm run migrate` 建立資料庫
5. 執行 `sh seeder.sh` 初始 demo 資料

### 執行
`npm run start`

## 佈署
 `npm run build`

### 專案架構
```
├── config
│   └── config.json        
├── controllers
│   ├── carts.js
│   ├── discounts.js
│   ├── orders.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── index.js              
├── middleware
│   └── auth.js
├── migrations
├── models
│   ├── cart_item.js
│   ├── discount.js
│   ├── index.js
│   ├── order.js
│   ├── product.js
│   ├── transaction.js
│   └── user.js
├── node_modules
├── package.json
├── package-lock.json
├── README.md
└── seeders
```

### [API 文件](https://hackmd.io/@halloju/S1fBL6RLK)

### License
[MIT](https://choosealicense.com/licenses/mit/)