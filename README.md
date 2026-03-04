# Initial setup

```sh
# create react app
pnpm create vite@latest my-app --template react
cd my-app

# install dependencies
pnpm install

# typescript
pnpm add -D typescript
npx tsc --init

# shadcn
pnpm add -D shadcn-ui
npx shadcn@latest init -d
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest init -d
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add button -y
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add avatar dropdown-menu -y
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add label form -y
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add radio-group popover command separator -y

# supabase client
pnpm add @supabase/supabase-js

# supabase cli
pnpm add -D supabase

# init supabase
pnpm exec supabase init
pnpm exec supabase start

# tailwindcss
pnpm add -D @tailwindcss/vite

# run
pnpm run dev

# .env.local
VITE_SUPABASE_URL=https://<project_id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=
```

======================================================================================

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
