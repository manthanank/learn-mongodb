import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/userModel.js';
import { mockDb } from '../db.js';
import { IUser } from '../types.js';

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(req.query.pageSize as string) || 10));
    const department = req.query.department as string;
    const search = req.query.search as string;

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const filter: Record<string, unknown> = {};
      if (department) filter.department = department;
      if (search) {
        filter.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      const total = await UserModel.countDocuments(filter);
      const data = await UserModel.find(filter)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ registrationDate: -1 });

      res.json({
        success: true,
        source: 'mongodb',
        meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        data
      });
      return;
    }

    // Mock store fallback
    let all = mockDb.getAll();
    if (department) {
      all = all.filter(u => u.department?.toLowerCase() === department.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      all = all.filter(
        u =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    const total = all.length;
    const data = all.slice((page - 1) * pageSize, page * pageSize);

    res.json({
      success: true,
      source: 'mock-engine',
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
      data
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params.id);
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected && mongoose.isValidObjectId(id)) {
      const user = await UserModel.findById(id);
      if (!user) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }
      res.json({ success: true, source: 'mongodb', data: user });
      return;
    }

    const mockUser = mockDb.getById(id);
    if (!mockUser) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, source: 'mock-engine', data: mockUser });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { firstName, lastName, email, age, gender, department, salary, tags, address, phoneNumber } = req.body;

    if (!firstName || !lastName || !email) {
      res.status(400).json({ success: false, error: 'firstName, lastName, and email are required' });
      return;
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const existing = await UserModel.findOne({ email: email.toLowerCase() });
      if (existing) {
        res.status(409).json({ success: false, error: 'Email already exists' });
        return;
      }

      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        age,
        gender,
        department,
        salary,
        tags,
        address,
        phoneNumber
      });

      res.status(201).json({ success: true, source: 'mongodb', data: newUser });
      return;
    }

    const existingMock = mockDb.find({ email: email.toLowerCase() });
    if (existingMock.length > 0) {
      res.status(409).json({ success: false, error: 'Email already exists' });
      return;
    }

    const created = mockDb.create({
      firstName,
      lastName,
      email,
      age,
      gender,
      department: department || 'General',
      salary: salary || 0,
      tags: tags || [],
      address,
      phoneNumber,
      isActive: true
    });

    res.status(201).json({ success: true, source: 'mock-engine', data: created });
  } catch (err) {
    next(err);
  }
}

export async function updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params.id);
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected && mongoose.isValidObjectId(id)) {
      const updated = await UserModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }
      res.json({ success: true, source: 'mongodb', data: updated });
      return;
    }

    const updatedMock = mockDb.update(id, req.body);
    if (!updatedMock) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, source: 'mock-engine', data: updatedMock });
  } catch (err) {
    next(err);
  }
}

export async function deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params.id);
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected && mongoose.isValidObjectId(id)) {
      const deleted = await UserModel.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }
      res.json({ success: true, message: 'User deleted successfully' });
      return;
    }

    const success = mockDb.delete(id);
    if (!success) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getFacetedUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(req.query.pageSize as string) || 10));

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const results = await UserModel.aggregate([
        {
          $facet: {
            metadata: [{ $count: 'totalCount' }],
            data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
            departmentStats: [
              {
                $group: {
                  _id: '$department',
                  count: { $sum: 1 },
                  avgSalary: { $avg: '$salary' }
                }
              }
            ]
          }
        }
      ]);

      res.json({ success: true, source: 'mongodb', result: results[0] });
      return;
    }

    // Mock aggregation simulation
    const all = mockDb.getAll();
    const data = all.slice((page - 1) * pageSize, page * pageSize);
    const deptMap: Record<string, { count: number; totalSalary: number }> = {};

    for (const u of all) {
      const dept = u.department || 'Unknown';
      if (!deptMap[dept]) deptMap[dept] = { count: 0, totalSalary: 0 };
      deptMap[dept].count += 1;
      deptMap[dept].totalSalary += u.salary || 0;
    }

    const departmentStats = Object.entries(deptMap).map(([dept, stat]) => ({
      _id: dept,
      count: stat.count,
      avgSalary: stat.count > 0 ? Math.round(stat.totalSalary / stat.count) : 0
    }));

    res.json({
      success: true,
      source: 'mock-engine',
      result: {
        metadata: [{ totalCount: all.length }],
        data,
        departmentStats
      }
    });
  } catch (err) {
    next(err);
  }
}
