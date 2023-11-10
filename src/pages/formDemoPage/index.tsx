/*
 * @Author: 蔺文丽 linwenli@travelsky.com.cn
 * @Date: 2023-11-10 16:13:41
 * @LastEditors: 蔺文丽 linwenli@travelsky.com.cn
 * @LastEditTime: 2023-11-10 16:25:16
 * @FilePath: /reactDemoOfVite/src/pages/formDemoPage/index.tsx
 * @Description: 表单demo页面
 */
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useForm } from "antd/lib/form/Form";
import { Button, Col, Form, Input, Row, message } from "antd";

import Signature from "../../components/Signature";
import { getFileParams } from "../../utils/util";

const FormDemoPage = () => {
  const [form] = useForm();
  const [signatureMsg, setSignatureMsg] = useState([]); // 从签名组件拿到的图片信息

  const onFinish = (values: any) => {
    const { options, opinion, files } = values;
    if (signatureMsg?.length === 0) {
      message.warning("请检查是否填写且保存电子签名");
    } else {
      const fileList = getFileParams(files) || [];
      const signatureAndFileList = [...signatureMsg, ...fileList];

      const newParams = {};

      //   getToApproveSave(newParams)
      //     .then((res) => {
      //       if (res?.code === 200) {
      //         history.push('/workbench/legalTodo');
      //       }
      //     })
      //     .finally(() => {});
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row>
        <Col sm={22}>
          <Form.Item
            name="opinion"
            label="处理意见"
            rules={[
              {
                required: true,
                message: "请输入检查结果描述",
              },
            ]}
          >
            <Input.TextArea
              placeholder="请输入，最多1000字"
              maxLength={1000}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Col>
        <Col sm={11}>
          <div className="onlineWrite">
            <div className="label">在线签名：</div>
            <Signature setSignatureMsg={setSignatureMsg} />
          </div>
        </Col>
        <Col span="8">
          <Form.Item name="checkResultDescribe">
            <Button
              style={{ marginRight: "16px" }}
              onClick={() => {
                // modifyForm.resetFields();
                history.go(-1); // 回到列表页
              }}
            >
              取消
            </Button>
            <Button htmlType="submit" type="primary">
              确定
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormDemoPage;
