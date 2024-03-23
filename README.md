# 参考

https://nestjs.com/
https://docs.nestjs.com/
https://zenn.dev/red_frasco/articles/d5b7ec71ceacf6
https://github.com/tkcel/todo-app-nest-react
https://zenn.dev/morinokami/articles/nestjs-overview

# 準備

## https用の証明書作成

### mkcert

```bash
brew install mkcert
```

### 自己ルート認証局追加

```bash
mkcert -install
```

### 証明書作成

```bash
cd backend
mkcert localhost
```

## インストール

```bash
npm install
```

# 実行

```bash
npm run start:dev
```