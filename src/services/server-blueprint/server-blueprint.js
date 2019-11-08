import request from '@/utils/request';

export async function componentUsedRecordsService(params) {
  return request('/dev/center/component-used-records', {
    method: 'POST',
    data: params,
  });
}
export async function componentReleaseNotesService(params) {
  return request('/dev/center/component-release-notes', {
    method: 'POST',
    data: params,
  });
}
