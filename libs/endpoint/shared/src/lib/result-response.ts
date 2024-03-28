// Types
interface ResultResponse<FailureType extends Error, SuccessType> {
  isSuccess(): boolean;

  isFail(): boolean;

  success(): SuccessType;

  fail(): FailureType;
}

// ---

// Functional Constructors

const makeSuccess = <F extends Error, S>(value: S): ResultResponse<F, S> => {
  return {
    isSuccess: ():boolean => true,
    isFail: ():boolean => false,
    success: (): S => value,
    fail: (): F => {
      throw new Error('Cannot call fail() on success.');
    },
  };
};

const makeFail = <F extends Error, S>(value: F): ResultResponse<F, S> => {
  return {
    isSuccess: ():boolean => false,
    isFail: ():boolean => true,
    success: () : S => {
      throw new Error('Cannot call success() on fail.');
    },
    fail: (): F => value,
  };
};

// ---

// Exports
export { makeSuccess, makeFail, ResultResponse };
