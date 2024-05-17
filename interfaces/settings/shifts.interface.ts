export type Interval = {
  start: string;
  end: string;
};

export type Shift = {
  title: string;
  total: string;
  intervals: Interval[];
};

export type WeeklySchedule = {
  monday: Shift;
  tuesday: Shift;
  wednesday: Shift;
  thursday: Shift;
  friday: Shift;
  saturday: Shift;
  sunday: Shift;
};
