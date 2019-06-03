const bip39 = require("bip39");
const bip32 = require("bip32");
const onRipple = require('..')
  
const mnemonic = bip39.generateMnemonic(256)
const password = ''

const seed = bip39.mnemonicToSeedSync(mnemonic, password)
const m = bip32.fromSeed(seed)

const BIP44_RIPPLE = "m/44'/144'/0'"
const BIP32_XPRV = m.derivePath(BIP44_RIPPLE).toBase58()
const BIP32_XPUB = m.derivePath(BIP44_RIPPLE).neutered().toBase58()

const BIP44_RIPPLE_FULL = BIP44_RIPPLE + "/0/0"
const node = m.derivePath(BIP44_RIPPLE_FULL)

const keypair = onRipple.util.exportKeypair(node.publicKey, node.privateKey)
const address = onRipple.util.getAddress(node.publicKey)

const info = {
  BIP39_MNEMONIC : mnemonic,
  BIP39_PASSPHRASE: password,
  BIP32_SEED: seed.toString('hex'),
  BIP44_RIPPLE: BIP44_RIPPLE,
  BIP32_XPRV: BIP32_XPRV,
  BIP32_XPUB: BIP32_XPUB,
  BIP44_RIPPLE_ACCOUNT: BIP44_RIPPLE_FULL,
  RIPPLE_PUBKEY: keypair.publicHex,
  RIPPLE_PRIKEY: keypair.privateHex,
  RIPPLE_ADDRESS: address,
}

console.log(JSON.stringify(info, null, 2))
