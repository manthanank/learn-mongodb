import mongoose from 'mongoose';
import { IUser } from './types.js';

export const INITIAL_SEED_USERS: IUser[] = [
  {
    _id: '65e9b1f7d8e21a001a111111',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@enterprise.io',
    age: 32,
    gender: 'Other',
    department: 'Engineering',
    salary: 135000,
    tags: ['mongodb', 'typescript', 'architecture'],
    isActive: true,
    address: { street: '100 Tech Blvd', city: 'San Francisco', state: 'CA', zipCode: '94105' },
    registrationDate: new Date('2023-01-15T08:00:00Z')
  },
  {
    _id: '65e9b1f7d8e21a001a222222',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@enterprise.io',
    age: 29,
    gender: 'Female',
    department: 'Engineering',
    salary: 142000,
    tags: ['database', 'distributed-systems', 'golang'],
    isActive: true,
    address: { street: '250 Cloud Way', city: 'Seattle', state: 'WA', zipCode: '98101' },
    registrationDate: new Date('2023-03-20T10:30:00Z')
  },
  {
    _id: '65e9b1f7d8e21a001a333333',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@enterprise.io',
    age: 41,
    gender: 'Male',
    department: 'Data Platforms',
    salary: 165000,
    tags: ['bigdata', 'mongodb', 'performance'],
    isActive: true,
    address: { street: '500 Data Pkwy', city: 'Austin', state: 'TX', zipCode: '78701' },
    registrationDate: new Date('2022-11-10T14:15:00Z')
  },
  {
    _id: '65e9b1f7d8e21a001a444444',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@enterprise.io',
    age: 26,
    gender: 'Female',
    department: 'DevOps',
    salary: 118000,
    tags: ['kubernetes', 'docker', 'ci-cd'],
    isActive: false,
    address: { street: '12 Metro St', city: 'Boston', state: 'MA', zipCode: '02110' },
    registrationDate: new Date('2024-02-01T09:00:00Z')
  },
  {
    _id: '65e9b1f7d8e21a001a555555',
    firstName: 'Devon',
    lastName: 'Taylor',
    email: 'devon.taylor@enterprise.io',
    age: 36,
    gender: 'Male',
    department: 'Engineering',
    salary: 152000,
    tags: ['mongodb', 'microservices', 'nodejs'],
    isActive: true,
    address: { street: '88 Innovation Ave', city: 'New York', state: 'NY', zipCode: '10001' },
    registrationDate: new Date('2023-07-12T11:45:00Z')
  }
];

class MockDbStore {
  private users: IUser[] = JSON.parse(JSON.stringify(INITIAL_SEED_USERS));

  public reset(): void {
    this.users = JSON.parse(JSON.stringify(INITIAL_SEED_USERS));
  }

  public getAll(): IUser[] {
    return [...this.users];
  }

  public getById(id: string): IUser | undefined {
    return this.users.find(u => u._id === id);
  }

  public find(filter: Partial<IUser>): IUser[] {
    return this.users.filter(u => {
      for (const [key, val] of Object.entries(filter)) {
        if (u[key as keyof IUser] !== val) return false;
      }
      return true;
    });
  }

  public create(user: Omit<IUser, '_id'>): IUser {
    const newUser: IUser = {
      _id: '65e9b1f7d8e21a001a' + Math.random().toString(16).substring(2, 8).padStart(6, '0'),
      registrationDate: new Date(),
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  public update(id: string, updateData: Partial<IUser>): IUser | null {
    const index = this.users.findIndex(u => u._id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updateData };
    return this.users[index];
  }

  public delete(id: string): boolean {
    const initialLen = this.users.length;
    this.users = this.users.filter(u => u._id !== id);
    return this.users.length < initialLen;
  }
}

export const mockDb = new MockDbStore();

export async function connectDatabase(): Promise<{ isLive: boolean; uri?: string }> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return { isLive: false };
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    return { isLive: true, uri };
  } catch (err) {
    return { isLive: false };
  }
}
