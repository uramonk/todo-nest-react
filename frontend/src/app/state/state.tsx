import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const jwtState = atom({
  key: "jwt",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
