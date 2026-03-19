import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Empty,
  message,
  Popconfirm,
  Spin,
  Tag,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
import axiosClient from "../../config/axiosClient";
import PageContainer from "../../components/layout/PageContainer";

const { Title, Text, Paragraph } = Typography;

const styles = {
  pageBg: {
    background: "#f8fafc",
    minHeight: "100vh",
    paddingTop: 24,
    paddingBottom: 40,
  },

  heroWrap: {
    background: "#ffffff",
    borderRadius: 28,
    padding: 28,
    marginBottom: 28,
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
    border: "1px solid #edf2f7",
  },

  sectionCard: {
    borderRadius: 24,
    boxShadow: "0 14px 40px rgba(15, 23, 42, 0.06)",
    border: "1px solid #edf2f7",
    background: "#ffffff",
  },

  courseCard: {
    height: "100%",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
    border: "1px solid #edf2f7",
    background: "#ffffff",
    transition: "all 0.25s ease",
  },

  imageShell: {
    padding: 12,
    background: "#f8fafc",
    borderBottom: "1px solid #eef2f7",
  },

  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 16,
    display: "block",
    background: "#f8fafc",
  },

  title: {
    marginBottom: 10,
    color: "#0f172a",
    fontWeight: 800,
    letterSpacing: "-0.4px",
  },

  overview: {
    color: "#64748b",
    minHeight: 44,
    marginBottom: 16,
  },

  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#475569",
    fontSize: 14,
  },

  metaIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eff6ff",
    color: "#2563eb",
    flexShrink: 0,
  },

  viewBtn: {
    height: 44,
    borderRadius: 12,
    fontWeight: 700,
  },

  cancelBtn: {
    height: 44,
    borderRadius: 12,
    fontWeight: 700,
  },
};

