import axios from 'axios';

// 登录
const login = form => axios.post('/api/v1/user/login', form).then(res => res.data);
// 更改密码
const change = form => axios.post('/api/v1/user/change', form).then(res => res.data);
// 用户注册
const register = form => axios.post('/api/v1/user/register', form).then(res => res.data);
// 注销
const logout = id => axios.delete('/api/v1/user/logout', id).then(res => res.data);
// 获取当前用户信息
const getme = id => axios.get('/api/v1/user/me ', id).then(res => res.data);
// 读取用户列表
const getUsers = (start, limit, q_grade, q_classes, q_dept,q_level,q_status) => axios.get('/api/v1/users', { params: { start, limit, q_grade, q_classes, q_dept,q_level,q_status} }).then(res => res.data);
// 更新用户信息
const updateUser = form => axios.put(`/api/v1/user/update`,form).then(res => res.data);
//获取上传凭证
const getToken = id => axios.get('/api/v1/getToken ', id).then(res => res.data);

//
// 创考勤表
const postKq = form => axios.post('/api/v1/kq/create', form).then(res => res.data);
// // 读视频详情
// const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data);
//
// 读取考勤表列表
const getKqs = (start, limit, q_grade, q_classes, q_week) => axios.get('/api/v1/kqs', { params: { start, limit, q_grade, q_classes, q_week} }).then(res => res.data);
// 删除考勤表
const deleteKqs = id => axios.delete(`/api/v1/kq/${id}`).then(res => res.data);

// 读取课程总表列表
const getCourses = (start, limit, q_classes, q_day,q_name) => axios.get('/api/v1/courses', { params: { start, limit,  q_classes, q_day,q_name} }).then(res => res.data);
const deleteCourses = id => axios.delete(`/api/v1/course/${id}`).then(res => res.data);
const updateCourse = form => axios.put(`/api/v1/course/update`,form).then(res => res.data);
const createCourse = form => axios.post('/api/v1/course/create', form).then(res => res.data);
export {
    getKqs,
    deleteKqs,
    // getVideo,
    postKq,
    getCourses,
    deleteCourses,
    updateCourse,
    createCourse,

    register,
    login,
    change,
    logout,
    getme,
    getUsers,
    updateUser,


    getToken
};
