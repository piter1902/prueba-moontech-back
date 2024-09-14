import { IncorrectLoginException } from './incorrect-login-exception';

describe('IncorrectLoginException', () => {
  it('should be defined', () => {
    expect(new IncorrectLoginException()).toBeDefined();
  });
});
