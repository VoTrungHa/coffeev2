export interface PRODUCT {
  id: string;
  name: string;
  image: string;
  category: string;
  attributes: Array<attribute>;
  descript: string;
  size?: string;
  completed?:boolean;
}

export interface attribute {
  size: string;
  price: string;
}

export interface CONTENTS_LIST_WIDTH {
  name: string;
  width: string;
  key?: string;
}
