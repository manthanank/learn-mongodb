import { Request, Response } from 'express';
import { ESRAnalysisResult } from '../types.js';

export function analyzeIndexFitness(req: Request, res: Response): void {
  const { filter, sort, collection } = req.body || {};

  const equalityFields: string[] = [];
  const rangeFields: string[] = [];
  const sortFields: string[] = [];

  if (filter && typeof filter === 'object') {
    for (const [key, value] of Object.entries(filter)) {
      if (typeof value === 'object' && value !== null) {
        const subOps = Object.keys(value);
        if (subOps.some(op => ['$gt', '$gte', '$lt', '$lte', '$in', '$nin', '$regex'].includes(op))) {
          rangeFields.push(key);
        } else {
          equalityFields.push(key);
        }
      } else {
        equalityFields.push(key);
      }
    }
  }

  if (sort && typeof sort === 'object') {
    for (const key of Object.keys(sort)) {
      sortFields.push(key);
    }
  }

  // Construct recommended compound index according to ESR rule:
  // 1. Equality fields first
  // 2. Sort fields second
  // 3. Range fields last
  const recommendedIndex: Record<string, 1 | -1> = {};

  for (const f of equalityFields) {
    recommendedIndex[f] = 1;
  }
  for (const f of sortFields) {
    if (!recommendedIndex[f]) {
      recommendedIndex[f] = ((sort as Record<string, number>)[f] === -1 ? -1 : 1) as 1 | -1;
    }
  }
  for (const f of rangeFields) {
    if (!recommendedIndex[f]) {
      recommendedIndex[f] = 1;
    }
  }

  const result: ESRAnalysisResult = {
    collection: collection || 'users',
    query: {
      equalityFields,
      sortFields,
      rangeFields
    },
    recommendedIndex,
    ruleExplanation:
      'Following the ESR (Equality, Sort, Range) rule, Equality predicates filter candidate keys first; Sort fields allow the storage engine to return results in pre-sorted B-tree order without an in-memory blocking SORT stage; Range predicates scan the final subset.',
    score: Object.keys(recommendedIndex).length > 0 ? 100 : 50
  };

  res.json({ success: true, analysis: result });
}