function CustomTag({ children, bg, color, icon }) {
  return (
    <Tag
      icon={icon}
      style={{
        background: bg,
        color,
        border: "none",
        padding: "6px 10px",
        borderRadius: 999,
        fontWeight: 600,
        marginInlineEnd: 0,
      }}
    >
      {children}
    </Tag>
  );
}

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/enroll/my-courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Load my courses error:", error);
      message.error(error?.response?.data?.message || "Load courses failed");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelEnroll = async (id) => {
    try {
      setCancelingId(id);
      await axiosClient.delete(`/enroll/courses/${id}/enroll`);
      message.success("Enrollment cancelled");

      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Cancel enrollment error:", error);
      message.error(error?.response?.data?.message || "Cancel failed");
    } finally {
      setCancelingId(null);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return (
      <PageContainer>
        <div style={styles.pageBg}>
          <div
            style={{
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={styles.pageBg}>
        <div style={styles.heroWrap}>
          <CustomTag bg="#e0f2fe" color="#0369a1" icon={<BookOutlined />}>
            Learning Dashboard
          </CustomTag>

          <Title
            level={1}
            style={{
              marginTop: 16,
              marginBottom: 10,
              color: "#0f172a",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            My Courses
          </Title>

          <Paragraph
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "#64748b",
              marginBottom: 0,
              maxWidth: 720,
            }}
          >
            Manage all the courses you have enrolled in. Continue learning,
            review course details, or cancel enrollment whenever you need.
          </Paragraph>
        </div>

        {courses.length === 0 ? (
          <Card bordered={false} style={styles.sectionCard}>
            <Empty description="You have not enrolled in any course yet" />
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            {courses.map((course) => {
              const imageUrl =
                course?.image && course.image.startsWith("http")
                  ? course.image
                  : "https://via.placeholder.com/1200x700?text=Course+Image";

              const price = Number(course?.price) || 0;
              const oldPrice = Number(course?.oldPrice) || 0;
              const priceText = price > 0 ? `$${price.toFixed(2)}` : "Free";
              const oldPriceText =
                oldPrice > 0 ? `$${oldPrice.toFixed(2)}` : null;
              const discountPercent =
                oldPrice > price && oldPrice > 0
                  ? Math.round(((oldPrice - price) / oldPrice) * 100)
                  : 0;

              const isHovered = hoveredId === course._id;

              return (
                <Col xs={24} sm={12} xl={8} key={course._id}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      ...styles.courseCard,
                      transform: isHovered
                        ? "translateY(-4px)"
                        : "translateY(0)",
                      boxShadow: isHovered
                        ? "0 22px 50px rgba(15, 23, 42, 0.12)"
                        : styles.courseCard.boxShadow,
                    }}
                    bodyStyle={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      padding: 20,
                    }}
                    cover={
                      <div style={styles.imageShell}>
                        <img
                          src={imageUrl}
                          alt={course.title}
                          style={styles.image}
                        />
                      </div>
                    }
                    onMouseEnter={() => setHoveredId(course._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 10,
                        flexWrap: "wrap",
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
                        <CustomTag bg="#e0f2fe" color="#0369a1">
                          {course.category || "General"}
                        </CustomTag>

                        {course.level && (
                          <CustomTag bg="#f3e8ff" color="#7c3aed">
                            {course.level}
                          </CustomTag>
                        )}
                      </div>

                      {discountPercent > 0 && (
                        <Tag
                          icon={<FireOutlined />}
                          style={{
                            background: "#fff7ed",
                            color: "#ea580c",
                            border: "1px solid #fed7aa",
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontWeight: 700,
                            marginInlineEnd: 0,
                          }}
                        >
                          Save {discountPercent}%
                        </Tag>
                      )}
                    </div>

                    <Title level={4} style={styles.title}>
                      {course.title}
                    </Title>

                    <Paragraph ellipsis={{ rows: 2 }} style={styles.overview}>
                      {course.overview || "No overview available."}
                    </Paragraph>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 28,
                            lineHeight: 1,
                            fontWeight: 800,
                            color: "#0f172a",
                            letterSpacing: "-0.5px",
                          }}
                        >
                          {priceText}
                        </div>

                        {oldPriceText && oldPrice > price && (
                          <Text
                            delete
                            style={{
                              color: "#94a3b8",
                              fontSize: 15,
                            }}
                          >
                            {oldPriceText}
                          </Text>
                        )}
                      </div>

                      <Text
                        style={{
                          color: "#64748b",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        Enrolled course
                      </Text>
                    </div>

                    <Divider style={{ margin: "10px 0 16px 0" }} />

                    <div
                      style={{
                        display: "grid",
                        gap: 12,
                        marginBottom: 18,
                      }}
                    >
                      <div style={styles.metaRow}>
                        <div style={styles.metaIconBox}>
                          <UserOutlined />
                        </div>
                        <span>{course.instructor || "Updating..."}</span>
                      </div>

                      <div style={styles.metaRow}>
                        <div style={styles.metaIconBox}>
                          <BookOutlined />
                        </div>
                        <span>{course.lessons || 0} lessons</span>
                      </div>

                      <div style={styles.metaRow}>
                        <div style={styles.metaIconBox}>
                          <CalendarOutlined />
                        </div>
                        <span>{course.weeks || 0} weeks</span>
                      </div>

                      <div style={styles.metaRow}>
                        <div style={styles.metaIconBox}>
                          <ClockCircleOutlined />
                        </div>
                        <span>
                          {course.lessonList?.reduce(
                            (sum, lesson) =>
                              sum + (Number(lesson?.duration) || 0),
                            0,
                          ) || 0}{" "}
                          total minutes
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "auto",
                        display: "grid",
                        gap: 10,
                      }}
                    >
                      <Link to={`/courses/${course._id}`}>
                        <Button
                          block
                          type="primary"
                          icon={<EyeOutlined />}
                          style={{
                            ...styles.viewBtn,
                            background:
                              "linear-gradient(135deg, #2563eb, #7c3aed)",
                            border: "none",
                            boxShadow: "0 12px 24px rgba(79,70,229,0.22)",
                          }}
                        >
                          View Course
                        </Button>
                      </Link>

                      <Popconfirm
                        title="Cancel enrollment"
                        description="Are you sure you want to cancel this enrollment?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => cancelEnroll(course._id)}
                      >
                        <Button
                          danger
                          block
                          icon={<DeleteOutlined />}
                          loading={cancelingId === course._id}
                          style={styles.cancelBtn}
                        >
                          Cancel Enrollment
                        </Button>
                      </Popconfirm>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </PageContainer>
  );
}

export default MyCourses;
