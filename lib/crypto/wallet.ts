import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

export function getPublicKey(privateKey: string) {
  if (privateKey.length !== 0) {
    return toHex(secp256k1.getPublicKey(privateKey));
  }
}

export function getWalletId(publicKey: string) {
  const remaining = utf8ToBytes(publicKey.slice(1, publicKey.length));
  const hash = keccak256(remaining);
  return toHex(hash.slice(hash.length - 20, hash.length));
}
