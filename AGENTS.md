# AI Agents Guidelines - learn-mongodb

Welcome to the **learn-mongodb** enterprise codebase. This repository houses an interactive MongoDB 8 / Mongoose 8 curriculum, aggregation sandbox, ESR index optimizer, and production patterns.

## Repository Overview & Architecture
- **Language**: TypeScript 5.7+ running on Node.js 20+ with ES Modules (`NodeNext`).
- **Framework**: Express 5 for HTTP APIs with Mongoose 8 for ODM persistence.
- **Resilient Mock Architecture**: `src/db.ts` provides a built-in mock fallback engine that guarantees offline development, continuous integration, and test suite execution without requiring an external MongoDB Atlas cluster.
- **Key Modules**:
  - `src/models/userModel.ts`: Mongoose schema, compound indexes, virtual getters, and pre-save lifecycle hooks.
  - `src/controllers/userController.ts`: RESTful CRUD, query filters, regex search, and faceted pagination.
  - `src/controllers/aggregationController.ts`: Pipeline sandbox supporting multi-stage aggregations (`$match`, `$group`, `$sort`, `$limit`, etc.).
  - `src/controllers/indexAnalyzerController.ts`: ESR (Equality, Sort, Range) rule query and compound index analyzer.
  - `src/server.ts`: Express application bootstrap and static asset routing.
  - `src/server.test.ts`: Vitest test suite with Supertest.

## Agent Development Protocols
1. **Never Assume External Database Availability**: When modifying or adding routes, ensure that code falls back gracefully to `mockDb` when MongoDB is disconnected.
2. **Schema & Indexing Integrity**: When creating or altering Mongoose models, always evaluate index selectivity using the ESR rule (Equality first, Sort second, Range last).
3. **Validation & Typing**: Ensure every payload has rigorous TypeScript types (`src/types.ts`) and Mongoose schema validations.
4. **Testing Requirements**:
   - All changes must have corresponding Vitest tests in `src/server.test.ts`.
   - Run `npm test` and `npm run build` before proposing commits.
5. **No Breaking Changes**: Preserve public REST endpoints (`/api/users`, `/api/aggregate`, `/api/index-analyzer`, `/api/health`).
