<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Code conventions

- Write all code identifiers in **English** (files, folders, components, hooks, types, variables, functions, props).
- Keep **user-facing text in Portuguese** (labels, titles, messages, toasts, placeholders, mock data values).
- Routes/URLs stay in Portuguese (e.g. `/convenio`, `/laudo`) since they are user-facing.
- One component per file. Composite components live in a folder whose `index.tsx` is the parent and children in their own files.
- State/logic belongs in `_hooks`, form validation in `_schemas` (zod + react-hook-form), shared primitives in `components/ui`.
