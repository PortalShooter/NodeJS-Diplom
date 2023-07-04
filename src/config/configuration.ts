export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secretKeyJWT: process.env.SECRET_KEY_JWT || 'asdfasdgqwehjytdagcv234dgaw3',
  KeyHashPassword: process.env.KEY_HASH_PASSWORD || 5,
});
