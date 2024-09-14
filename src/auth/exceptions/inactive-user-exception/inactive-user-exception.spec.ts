import { InactiveUserException } from './inactive-user-exception';

describe('InactiveUserException', () => {
  it('should be defined', () => {
    expect(new InactiveUserException()).toBeDefined();
  });
});
