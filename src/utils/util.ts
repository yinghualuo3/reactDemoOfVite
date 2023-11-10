// 将base64图片转成file类型
export const base64ToFile = (base64: any, fileName: any) => {
    // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
    let data = base64.split(',');
    // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
    let type = data[0].match(/:(.*?);/)[1];
    // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
    let suffix = type.split('/')[1];
    // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
    const bstr = window.atob(data[1]);
    // 获取解码结果字符串的长度
    let n = bstr.length;
    // 根据解码结果字符串的长度创建一个等长的整形数字数组
    // 但在创建时 所有元素初始值都为 0
    const u8arr = new Uint8Array(n);
    // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
    while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n);
    }
    // 利用构造函数创建File文件对象
    // new File(bits, name, options)
    const file = new File([u8arr], `${fileName}.${suffix}`, {
        type: type,
    });
    // 将File文件对象返回给方法的调用者
    return file;
}


/**
 * 获取上传接口所需的参数
 * @param files  上传组件里面的files 数据
 * @param images  上传组件里面的images 数据
 */
export const getFileParams = (files: any, images?: any) => {
    //如果没有fileList 说明用户没有操作编辑过上传组件
    //那么这个时候数据就在最外层  最外层就是一个数组 直接用最外层的数据循环
    const { fileList } = files || {};
    const imageList = images?.fileList;
    //如果没操作的话就是在最外层的
    return (fileList || files || [])
        ?.map((f: any) => {
            return {
                fileKey: f.fileKey || f.response.data.fileKey,
            };
        })
        .concat(
            (imageList || images || [])?.map((img: any) => {
                return {
                    fileKey: img.fileKey || img.response.data.fileKey,
                };
            }),
        );
};