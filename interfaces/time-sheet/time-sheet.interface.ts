type Filter = { value: string; matchMode: string };

export type QueryParams = {
  page: number;
  global: Filter;
  name: Filter;
  currentBalance: Filter;
  totalRequests: Filter;
};

export type AllClocksParams = {
  page: number;
  limit: number;
  global: Filter;
  tag: Filter;
  name: Filter;
  hour: Filter;
  department: Filter;
};

export type PendingAdjust = {
  data: {
    id: number;
    date: string;
    userId: number;
    dateBalance: string;
  };
};

export type CheckInOut = {
  time: string;
  manipulated: boolean;
};

export type DayDetails = {
  total: string;
  negative: boolean;
  checkins: CheckInOut[];
  checkouts: CheckInOut[];
};

export type Request = {
  id: number;
  date: string;
  negative: boolean;
  approved: boolean;
  before: DayDetails;
  after: DayDetails;
};

export type User = {
  userId: number;
  name: string;
  role: string;
  currentBalance: string;
  totalRequests: number;
  requests: Request[];
};
