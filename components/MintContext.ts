import { createContext } from 'react';

export const MintContext = createContext({
  image: '',
  setImage: (image: string) => {},
  gender: '',
  setGender: (gender: string) => {},
  status: '',
  setStatus: (status: string) => {},
});
