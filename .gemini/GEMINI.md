# Gemini AI Guidelines - learn-mongodb

## Core Principles
1. **Curriculum Excellence**: Ensure all MongoDB examples adhere to MongoDB 8 and Mongoose 8 best practices.
2. **ESR Rule Adherence**: Compound indexes must always position Equality fields first, Sort fields second, and Range fields last.
3. **Resilience First**: Preserve `mockDb` in-memory fallback for disconnected / CI executions.
4. **Testing Integrity**: Ensure all Vitest tests in `src/server.test.ts` pass with 100% success rate.
