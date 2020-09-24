# hum-face

## 开发

### 环境依赖

- node 8+ LTS
- npm 5+

### 本地开发

```bash
npm install -g commitizen
npm i
npm start
```

### 登录mysql

```bash

mysql -u username -p

```

### 导出sql

```bash

mysqldump -u root -p hum > hum.sql

```

### 导入sql

```bash

create database hum;
mysql -u root  -p hum < hum.sql

```

## 更新日志

- [版本记录](./CHANGELOG.md)
