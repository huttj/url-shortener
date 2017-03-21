const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';


export default function randomString() {

  const URL_LENGTH = process.env.URL_LENGTH;
  const result = [];

  for (let i = 0; i < URL_LENGTH; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    const char = chars[idx];
    console.log({ char });
    result.push(char);
  }

  return result.join('');
}