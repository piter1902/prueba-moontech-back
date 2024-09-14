import { EmailInUseException } from './email-in-use-exception';

describe('EmailInUseException', () => {
  it('should be defined', () => {
    expect(new EmailInUseException()).toBeDefined();
  });
});
