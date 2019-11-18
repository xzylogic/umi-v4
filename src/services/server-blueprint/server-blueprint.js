import request from '@/utils/request';

export async function componentUsedRecordsService(params) {
  return request('/service/dev/center/service-blue-printer', {
    method: 'POST',
    data: params,
  });
}
export async function componentReleaseNotesService(params) {
  return request('/service/dev/center/component-release-notes', {
    method: 'POST',
    data: params,
  });
}
