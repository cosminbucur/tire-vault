### React + Vite + TypeScript

```sh
# create react app
pnpm create vite@latest my-app --template react-ts
cd my-app

# install dependencies
pnpm install
```

### ui components: shadcn
```sh
# shadcn
pnpm add -D shadcn-ui
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest init -d
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add \
  button \
  avatar \
  dropdown-menu \
  label \
  form \
  radio-group \
  popover \
  command \
  separator \
  -y
```

### css: tailwindcss
```sh
pnpm add -D @tailwindcss/vite
```

### persistence: supabase
```sh
# supabase client
pnpm add @supabase/supabase-js

# supabase cli
pnpm add -D supabase

# init supabase
pnpm exec supabase init
pnpm exec supabase start

# .env.local
VITE_SUPABASE_URL=https://<project_id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### desktop app: electron
```sh
# electron
pnpm add -D electron vite-plugin-electron vite-plugin-electron-renderer
pnpm add -D electron-builder

pnpm tsc --noEmit
```

### dev: run the app

```sh
pnpm dev
```

### prod: build and deploy

```sh
pnpm run build
pnpm run electron:build
pnpm run electron:deploy
```
