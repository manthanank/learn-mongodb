# Junie AI Guidelines - learn-mongodb

## Instructions
- Ensure zero breaking changes across REST APIs (`/api/users`, `/api/aggregate`, `/api/index-analyzer`, `/api/health`).
- Vitest tests must pass without external environment variables.
- Keep TypeScript types in `src/types.ts` synchronized with Mongoose schemas in `src/models/userModel.ts`.
