//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const {
  http
} = uni.$u


//获取用户信息
export const getUserInfo = params => http.get('/member/user/get', params)
//修改用户头像
export const updateAvatar = filePath =>
  http.upload('/member/user/update-avatar', {
    name: 'avatarFile',
    fileType: 'image',
    filePath: filePath
  })
//修改用户昵称
export const updateNickname = params => http.put('/member/user/update-nickname', {}, {
  params
})
export const captcha = params => http.get('/api/v1/captcha', params)
// login 登陆
export const login = params => http.post('/api/v1/login', params)
export const getinfo = params => http.get('/api/v1/getinfo', params)
export const menurole = params => http.get('/api/v1/menurole', params)
export const serverconfig = params => http.get('/api/api/serverconfig?cookie=PikiZCsUZ5TGhhrc7yWUo8kWWcMwgQ5G', params)
