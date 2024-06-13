export interface Board {
  id: string;
  name: string;
  ownerId: string;
  backgroundUrl: string;
  created: Date;
}

export interface List {
  id: string;
  boardId: string;
  name: string;
  color: string;
  ownerId: string;
  created: Date;
}

export interface Card {
  id: string;
  listId: string;
  content: string;
}
