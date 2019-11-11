import $ from 'jquery';

// eslint-disable-next-line no-underscore-dangle
const _ling = {
  // 发送请求
  request(param) {
    $.ajax({
      type: param.method || 'GET',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success(res) {
        if (res.status === 200) {
          // eslint-disable-next-line no-unused-expressions
          typeof param.success === 'function' && param.success(res.data, res.msg);
        } else if (res.status() === 4000) {
          //    未登录 需要强制登录

        }
      },
      error(err) {
        // eslint-disable-next-line no-unused-expressions
        typeof param.error === 'function' && param.error(err.msg);
      },
    });
  },
  // 获取URL参数
  getUrlParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const result = window.location.search.substr(1)
      .match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
};

export default _ling;
