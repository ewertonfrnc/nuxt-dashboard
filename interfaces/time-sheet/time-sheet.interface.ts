export type QueryParams = {
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

export type Check = {
  time: string;
  manipulated: boolean;
};

export type Request = {
  date: string;
  before: {
    total: string;
    checkins: Check[];
    checkouts: Check[];
  };
  after: {
    total: string;
    checkins: Check[];
    checkouts: Check[];
  };
};

export type User = {
  userId: number;
  name: string;
  role: string;
  requests: Request[];
};
