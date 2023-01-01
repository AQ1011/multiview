import { atom } from "jotai";

export const searchQueryAtom = atom('');

export const multiViewVideoIdsAtom = atom<string[]>(['','','','']);