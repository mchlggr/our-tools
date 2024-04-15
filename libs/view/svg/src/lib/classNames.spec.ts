import { cnEngaged, cnLayer } from './classNames';
import { renderRectangleSelected, userColors, userIdA } from '@our-tools/view-example';

describe('cnEngaged function', () => {

  it('should map each user ID to a formatted string', () => {
    const type = 'rectangle';
    const key = 'selecting';
    const ids = ['user1', 'user2', 'user3'];
    const color = {
      user1: 'red',
      user2: 'green',
      user3: 'blue',
    };

    const result = cnEngaged(type, key, ids, color);

    expect(result).toEqual([
      `selecting-rectangle-red`,
      `selecting-rectangle-green`,
      `selecting-rectangle-blue`
    ]);
  });

  it('should assert when key is not engaging', () => {
    cnEngaged('type', 'badKey', ['userId'], {});
  });
});

describe('cnLayer function', () => {
  it('should return correct class names based on props', () => {
    const result = cnLayer(renderRectangleSelected);

    expect(result).toEqual('selecting-rectangle-red');
    expect(result).not.toContain('hinting');
    expect(result).not.toContain('locking');
    expect(result).not.toContain('packing');
    expect(result).not.toContain('editing');
    expect(result).not.toContain('cropping');
    expect(result).not.toContain('focusing');
  });
});
