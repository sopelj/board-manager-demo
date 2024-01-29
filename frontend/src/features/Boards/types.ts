export interface Board {
  id: number;
  name: string;
  ownerId: number;
  backgroundUrl: string;
  created: Date;
}

export interface List {
  id: number;
  boardId: number;
  name: string;
  color: string;
  ownerId: number;
  created: Date;
}

export interface Card {
  id: number;
  listId: number;
  content: string;
}
