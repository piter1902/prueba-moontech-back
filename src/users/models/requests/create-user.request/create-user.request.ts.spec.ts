import { CreateUserRequest } from './create-user.request.js';

describe('CreateUserRequestTs', () => {
  it('should be defined', () => {
    expect(new CreateUserRequest()).toBeDefined();
  });
});
