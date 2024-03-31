import { uuid } from './uuid';
import { nanoid } from 'nanoid';

import { vitest, Mock } from 'vitest';

vitest.mock('nanoid')
describe('UUID generation', () => {
  it('generates a UUID with a given type', () => {
    (nanoid as Mock).mockReturnValue('DgghWoyVRp5hauPKwVXaS');
    const result = uuid('mockedType');
    expect(result).toBe('mockedType:DgghWoyVRp5hauPKwVXaS');
  });

  it('generates unique UUIDs for different types', () => {
    (nanoid as Mock).mockReturnValueOnce('vgib-xAjkeORuy6IhtT-B').mockReturnValueOnce('_c61NiH8XHxG6nM9cQvC6');
    const result1 = uuid('mockedType1');
    const result2 = uuid('mockedType2');
    expect(result1).not.toBe(result2);
  });

  it('generates unique UUIDs for the same type', () => {
    (nanoid as Mock).mockReturnValueOnce('iKeBx7kVtR27aiqj1ps7a').mockReturnValueOnce('FnOBGthkR-I0I2d4b_khk');
    const result1 = uuid('mockedType');
    const result2 = uuid('mockedType');
    expect(result1).not.toBe(result2);
  });
});

