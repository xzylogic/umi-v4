import request from '@/utils/request';

export async function resourceService(params) {
  return request('/service/resource/listPriviledge', {
    method: 'POST',
    data: params,
  });
}
