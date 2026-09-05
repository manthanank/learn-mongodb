# Claude Assistant Guidelines - learn-mongodb

## Commands & Workflows
- **Install Dependencies**: `npm install`
- **Run Development Server**: `npm run dev` (starts tsx watcher on `src/server.ts`)
- **Run Tests**: `npm test` (executes Vitest in single-run mode)
- **Production Build**: `npm run build` (compiles TypeScript to `dist/`)
- **Start Production**: `npm start`

## Code Standards
- Target: ES2022 / NodeNext.
- Always include `.js` extension on relative imports (e.g. `import { UserModel } from './models/userModel.js'`).
- Always check and support offline fallback via `mockDb` when MongoDB connection is not established.
- Write expressive, type-safe Mongoose 8 schemas and aggregation queries.
