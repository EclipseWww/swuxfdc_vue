import axios from 'axios';

// 登录
const login = form => axios.post('/api/v1/user/login', form).then(res => res.data);

// 更改密码
const change = form => axios.post('/api/v1/user/change', form).then(res => res.data);

// 注销
const logout = id =>axios.delete('/api/v1/user/logout',id).then(res => res.data);

// 获取当前用户信息
const getme = id =>axios.get('/api/v1/user/me ',id).then(res => res.data);



// 创建视频
const postKq = form => axios.post('/api/v1/kq/create', form).then(res => res.data);

// 读视频详情
const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data);

// 读取视频列表
const getVideos = (start, limit) => axios.get('/api/v1/videos', { params: { start, limit } }).then(res => res.data);

export {
    getVideos,
    getVideo,
    postKq,
    login,
    change, 
    logout,
    getme
};
