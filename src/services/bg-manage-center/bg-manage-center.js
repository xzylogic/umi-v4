import request from '@/utils/request';

export async function componentUsedRecordsService(params) {
  console.log(params);
  // return request('/dev/center/component-used-records', {
  //   method: 'POST',
  //   data: params,
  // });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
