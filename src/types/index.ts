
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  content: string;
  date: string;
  featured?: boolean;
  tags?: string[];
}

export interface Location {
  id: string;
  name: string;
  imageUrl: string;
  blogCount: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  content: string;
  location: string;
}
