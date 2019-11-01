import $ from 'jquery';

const _ling = {
    // 发送请求
    request: function (param) {
        $.ajax({
            type: param.method || 'GET',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                if (200 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (4000 === res.status()) {
                    //    未登录 需要强制登录

                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.msg);
            }
        });
    },
    // 获取URL参数
    getUrlParam: function (name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        const result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
};

export default _ling;
