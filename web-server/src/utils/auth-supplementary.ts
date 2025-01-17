import { splitEvery } from 'ramda';

import { privateDecrypt, publicEncrypt } from 'crypto';

const CHUNK_SIZE = 127;
export const enc = (data?: string) => {
  const key = Buffer.from(process.env.SECRET_PUBLIC_KEY, 'base64');
  try {
    return data
      ? splitEvery(CHUNK_SIZE, data).map((chunk) =>
          publicEncrypt(key, Buffer.from(chunk)).toString('base64')
        )
      : null;
  } catch (e) {
    return null;
  }
};

export const dec = (chunks: string[]) => {
  const key = Buffer.from(process.env.SECRET_PRIVATE_KEY, 'base64');
  return chunks
    .map((chunk) => privateDecrypt(key, Buffer.from(chunk, 'base64')))
    .join('');
};

export const INTEGRATION_CONFLICT_COLUMNS = ['org_id', 'name'];
