import request from '@/utils/request';

export async function menuService(params) {
  return request('/service/resource/listMenu', {
    method: 'POST',
    data: params,
  });
}
