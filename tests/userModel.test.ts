import { getUserInfo } from '../src/models/userModel';

test('Should connect to the database', async () => {
  const result = await getUserInfo();
  expect(result).toBeDefined();
});
