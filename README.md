[Repository](https://github.com/cosminbucur/tire-vault)

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
  avatar \
  button \
  command \
  card \
  dropdown-menu \
  form \
  label \
  popover \
  radio-group \
  select \
  separator \
  scroll-area \
  table \
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
pnpm run build --linux deb --x64

# build for mac
npx electron-builder --mac

# build for windows
npx electron-builder --win

# build for linux
npx electron-builder --linux

# list asar contents
pnpm add -D @electron/asar
npx @electron/asar list dist-electron/release/linux-arm64-unpacked/resources/app.asar > ./output.md

# clean build
pnpm add -D rimraf
```
