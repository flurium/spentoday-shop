# Spentoday shop

Frontend for each shop.

## Developing

Clone the repository:

```bash
git clone https://github.com/flurium/spentoday-shop.git
```

Get inside of folder:

```bash
cd spentoday-shop
```

Use dev branch:

```bash
git checkout dev
```

From install dependencies:

```bash
npm install
```

Set environment variable on your machine, so it works with local backend.
Not in .env file, but in machine settings.

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Setup .env file with such variables:

```bash
PUBLIC_API_URL=https://localhost:44303
```

Start development server:

```bash
npm run dev
```

And run next command to watch for code changes and generate types when changes appear:

```bash
npm run check:watch
```
