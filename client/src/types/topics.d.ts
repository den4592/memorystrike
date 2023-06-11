export interface Topic {
  contentId?: string;
  createdAt?: string;
  description: string;
  id: string;
  topic: string;
  updatedAt?: string;
  timestamp: string;
}

export interface TopicParams {
  topic: string;
  description: string;
  contentId?: string;
}
