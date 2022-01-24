export interface ACCOUNT {
  id: string;
  email: string;
  avatar: string;
  nickName: string;
  gender: string;
  password: string;
  phone: string;
  role: string;
  completed?:boolean;
}

export interface CONTENTS_LIST_WIDTH {
  name: string;
  width: string;
  key?: string;
}
