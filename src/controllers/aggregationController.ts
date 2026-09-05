import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/userModel.js';
import { mockDb } from '../db.js';

export async function runAggregationSandbox(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { pipeline } = req.body;

    if (!pipeline || !Array.isArray(pipeline)) {
      res.status(400).json({
        success: false,
        error: 'Pipeline must be an array of aggregation stages (e.g. [{ $match: ... }, { $group: ... }])'
      });
      return;
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const results = await UserModel.aggregate(pipeline);
      res.json({
        success: true,
        source: 'mongodb',
        stageCount: pipeline.length,
        results
      });
      return;
    }

    // Interactive simulator for standard stages ($match, $group, $sort, $limit, $project)
    let current = JSON.parse(JSON.stringify(mockDb.getAll()));

    for (const stage of pipeline) {
      const op = Object.keys(stage)[0];
      const val = stage[op];

      if (op === '$match') {
        current = current.filter((doc: Record<string, unknown>) => {
          for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
            if (typeof v === 'object' && v !== null) {
              const subOp = Object.keys(v)[0];
              const subVal = (v as Record<string, unknown>)[subOp];
              if (subOp === '$gte' && (doc[k] as number) < (subVal as number)) return false;
              if (subOp === '$lte' && (doc[k] as number) > (subVal as number)) return false;
              if (subOp === '$gt' && (doc[k] as number) <= (subVal as number)) return false;
              if (subOp === '$lt' && (doc[k] as number) >= (subVal as number)) return false;
              if (subOp === '$ne' && doc[k] === subVal) return false;
            } else if (doc[k] !== v) {
              return false;
            }
          }
          return true;
        });
      } else if (op === '$limit') {
        current = current.slice(0, Number(val));
      } else if (op === '$sort') {
        const [sortKey, sortDir] = Object.entries(val as Record<string, number>)[0];
        current.sort((a: Record<string, any>, b: Record<string, any>) => {
          if (a[sortKey] < b[sortKey]) return sortDir === 1 ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortDir === 1 ? 1 : -1;
          return 0;
        });
      } else if (op === '$group') {
        const idField = (val as { _id?: string })._id;
        const groups: Record<string, { count: number; totalSalary: number; docs: unknown[] }> = {};
        for (const doc of current) {
          const rawKey = idField && idField.startsWith('$') ? doc[idField.slice(1)] : 'all';
          const key = String(rawKey);
          if (!groups[key]) groups[key] = { count: 0, totalSalary: 0, docs: [] };
          groups[key].count += 1;
          groups[key].totalSalary += (doc.salary as number) || 0;
          groups[key].docs.push(doc);
        }
        current = Object.entries(groups).map(([grpId, data]) => ({
          _id: grpId === 'all' ? null : grpId,
          totalUsers: data.count,
          avgSalary: Math.round(data.totalSalary / data.count)
        }));
      }
    }

    res.json({
      success: true,
      source: 'mock-engine',
      stageCount: pipeline.length,
      results: current
    });
  } catch (err) {
    next(err);
  }
}

export function getSamplePipelines(_req: Request, res: Response): void {
  const samples = [
    {
      title: 'Department Salary Analytics',
      description: 'Calculates user count, average salary, minimum and maximum salary per department',
      pipeline: [
        { $match: { isActive: true } },
        {
          $group: {
            _id: '$department',
            totalEmployees: { $sum: 1 },
            avgSalary: { $avg: '$salary' },
            minSalary: { $min: '$salary' },
            maxSalary: { $max: '$salary' }
          }
        },
        { $sort: { avgSalary: -1 } }
      ]
    },
    {
      title: 'Tag Popularity Unwind',
      description: 'Unwinds user skill tags to find the most popular skills across all active engineers',
      pipeline: [
        { $unwind: '$tags' },
        {
          $group: {
            _id: '$tags',
            engineersWithTag: { $sum: 1 }
          }
        },
        { $sort: { engineersWithTag: -1 } },
        { $limit: 10 }
      ]
    },
    {
      title: 'Age Demographics & Geolocation Buckets',
      description: 'Categorizes users into age brackets and summarizes geographic distribution',
      pipeline: [
        {
          $bucket: {
            groupBy: '$age',
            boundaries: [20, 30, 40, 50, 60],
            default: 'Other',
            output: {
              count: { $sum: 1 },
              users: { $push: '$firstName' }
            }
          }
        }
      ]
    }
  ];

  res.json({ success: true, samples });
}
