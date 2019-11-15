import request from '@/utils/request';

export async function commonModulesService(params) {
  return request('/service/dev/center/common-modules', {
    method: 'POST',
    data: params,
  });
}

export async function commonSiderListService(params) {
  return request('/service/dev/resource/listPriviledge', {
    method: 'POST',
    data: params,
  });
}
