import req from '@/utils/req';

const getQiniuToken = () => req.get('/upload')

const uploadFile = (data: any) => req.post('/upload', data)

export {
    getQiniuToken,
    uploadFile
}