/*
 * @Author: 蔺文丽 linwenli@travelsky.com.cn
 * @Date: 2023-11-10 14:58:13
 * @LastEditors: 蔺文丽 linwenli@travelsky.com.cn
 * @LastEditTime: 2023-11-10 16:20:25
 * @FilePath: /reactDemoOfVite/src/components/Signature/index.tsx
 * @Description: 手写签名组件
 */
import React, { useEffect, useState, useMemo, useRef } from "react";
import SignaturePad from "signature_pad";
import { Button, message } from "antd";
import styles from "./index.module.less";
import { base64ToFile } from "../../utils/util";
// css modules 样式层级 umi中自带 其他需要自己搭建
// cx 类层级

let signaturePad = null;

const Signature = (props: any) => {
  const { setSignatureMsg } = props;
  const canvasRef = useRef(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    signaturePad = new SignaturePad(canvasRef.current);
  }, []);

  // 重写
  const handleClearSignature = () => {
    signaturePad.clear();
  };

  // 保存签名
  const handleSaveSignature = async (e: any) => {
    if (signaturePad.isEmpty()) {
      message.warning("请先签名");
    } else {
      setLoadingBtn(true);
      const signatureData = signaturePad?.toDataURL();
      console.log(signatureData, "signatureData");
      const files = base64ToFile(signatureData, "图片");
      const formData = new FormData();
      formData.append("file", files);
      formData.append("fileType", "image");
      //   const res = await getSignatureSubmit(formData); // 提交图片接口 以附件形式提交到后台
      setLoadingBtn(false);
      //   res?.code === 200 && setSignatureMsg([{ fileKey: res?.data?.fileKey }]);
    }
  };

  return (
    <div className={styles.box}>
      <canvas ref={canvasRef} />
      <div className={styles.btn}>
        <Button style={{ marginRight: "8px" }} onClick={handleClearSignature}>
          重写
        </Button>
        <Button loading={loadingBtn} onClick={handleSaveSignature}>
          保存签名
        </Button>
      </div>
    </div>
  );
};

export default Signature;
