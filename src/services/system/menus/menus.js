import request from '@/utils/request';

export async function menuService(params) {
  return request('/resource/listMenu', {
    method: 'POST',
    data: params,
  });
}
