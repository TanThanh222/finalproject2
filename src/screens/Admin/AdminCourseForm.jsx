import React from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function AdminCourseForm({
  form,
  editingCourse,
  fileList,
  setFileList,
  onSubmit,
}) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        weeks: 0,
        level: "Beginner",
        price: 0,
        oldPrice: 0,
        rating: 0,
        lessonList: [],
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <Form.Item
          label="Course Title"
          name="title"
          rules={[{ required: true, message: "Please enter course title" }]}
        >
          <Input placeholder="Enter course title" size="large" />
        </Form.Item>

        <Form.Item
          label="Instructor"
          name="instructor"
          rules={[{ required: true, message: "Please enter instructor" }]}
        >
          <Input placeholder="Enter instructor name" size="large" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter category" }]}
        >
          <Input
            placeholder="Design / Development / Marketing..."
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Level"
          name="level"
          rules={[{ required: true, message: "Please select level" }]}
        >
          <Select
            size="large"
            options={LEVELS.map((level) => ({
              label: level,
              value: level,
            }))}
          />
        </Form.Item>

        <Form.Item label="Weeks" name="weeks">
          <InputNumber min={0} style={{ width: "100%" }} size="large" />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber min={0} style={{ width: "100%" }} size="large" />
        </Form.Item>

        <Form.Item label="Old Price" name="oldPrice">
          <InputNumber min={0} style={{ width: "100%" }} size="large" />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <InputNumber
            min={0}
            max={5}
            step={0.1}
            style={{ width: "100%" }}
            size="large"
          />
        </Form.Item>
      </div>

      <Form.Item label="Overview" name="overview">
        <TextArea rows={4} placeholder="Enter course overview" />
      </Form.Item>

      <Form.Item label="Course Link" name="courseLink">
        <Input placeholder="https://..." size="large" />
      </Form.Item>

      <Form.Item label="Course Image">
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          fileList={fileList}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          listType="text"
        >
          <Button icon={<UploadOutlined />}>Choose Image</Button>
        </Upload>

        {editingCourse?.image && fileList.length === 0 && (
          <div style={{ marginTop: 12 }}>
            <img
              src={editingCourse.image}
              alt={editingCourse.title}
              style={{
                width: 160,
                height: 96,
                objectFit: "cover",
                borderRadius: 14,
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        )}
      </Form.Item>

      <div
        style={{
          marginTop: 20,
          marginBottom: 14,
          fontWeight: 800,
          fontSize: 20,
          color: "#0f172a",
        }}
      >
        Course Lessons
      </div>

      <Form.List name="lessonList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Card
                key={key}
                size="small"
                style={{
                  marginBottom: 16,
                  borderRadius: 16,
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                }}
                title={
                  <span style={{ fontWeight: 700 }}>Lesson {index + 1}</span>
                }
                extra={
                  <Button danger type="text" onClick={() => remove(name)}>
                    Remove
                  </Button>
                }
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 16,
                  }}
                >
                  <Form.Item
                    {...restField}
                    label="Lesson Title"
                    name={[name, "title"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter lesson title",
                      },
                    ]}
                  >
                    <Input placeholder="Lesson title" size="large" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Duration (minutes)"
                    name={[name, "duration"]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Video URL"
                    name={[name, "videoUrl"]}
                  >
                    <Input
                      placeholder="https://youtube.com/... or embed url"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Order"
                    name={[name, "order"]}
                  >
                    <InputNumber
                      min={1}
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  {...restField}
                  label="Lesson Description"
                  name={[name, "description"]}
                >
                  <TextArea rows={3} placeholder="Lesson description" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "isPreview"]}
                  valuePropName="checked"
                >
                  <Checkbox>Allow preview for this lesson</Checkbox>
                </Form.Item>
              </Card>
            ))}

            <Button
              type="dashed"
              onClick={() =>
                add({
                  title: "",
                  description: "",
                  videoUrl: "",
                  duration: 0,
                  order: fields.length + 1,
                  isPreview: false,
                })
              }
              block
              icon={<PlusOutlined />}
              style={{
                borderRadius: 12,
                height: 44,
                fontWeight: 700,
              }}
            >
              Add Lesson
            </Button>
          </>
        )}
      </Form.List>
    </Form>
  );
}
