const bs58check = require('ripple-bs58check')
import { hash160 } from './hash'

const initPayload = (version: number, pubkey: Buffer): Buffer => {
  const payload = Buffer.allocUnsafe(21)
  payload.writeUInt8(version, 0)
  const hash = hash160(pubkey)
  hash.copy(payload, 1)
  return payload
}
  
export const getAddress = (pubkey: Buffer): string => {
  const version = 0x00
  const payload = initPayload(version, pubkey)
  return bs58check.encode(payload)
}

export interface Keypair {
  publicHex: string
  privateHex: string
}

export const exportKeypair = (publicKey: Buffer, privateKey: Buffer ): Keypair => {
  const SECP256K1_PRIKEY_VER = '00'
  const publicHex = publicKey.toString('hex').toUpperCase()
  const privateHex = SECP256K1_PRIKEY_VER + privateKey.toString('hex').toUpperCase()
  return { publicHex, privateHex }
}

