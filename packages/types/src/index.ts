enum SigningErrors {
  UnableToVerify = "Signing verification failed",
  NotSupported = "Sign type not supported",
}

enum OtherErrors {
  WrongPassword = "Key derivation failed - possibly wrong passphrase",
}

enum KeyringErrors {
  MnemonicExists = "Mnemonic already exists",
  NotInitialized = "Key ring not initialized",
  NoPassword = "No password set",
  AddressExists = "Address already exists",
  AddressDoesntExists = "Address doesnt exists in the keyring",
  Locked = "Keyring locked",
}

enum SignerType {
  ecdsa = "ecdsa", // polkadot
  ed25519 = "ed25519", // polkadot
  sr25519 = "sr25519", // polkadot
  secp256k1 = "secp256k1", // ethereum
}

interface KeyRecordAdd {
  name: string;
  basePath: string;
  type: SignerType;
}

interface KeyRecord extends KeyRecordAdd {
  address: string;
  publicKey: string;
  pathIndex: number;
}

interface KeyPair {
  address?: string;
  privateKey: string;
  publicKey: string;
}

interface SignerInterface {
  sign: (
    msgHash: string,
    keypair: KeyPair,
    options?: unknown
  ) => Promise<string>;
  verify: (
    msgHash: string,
    sig: string,
    publicKey: string,
    options?: unknown
  ) => Promise<boolean>;
  generate: (
    mnemonic: string,
    path: string,
    options?: unknown
  ) => Promise<KeyPair>;
}
const Errors = {
  SigningErrors,
  KeyringErrors,
  OtherErrors,
};

interface EncryptedData {
  ciphertext: string;
  salt: string;
  iv: string;
  version: number;
  mac: string;
}
interface BrowserStorageArea {
  get(
    keys?: null | string | string[] | Record<string, any>
  ): Promise<Record<string, any>>;
  set(items: Record<string, any>): Promise<void>;
  remove(keys: string | string[]): Promise<void>;
  clear(): Promise<void>;
}

interface RPCRequestType {
  method: string;
  params?: Array<any>;
}

interface RPCResponseType {
  result?: any;
  error?: any;
}

interface ProviderError {
  message: string;
  code?: number;
  data?: unknown;
}

type CallbackFunction = (err: ProviderError | null, result?: any) => void;

type NextFunction = () => void;

type MiddlewareFunction = (
  payload: RPCRequestType,
  response: CallbackFunction,
  next: NextFunction
) => void;

interface OnMessageResponse {
  result?: string;
  error?: string;
}
interface SignOptions {
  basePath: string;
  pathIndex: number;
  type: SignerType;
}

export {
  Errors,
  SignerInterface,
  SignerType,
  KeyRecord,
  KeyRecordAdd,
  KeyPair,
  EncryptedData,
  BrowserStorageArea,
  MiddlewareFunction,
  RPCRequestType,
  RPCResponseType,
  CallbackFunction,
  OnMessageResponse,
  SignOptions,
  ProviderError,
};
