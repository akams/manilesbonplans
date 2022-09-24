/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from "express";

type RequestUser = {
  user?: any
}
export type RequestEnhance = Request & RequestUser

type BodySignupType = {
  uid: string,
  name: string,
  email: string,
}

export type RequestSignup = {
  body: BodySignupType,
}

type BodyCreateOrderType = {
  deliveryAddressName: string;
  deliveryAddressStreet: string;
  deliveryAddressCity: string;
  deliveryAddressCountry: string;
  deliveryAddressZipCode: string;
  deliveryAddressTel: string;
}

export type RequestCreateOrder = {
  body: BodyCreateOrderType,
  user?: any
}

type QueryProducts = {
  brands: string,
  category?: string,
  last?: string,
}

export type RequestQueryProducts = {
  query: QueryProducts,
}

/**
 * Key = taille , nb restant        
 * example {[44]: 3}, {[43]: 0}, {[42]: 5}
 * taille -> nb restant
 */
export type Size = {
  [key: number]: number;
}

export type GlobalProduct = {
  id: string;
  name: string; // ex: tennis
  brand: string;
  amount: number;
  oldPrice: string | number;
  currency: string;
  imgSrc: string;
  cloudTag: string[]; // categorie;categorie_general; ex: botte dhiver;botte
  gender: string;
  size?: Size;
  quantity?: number;
}