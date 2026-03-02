type FetchedData<T> = { 
  data: T | null; 
  isPending: boolean; 
  error: null | Error; 
};

type User = {
  id: bigint,
  name: string,
  age: number
};

export type {FetchedData, User};


