import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Input, Button, message } from "antd";
import { Tag, Divider, Modal } from "antd";
const Index = (props, ref) => {
  const { form, ...rest } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState("add");
  const formRef = useRef(null);
  // 打开
  const open = (record = {}, type) => {
    console.log(type);
    if (type === 'update'){
      form.setFieldsValue(record);
      setType(type);
    }
    if(type === 'add'){
      form.resetFields();
      setType(type);
      console.log('add');
    }
    setIsModalVisible(true);
  };
  useEffect(() => {
  }, []);
  // 关闭
  const close = () => {
    console.log(form);
    form.resetFields();
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const handleCancel = () => {
    setIsModalVisible(false);
    console.log('----');
  };
  return (
    <>
      <Modal title={type==='update'?'修改商品':'增加商品'} onOk={handleOk} onCancel={handleCancel} {...rest} visible={isModalVisible}>
        <Form form={form} ref={formRef}>
          <Form.Item label="商品id" name="id">
            {type==='update'?<Input disabled></Input>:<Input ></Input>}          
          </Form.Item>
          <Form.Item label="商品名称" name="name">
            <Input></Input>
          </Form.Item>
          <Form.Item label="商品价格" name="price">
            <Input></Input>
          </Form.Item>
          <Form.Item label="商品位置" name="place">
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default forwardRef(Index);
