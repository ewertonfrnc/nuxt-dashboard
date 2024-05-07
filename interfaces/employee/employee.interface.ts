export type WorkLog = {
  date: string;
  total: string;
  negative: boolean;
  pendingFix: boolean;
  approved?: boolean;
  title: string;
  motive: string;
  beforeTotal: {
    negative: boolean;
    total: string;
  };
  afterTotal: {
    negative: boolean;
    total: string;
  };
  beforeHours: Array<{ in: string; out: string }>;
  afterHours: Array<{
    in: string;
    out: string;
    changedIn: boolean;
    changedOut: boolean;
  }>;
};

export type EmployeeAdjusts = {
  id: number;
  dateToAdjust: string;
  requestDate: string;
  status: string;
  requests: WorkLog[];
};
