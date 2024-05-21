import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js'
import db from "@/db/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSignature(message:any) {
      const secretKey = "8gBm/:&EnhH.1/q";
      const hash = CryptoJS.HmacSHA256(message, secretKey);
      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      return hashInBase64;
    }

