export interface Content {
  content: string;
  createdAt: string;
  creator: string;
  description: string;
  id: string;
  topics: any[];
  updatedAt: string;
}

export interface ContentParams {
  content: string;
  description: string;
  creator: string;
}
