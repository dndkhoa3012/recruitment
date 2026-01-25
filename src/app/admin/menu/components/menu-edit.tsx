"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { Inbox } from "lucide-react";

interface MenuEditProps {
    open: boolean;
    onCancel: () => void;
    onSave: (values: any) => void;
    initialValues: any;
    categories: any[];
}

export const MenuEdit: React.FC<MenuEditProps> = ({
    open,
    onCancel,
    onSave,
    initialValues,
    categories,
}) => {
    const [form] = Form.useForm();

    // Set form values when modal opens or initialValues change
    useEffect(() => {
        if (open && initialValues) {
            form.setFieldsValue({
                ...initialValues,
                price: typeof initialValues.price === 'string'
                    ? parseInt(initialValues.price.replace(/\D/g, ''))
                    : initialValues.price
            });
        }
    }, [open, initialValues, form]);

    const handleSubmit = (values: any) => {
        onSave(values);
    };

    return (
        <Modal
            title="Chỉnh sửa món"
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="mt-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="name"
                        label="Tên món"
                        rules={[{ required: true, message: 'Vui lòng nhập tên món!' }]}
                        className="col-span-2"
                    >
                        <Input placeholder="Ví dụ: Cà phê đá" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                    >
                        <Select placeholder="Chọn danh mục">
                            {categories.map(cat => (
                                <Select.Option key={cat.id} value={cat.name}>{cat.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá (k)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <InputNumber className="w-full" placeholder="50" min={0} />
                    </Form.Item>

                    <Form.Item
                        label="URL Hình ảnh"
                        className="col-span-2"
                    >
                        <Upload.Dragger
                            name="image"
                            multiple={false}
                            maxCount={1}
                            listType="picture"
                            beforeUpload={(file) => {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    form.setFieldsValue({ image: e.target?.result });
                                };
                                reader.readAsDataURL(file);
                                return false;
                            }}
                            onRemove={() => {
                                form.setFieldsValue({ image: '' });
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <Inbox className="w-10 h-10 mx-auto text-slate-400" />
                            </p>
                            <p className="ant-upload-text">Kéo thả ảnh vào đây hoặc click để chọn</p>
                            <p className="ant-upload-hint">Hỗ trợ định dạng JPG, PNG</p>
                        </Upload.Dragger>
                        <Form.Item name="image" noStyle>
                            <Input type="hidden" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        name="desc"
                        label="Mô tả"
                        className="col-span-2"
                    >
                        <Input.TextArea rows={3} placeholder="Mô tả ngắn về món ăn..." />
                    </Form.Item>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button htmlType="button" onClick={onCancel}>Hủy</Button>
                    <Button type="primary" htmlType="submit" className="bg-green-500 hover:bg-green-600">
                        Cập nhật
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};
