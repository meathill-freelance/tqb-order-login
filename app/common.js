/**
 * Created by meathill on 2017/6/13.
 */
export function validatePhoneNumber(pNo) {
  let reg = /^0?1[34578]\d{9}$/;
  return reg.test(pNo);
}
