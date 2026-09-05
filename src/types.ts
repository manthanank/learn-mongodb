export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  address?: Address;
  phoneNumber?: string;
  isActive: boolean;
  registrationDate?: Date;
  tags?: string[];
  department?: string;
  salary?: number;
}

export interface AggregationStage {
  $match?: Record<string, unknown>;
  $group?: Record<string, unknown>;
  $sort?: Record<string, 1 | -1>;
  $project?: Record<string, unknown>;
  $limit?: number;
  $skip?: number;
  $unwind?: string;
}

export interface ESRAnalysisResult {
  collection: string;
  query: {
    equalityFields: string[];
    sortFields: string[];
    rangeFields: string[];
  };
  recommendedIndex: Record<string, 1 | -1>;
  ruleExplanation: string;
  score: number;
}
