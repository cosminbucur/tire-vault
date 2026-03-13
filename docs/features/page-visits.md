## Visits Page


## AI

✨ create a visits page where I can see all the visits in a table.
Add a search bar to search visits by license plate.

Display the following columns:
- license plate
- customer name
- services performed
- date
- status


I have grouped all visit-related components into a new `src/components/Visits/` folder and updated the codebase to use this new structure.

### 📁 Refactoring Summary

1.  **Created Folder**: Established `src/components/Visits/` as the new home for visit registration and tracking components.
2.  **File Migration**: Moved the following files from `src/components/` to `src/components/Visits/`:
    *   `Visits.tsx`
    *   `VisitStepper.tsx`
    *   `VisitSummary.tsx`
    *   `CustomerForm.tsx`
    *   `ServiceForm.tsx`
    *   `TireForm.tsx`
3.  **Export Pattern**: Created an `index.tsx` file in the `Visits` folder to provide a clean entry point for both components and their TypeScript types.
4.  **Updated Imports**: Adjusted all import statements in the following files to point to the new location:
    *   `src/App.tsx` (simplified to `import { Visits } from '@/components/Visits'`)
    *   `src/components/Dashboard.tsx`
    *   `src/lib/visitService.ts`
5.  **Named Exports**: Standardized `Visits.tsx` to use a named export (matching other components in the group) for better consistency and re-exporting.

This change improves project organization by isolating the complex visit registration logic from general-purpose components.

---
**Note**: You may temporarily see lint errors in the IDE as it updates its type cache for the moved files. These should resolve themselves as the language server catches up with the new file system structure.