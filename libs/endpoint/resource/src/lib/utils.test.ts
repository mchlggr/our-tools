import { addLinks } from './utils';
// import set from 'lodash/set';

describe('addLinks function', () => {
  let state: any;
  let payload: any;

  beforeEach(() => {
    state = {};
    payload = {
      links: {'self': 'https://api.example.com/1'},
      data: {
        type: 'user',
        id: 'a1'
      },
    };
  });

  it('should do nothing when id is missing', () => {
    delete payload.data.id;
    addLinks(state, payload);
    expect(state).toEqual({});
  });

  it('should add links to corresponding type and id', () => {
    addLinks(state, payload);
    const expectedState = {
      'user': {
        'links': {
          'a1': {'self': 'https://api.example.com/1'},
        },
      },
    };
    expect(state).toEqual(expectedState);
  });
});
