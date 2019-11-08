import request from '@/utils/request';

export async function commonModulesService(params) {
  return request('/dev/center/common-modules', {
    method: 'POST',
    data: params,
  });
}
