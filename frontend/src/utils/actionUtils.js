export const createAsyncResourceActionType = actionName => ['STARTED', 'FAILED', 'SUCCESS']
  .reduce((acc, status) => ({ ...acc, [status]: `resource/${actionName}/${status}` }), {});

export const createAction = type => (payload, meta = {}) => ({
  type, payload, meta, error: type.endsWith('FAILED') ? true : undefined,
});

export const createAsyncRequestAction = (actionType, requestFn) =>
  (key, payload = {}, _meta = {}) => (dispatch) => {
    const meta = { ..._meta, key, url: (_meta.url || key) };
    dispatch(createAction(actionType.STARTED)(payload, meta));
    return requestFn(payload, meta)
      .then((response) => {
        dispatch(createAction(actionType.SUCCESS)(response, meta));
        return response;
      })
      .catch((error) => {
        dispatch(createAction(actionType.FAILED)(error, meta));
        throw error;
      });
  };