import { useContext, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import PageContainer from "../../components/layout/PageContainer";
import { CourseContext } from "../../context/CourseContext";

const { TextArea } = Input;

const LEVELS = ["All levels", "Beginner", "Intermediate", "Advanced"];

function normalizeNumber(v) {
  if (v === "" || v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

const validateOptionalUrl = (_, value) => {
  if (!value) return Promise.resolve();
  try {
    new URL(value);
    return Promise.resolve();
  } catch {
    return Promise.reject(new Error("Link không hợp lệ (phải là URL)"));
  }
};

export default function AdminCourses() {
  const { courses, courseLoading, createCourse, updateCourse, deleteCourse } =
    useContext(CourseContext);

  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form] = Form.useForm();

  const filtered = useMemo(() => {
    const list = Array.isArray(courses) ? courses : [];
    const q = keyword.trim().toLowerCase();
    if (!q) return list;

    return list.filter((c) =>
      String(c?.title || "")
        .toLowerCase()
        .includes(q)
    );
  }, [courses, keyword]);

  const handleOpenCreate = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({
      level: "All levels",
      price: 0,
      oldPrice: 0,
      rating: 4.5,
      weeks: 2,
      students: 0,
      lessons: 0,
      courseLink: "",
    });
    setOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditing(course);
    form.resetFields();
    form.setFieldsValue({
      title: course?.title,
      category: course?.category,
      instructor: course?.instructor,
      weeks: normalizeNumber(course?.weeks),
      students: normalizeNumber(course?.students),
      level: course?.level || "All levels",
      lessons: normalizeNumber(course?.lessons),
      price: normalizeNumber(course?.price),
      oldPrice: normalizeNumber(course?.oldPrice),
      thumbnail: course?.thumbnail,
      rating: normalizeNumber(course?.rating),
      overview: course?.overview,
      courseLink: course?.courseLink,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      const payload = {
        title: values.title?.trim(),
        category: values.category?.trim(),
        instructor: values.instructor?.trim(),
        weeks: normalizeNumber(values.weeks) ?? 0,
        students: normalizeNumber(values.students) ?? 0,
        level: values.level,
        lessons: normalizeNumber(values.lessons) ?? 0,
        price: normalizeNumber(values.price) ?? 0,
        oldPrice: normalizeNumber(values.oldPrice) ?? 0,
        thumbnail: values.thumbnail?.trim(),
        rating: normalizeNumber(values.rating) ?? 0,
        overview: values.overview?.trim(),
        courseLink: values.courseLink?.trim(),
      };

      const editId = editing?._id || editing?.id;

      let res;
      if (editId) {
        res = await updateCourse(editId, payload);
      } else {
        res = await createCourse(payload);
      }

      if (!res?.success) {
        message.error(res?.message || "Save failed");
        return;
      }

      message.success(editId ? "Updated course!" : "Created course!");
      handleClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course) => {
    const cid = course?._id || course?.id;
    if (!cid) return;

    const res = await deleteCourse(cid);
    if (!res?.success) {
      message.error(res?.message || "Delete failed");
      return;
    }
    message.success("Deleted course!");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_, r) => (
        <div style={{ maxWidth: 360 }}>
          <div style={{ fontWeight: 600 }}>{r?.title || "-"}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            by {r?.instructor || "Unknown"}
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (v) => <Tag>{v || "N/A"}</Tag>,
      width: 140,
    },
    {
      title: "Weeks",
      dataIndex: "weeks",
      width: 80,
    },
    {
      title: "Students",
      dataIndex: "students",
      width: 110,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 110,
      render: (v) => {
        const price = Number(v);
        if (price === 0) return <Tag color="green">Free</Tag>;
        return <span>${Number.isFinite(price) ? price : "-"}</span>;
      },
    },
    {
      title: "Level",
      dataIndex: "level",
      width: 140,
      render: (v) => <span>{v || "-"}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, r) => (
        <Space>
          <Button onClick={() => handleOpenEdit(r)}>Edit</Button>
          <Popconfirm
            title="Delete this course?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(r)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black py-6">
        <PageContainer>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold">Admin Courses</h1>
              <p className="text-sm opacity-80">
                Manage all courses ({filtered.length})
              </p>
            </div>

            <Space>
              <Button onClick={() => window.history.back()}>Back</Button>
              <Button type="primary" onClick={handleOpenCreate}>
                Create Course
              </Button>
            </Space>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        <Card className="rounded-2xl shadow-sm" bodyStyle={{ padding: 24 }}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by title..."
              style={{ maxWidth: 360 }}
              allowClear
            />
          </div>

          <Table
            rowKey={(r) => r?._id || r?.id}
            loading={courseLoading}
            columns={columns}
            dataSource={filtered}
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </PageContainer>

      <Modal
        title={editing ? "Edit Course" : "Create Course"}
        open={open}
        onCancel={handleClose}
        onOk={onSubmit}
        okText={editing ? "Update" : "Create"}
        confirmLoading={saving}
        width={720}
      >
        <Form form={form} layout="vertical">
          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input placeholder="Create An LMS Website..." />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please enter category" }]}
            >
              <Input placeholder="Photography" />
            </Form.Item>

            <Form.Item
              label="Instructor"
              name="instructor"
              rules={[{ required: true, message: "Please enter instructor" }]}
            >
              <Input placeholder="Determined-Poitras" />
            </Form.Item>

            <Form.Item label="Level" name="level">
              <Select options={LEVELS.map((x) => ({ value: x, label: x }))} />
            </Form.Item>

            <Form.Item label="Weeks" name="weeks">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Lessons" name="lessons">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Students" name="students">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Rating" name="rating">
              <InputNumber
                min={0}
                max={5}
                step={0.1}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Price" name="price">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Old Price" name="oldPrice">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              className="md:col-span-2"
            >
              <Input placeholder="course1.png (hoặc full URL https://...)" />
            </Form.Item>

            <Form.Item
              label="Overview"
              name="overview"
              className="md:col-span-2"
            >
              <TextArea rows={4} placeholder="Short description..." />
            </Form.Item>

            <Form.Item
              label="Course Link (YouTube/Website)"
              name="courseLink"
              className="md:col-span-2"
              rules={[{ validator: validateOptionalUrl }]}
            >
              <Input placeholder="https://www.youtube.com/watch?v=..." />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
