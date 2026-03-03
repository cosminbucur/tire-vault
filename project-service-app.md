### Tech

- React
- Vite
- TypeScript
- TailwindCSS
- Shadcn
- Supabase

### User Journey

```mermaid
flowchart LR
    A[Visit App] --> B{Signed In?}
    B -->|No| C[Supabase login]
    C --> D[Dashboard]
    B -->|Yes| D[Dashboard]
    D --> E[Browse All Customer Visits]
```
