import React, { useContext, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  message,
  Typography,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { CourseContext } from "../../context/CourseContext";
import AdminCourseForm from "../Admin/AdminCourseForm";

const { Title, Paragraph } = Typography;

function normalizeNumber(v) {
  if (v === "" || v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function SummaryCard({ icon, title, value, iconBg, iconColor }) {
  return (
    <Card bordered={false} bodyStyle={{ padding: 20 }}>
      <Space align="start" size={14}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: iconBg,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          {React.cloneElement(icon, {
            style: { color: iconColor, fontSize: 18 },
          })}
        </div>

        <div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              lineHeight: 1,
              color: "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            {value}
          </div>
        </div>
      </Space>
    </Card>
  );
}

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function AdminCourses() {
  const {
    courses = [],
    courseLoading = false,
    createCourse,
    updateCourse,
    deleteCourse,
  } = useContext(CourseContext);

  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);

  const normalizedCourses = useMemo(() => {
    return (courses || []).map((course, index) => ({
      ...course,
      key: course._id || index,
      title: course.title || "Untitled Course",
      category: course.category || "Uncategorized",
      instructor: course.instructor || "Unknown",
      weeks: normalizeNumber(course.weeks),
      lessons: normalizeNumber(course.lessons),
      price: normalizeNumber(course.price),
      oldPrice: normalizeNumber(course.oldPrice),
      rating: normalizeNumber(course.rating),
      overview: course.overview || "",
      courseLink: course.courseLink || "",
      level: course.level || "Beginner",
      image: course.image || "",
      lessonList: Array.isArray(course.lessonList) ? course.lessonList : [],
      status:
        normalizeNumber(course.students?.length) > 0 ? "Published" : "Draft",
      studentsCount: normalizeNumber(course.students?.length),
    }));
  }, [courses]);

  const categories = useMemo(() => {
    const list = normalizedCourses.map((c) => c.category).filter(Boolean);
    return ["all", ...new Set(list)];
  }, [normalizedCourses]);

  const filteredCourses = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return normalizedCourses.filter((course) => {
      const matchSearch =
        !keyword ||
        course.title.toLowerCase().includes(keyword) ||
        String(course.instructor).toLowerCase().includes(keyword) ||
        String(course.category).toLowerCase().includes(keyword);

      const matchCategory =
        categoryFilter === "all" || course.category === categoryFilter;

      const matchLevel = levelFilter === "all" || course.level === levelFilter;

      const matchStatus =
        statusFilter === "all" || course.status === statusFilter;

      return matchSearch && matchCategory && matchLevel && matchStatus;
    });
  }, [
    normalizedCourses,
    searchText,
    categoryFilter,
    levelFilter,
    statusFilter,
  ]);

  const totalCourses = normalizedCourses.length;
  const totalPublished = normalizedCourses.filter(
    (c) => c.status === "Published",
  ).length;
  const totalDrafts = normalizedCourses.filter(
    (c) => c.status === "Draft",
  ).length;
  const totalStudents = normalizedCourses.reduce(
    (sum, c) => sum + c.studentsCount,
    0,
  );

  const openCreateModal = () => {
    setEditingCourse(null);
    setFileList([]);
    form.resetFields();
    form.setFieldsValue({
      title: "",
      category: "",
      instructor: "",
      weeks: 0,
      level: "Beginner",
      price: 0,
      oldPrice: 0,
      rating: 0,
      overview: "",
      courseLink: "",
      lessonList: [
        {
          title: "",
          description: "",
          videoUrl: "",
          duration: 0,
          order: 1,
          isPreview: false,
        },
      ],
    });
    setOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFileList([]);
    form.setFieldsValue({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      weeks: course.weeks,
      level: course.level,
      price: course.price,
      oldPrice: course.oldPrice,
      rating: course.rating,
      overview: course.overview,
      courseLink: course.courseLink,
      lessonList:
        course.lessonList?.length > 0
          ? course.lessonList.map((lesson, index) => ({
              title: lesson.title || "",
              description: lesson.description || "",
              videoUrl: lesson.videoUrl || "",
              duration: normalizeNumber(lesson.duration),
              order: normalizeNumber(lesson.order) || index + 1,
              isPreview: Boolean(lesson.isPreview),
            }))
          : [
              {
                title: "",
                description: "",
                videoUrl: "",
                duration: 0,
                order: 1,
                isPreview: false,
              },
            ],
    });
    setOpen(true);
  };

  const handleDelete = async (course) => {
    const res = await deleteCourse(course._id);
    if (res?.success) {
      message.success("Xóa khóa học thành công");
    } else {
      message.error(res?.message || "Xóa khóa học thất bại");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      const lessonList = (values.lessonList || []).map((lesson, index) => ({
        title: lesson.title || `Lesson ${index + 1}`,
        description: lesson.description || "",
        videoUrl: lesson.videoUrl || "",
        duration: normalizeNumber(lesson.duration),
        order: normalizeNumber(lesson.order) || index + 1,
        isPreview: Boolean(lesson.isPreview),
      }));

      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("category", values.category || "");
      formData.append("instructor", values.instructor || "");
      formData.append("weeks", normalizeNumber(values.weeks));
      formData.append("level", values.level || "");
      formData.append("price", normalizeNumber(values.price));
      formData.append("oldPrice", normalizeNumber(values.oldPrice));
      formData.append("rating", normalizeNumber(values.rating));
      formData.append("overview", values.overview || "");
      formData.append("courseLink", values.courseLink || "");
      formData.append("lessonList", JSON.stringify(lessonList));

      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      let res;
      if (editingCourse?._id) {
        res = await updateCourse(editingCourse._id, formData);
      } else {
        res = await createCourse(formData);
      }

      if (res?.success) {
        message.success(
          editingCourse
            ? "Cập nhật khóa học thành công"
            : "Tạo khóa học thành công",
        );
        setOpen(false);
        setEditingCourse(null);
        setFileList([]);
        form.resetFields();
      } else {
        message.error(res?.message || "Lưu khóa học thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi lưu khóa học");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Course",
      key: "course",
      render: (_, record) => (
        <Link
          to={`/courses/${record._id}`}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              width: 72,
              height: 52,
              borderRadius: 14,
              overflow: "hidden",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              flexShrink: 0,
            }}
          >
            {record.image ? (
              <img
                src={record.image}
                alt={record.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#0f172a" }}>
              {record.title}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
              by {record.instructor}
            </div>
          </div>
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value) => (
        <Tag
          style={{
            borderRadius: 999,
            paddingInline: 10,
            paddingBlock: 4,
            fontWeight: 700,
            background: "#e0f2fe",
            color: "#0369a1",
            border: "none",
          }}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => (
        <span style={{ fontWeight: 700, color: "#0f172a" }}>
          ${Number(value || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (value) => {
        const stylesByLevel =
          value === "Beginner"
            ? { bg: "#ecfdf5", color: "#15803d" }
            : value === "Intermediate"
              ? { bg: "#fff7ed", color: "#c2410c" }
              : value === "Advanced"
                ? { bg: "#f3e8ff", color: "#7c3aed" }
                : { bg: "#f8fafc", color: "#334155" };

        return (
          <Tag
            style={{
              borderRadius: 999,
              fontWeight: 700,
              background: stylesByLevel.bg,
              color: stylesByLevel.color,
              border: "none",
            }}
          >
            {value}
          </Tag>
        );
      },
    },
    { title: "Lessons", dataIndex: "lessons", key: "lessons" },
    {
      title: "Students",
      dataIndex: "studentsCount",
      key: "studentsCount",
      render: (value) => <span>{Number(value || 0).toLocaleString()}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        const isPublished = value === "Published";
        return (
          <Tag
            style={{
              borderRadius: 999,
              fontWeight: 700,
              background: isPublished ? "#ecfdf5" : "#f8fafc",
              color: isPublished ? "#15803d" : "#475569",
              border: "none",
            }}
          >
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Space size={2}>
          <Link to={`/courses/${record._id}`}>
            <Button type="text" icon={<PlayCircleOutlined />} />
          </Link>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Delete this course?"
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => handleDelete(record)}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "24px 0 40px",
      }}
    >
      <PageContainer>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 28,
            padding: 28,
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            border: "1px solid #edf2f7",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  background: "#e0f2fe",
                  color: "#0369a1",
                  padding: "8px 12px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 14,
                }}
              >
                Admin Dashboard
              </div>

              <Title
                level={1}
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-1px",
                }}
              >
                Admin Courses
              </Title>

              <Paragraph
                style={{
                  margin: "10px 0 0",
                  color: "#64748b",
                  fontWeight: 500,
                  fontSize: 16,
                  maxWidth: 720,
                }}
              >
                Manage, organize, and monitor your educational content in one
                place. Total courses: {totalCourses}.
              </Paragraph>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={openCreateModal}
              style={{
                height: 46,
              }}
            >
              Create Course
            </Button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <SummaryCard
              icon={<BookOutlined />}
              title="Total Courses"
              value={totalCourses}
              iconBg="#eff6ff"
              iconColor="#2563eb"
            />
            <SummaryCard
              icon={<CheckCircleOutlined />}
              title="Published"
              value={totalPublished}
              iconBg="#ecfdf5"
              iconColor="#16a34a"
            />
            <SummaryCard
              icon={<FileTextOutlined />}
              title="Drafts"
              value={totalDrafts}
              iconBg="#fff7ed"
              iconColor="#d97706"
            />
            <SummaryCard
              icon={<TeamOutlined />}
              title="Total Students"
              value={Number(totalStudents).toLocaleString()}
              iconBg="#f3e8ff"
              iconColor="#7c3aed"
            />
          </div>

          <Card bordered={false} bodyStyle={{ padding: 20 }}>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 16,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search courses by title, instructor, or category..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ maxWidth: 360 }}
              />

              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                style={{ minWidth: 170 }}
                size="large"
                options={categories.map((cat) => ({
                  value: cat,
                  label: cat === "all" ? "All categories" : cat,
                }))}
              />

              <Select
                value={levelFilter}
                onChange={setLevelFilter}
                style={{ minWidth: 150 }}
                size="large"
                options={[
                  { value: "all", label: "All levels" },
                  ...LEVELS.map((level) => ({ value: level, label: level })),
                ]}
              />

              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ minWidth: 150 }}
                size="large"
                options={[
                  { value: "all", label: "All status" },
                  { value: "Published", label: "Published" },
                  { value: "Draft", label: "Draft" },
                ]}
              />

              <div
                style={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#64748b",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <FilterOutlined />
                Filters
              </div>
            </div>

            <Table
              rowKey={(record) => record.key}
              columns={columns}
              dataSource={filteredCourses}
              loading={courseLoading}
              pagination={{ pageSize: 6 }}
              scroll={{ x: 1100 }}
            />
          </Card>
        </div>

        <Modal
          open={open}
          title={editingCourse ? "Edit Course" : "Create Course"}
          onCancel={() => {
            setOpen(false);
            setEditingCourse(null);
            setFileList([]);
            form.resetFields();
          }}
          onOk={() => form.submit()}
          confirmLoading={submitting}
          okText={editingCourse ? "Update" : "Create"}
          cancelText="Cancel"
          width={980}
        >
          <AdminCourseForm
            form={form}
            editingCourse={editingCourse}
            fileList={fileList}
            setFileList={setFileList}
            onSubmit={handleSubmit}
          />
        </Modal>
      </PageContainer>
    </div>
  );
}
