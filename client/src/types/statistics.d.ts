export interface StatisticDates {
  creator: string;
  duration: string;
  shuffled: FilteredStatisticDates[];
  timestamp: string;
}

export interface Statuses {
  correct: boolean;
  uncertation: boolean;
  incorrect: boolean;
}

export interface FilteredStatisticDates {
  description: string;
  statuses: Statuses | any | string;
  topic: string;
  timestamp: string;
}

export interface Chart {
  day: string;
  value: number | undefined;
}

export interface Column {
  Header: string;
  accessor: string;
}
