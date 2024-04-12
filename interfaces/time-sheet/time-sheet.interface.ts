export type QueryParams = {
  page: number;
  global: { value: string; matchMode: string };
  name: { value: string; matchMode: string };
  currentBalance: { value: string; matchMode: string };
  totalRequests: { value: string; matchMode: string };
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
