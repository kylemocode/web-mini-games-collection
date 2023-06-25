import { NextApiRequest, NextApiResponse } from 'next';

const ERROR_CODE = 503;
const OK_CODE = 200;

const header = { 'Content-Type': 'application/json' };
const error_res = JSON.stringify({ statusCode: ERROR_CODE, message: 'not ok' });
const ok_res = JSON.stringify({ statusCode: OK_CODE, message: 'ok' });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const isSIGTERM = process.env.SIGTERM_RECEIVED === 'true';
  const code = isSIGTERM ? ERROR_CODE : OK_CODE;
  const respond = isSIGTERM ? error_res : ok_res;
  res?.writeHead(code, header).end(respond);
}
