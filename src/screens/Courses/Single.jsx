import { useParams, useNavigate } from "react-router-dom";
import { Card, Tabs, Rate, Form, Input, message } from "antd";
import PageContainer from "../../components/layout/PageContainer";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useContext, useEffect, useMemo, useState } from "react";
import { CourseContext } from "../../context/CourseContext";
import useAuth from "../../hook/useAuth";
import useCourseRegister from "../../hook/useCourseRegister";
const { TextArea } = Input;
export default function Single() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, courseLoading } = useContext(CourseContext);
  const { user } = useAuth();
  const { registers, regLoading, addRegister, removeRegister, isRegistered } =
    useCourseRegister();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    const found = courses.find((c) => String(c?._id || c?.id) === String(id));
    setCourse(found || null);
  }, [courses, id]);

  const userId = user?.email || user?._id;
  const courseId = useMemo(() => {
    return course?.id || course?._id;
  }, [course]);

  const registered = useMemo(() => {
    if (!userId || !courseId) return false;
    return isRegistered(userId, courseId);
  }, [userId, courseId, isRegistered]);
  const registerRecord = useMemo(() => {
    if (!userId || !courseId) return null;
    return registers.find(
      (r) =>
        String(r.userId) === String(userId) &&
        String(r.courseId) === String(courseId)
    );
  }, [registers, userId, courseId]);

  if (courseLoading) {
    return (
      <PageContainer className="py-10">
        <p className="text-gray-600">Loading course...</p>
      </PageContainer>
    );
  }

  if (!course) {
    return (
      <PageContainer className="py-10">
        <p className="text-gray-600">Course not found.</p>
      </PageContainer>
    );
  }
  const handleStartNow = async () => {
    if (!user) {
      message.info("Please login to enroll this course.");
      navigate("/auth");
      return;
    }

    if (!courseId) return;

    if (registered) {
      message.info("You already enrolled this course.");
      return;
    }
    const res = await addRegister({ userId, courseId });
    if (res?.success === false) {
      message.error(res?.message || "Enroll failed");
      return;
    }

    message.success("Enroll successful!");
  };

  const handleCancelEnroll = async () => {
    if (!registerRecord?._id) return;

    const res = await removeRegister(registerRecord._id);
    if (res?.success === false) {
      message.error(res?.message || "Cancel failed");
      return;
    }

    message.success("Canceled enrollment!");
  };

  const tabItems = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p>
            {course.overview ||
              "This course provides an overview of the main concepts and features. You will learn step-by-step with practical examples."}
          </p>
          <p>
            LearnPress is a comprehensive WordPress LMS plugin that helps you
            create and sell courses online easily, with lessons, quizzes and
            flexible curriculum.
          </p>
        </div>
      ),
    },
    {
      key: "curriculum",
      label: "Curriculum",
      children: (
        <div className="space-y-2 text-gray-700 text-sm">
          {(
            course.curriculum || [
              "Introduction & setup environment",
              "Core concepts and basic components",
              "State, props and data flow",
              "Routing and navigation",
              "Final project: build an EduPress clone",
            ]
          ).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <span>{item}</span>
              <span className="text-xs text-gray-400">Lesson {index + 1}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "instructor",
      label: "Instructor",
      children: (
        <div className="space-y-2 text-gray-700 text-sm">
          <p className="font-semibold">
            {course.instructor || "Determined-Poitras"}
          </p>
          <p>
            {course.instructorBio ||
              "Instructor with strong experience in building LMS platforms and teaching web development to hundreds of students."}
          </p>
        </div>
      ),
    },
    {
      key: "faqs",
      label: "FAQs",
      children: (
        <div className="space-y-3 text-gray-700 text-sm">
          <div>
            <p className="font-medium">Do I need prior experience?</p>
            <p>Basic HTML/CSS/JS is recommended but not strictly required.</p>
          </div>
          <div>
            <p className="font-medium">Will I get lifetime access?</p>
            <p>Yes, once enrolled you have lifetime access to the course.</p>
          </div>
        </div>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      children: (
        <div className="space-y-3 text-gray-700 text-sm">
          <p>Chưa có đánh giá nào. Hãy là người đầu tiên để lại review.</p>
        </div>
      ),
    },
  ];

  const handleSubmitComment = (values) => {
    console.log("Comment submit:", values);
    message.success("Comment submitted (demo)!");
  };

  const priceText =
    course?.price === 0
      ? "Free"
      : course?.price != null
      ? `$${Number(course.price).toFixed(2)}`
      : "$49.00";

  return (
    <div className="bg-gray-50">
      <div className="bg-black py-6">
        <PageContainer>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-white space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide">
                <span className="px-2 py-1 rounded-full bg-white/10">
                  {course.category || "Photography"}
                </span>
                <span className="opacity-70">
                  by {course.instructor || "Determined-Poitras"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold max-w-2xl">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-yellow-400">
                    {course.rating?.toFixed?.(1) || "4.5"}
                  </span>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={Math.round(course.rating || 4.5)}
                  />
                  <span className="text-xs">
                    ({course.students?.toLocaleString?.() || "156"} students)
                  </span>
                </div>

                <span>{course.duration || `${course.weeks ?? 2} weeks`}</span>
                <span>•</span>
                <span>{course.level || "All levels"}</span>
                <span>•</span>
                <span>{course.lessons || 20} lessons</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm" bodyStyle={{ padding: 24 }}>
              <Tabs
                defaultActiveKey="overview"
                items={tabItems}
                className="course-single-tabs"
              />
            </Card>

            <Card
              className="rounded-2xl shadow-sm"
              title="Leave A Comment"
              bodyStyle={{ padding: 24 }}
            >
              <p className="text-xs text-gray-500 mb-4">
                Your email address will not be published. Required fields are
                marked *
              </p>

              <Form
                layout="vertical"
                onFinish={handleSubmitComment}
                className="grid gap-4 lg:grid-cols-2"
              >
                <Form.Item
                  label="Name*"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Your name" />
                </Form.Item>

                <Form.Item
                  label="Email*"
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input placeholder="you@example.com" />
                </Form.Item>

                <Form.Item
                  label="Comment"
                  name="comment"
                  className="lg:col-span-2"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={4} placeholder="Write your comment..." />
                </Form.Item>

                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:col-span-2">
                  <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input type="checkbox" className="rounded" />
                    <span>
                      Save my name, email in this browser for the next time I
                      comment
                    </span>
                  </label>

                  <PrimaryButton htmlType="submit" className="px-6">
                    Post Comment
                  </PrimaryButton>
                </div>
              </Form>
            </Card>
          </div>

          <div className="lg:pt-4">
            <Card className="rounded-2xl shadow-md">
              <div className="flex flex-col gap-4">
                <div className="rounded-xl bg-orange-50 h-40 flex items-center justify-center text-sm text-orange-500">
                  Course illustration
                </div>

                <div>
                  {course.oldPrice && (
                    <span className="text-sm text-gray-400 line-through mr-2">
                      ${Number(course.oldPrice).toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-orange-500 mr-2">
                    {priceText}
                  </span>
                </div>
                <PrimaryButton
                  className="w-full h-11 text-base"
                  onClick={registered ? handleCancelEnroll : handleStartNow}
                  disabled={regLoading}
                >
                  {registered
                    ? regLoading
                      ? "Canceling..."
                      : "Enrolled ✓ (Cancel)"
                    : regLoading
                    ? "Enrolling..."
                    : "Start Now"}
                </PrimaryButton>
                <PrimaryButton
                  variant="outline"
                  className="w-full h-11 text-base"
                  onClick={() => navigate("/courses")}
                >
                  My Courses
                </PrimaryButton>

                <p className="text-xs text-gray-500">
                  30-day money-back guarantee · Full lifetime access · Access on
                  mobile and desktop.
                </p>

                {!user && (
                  <p className="text-xs text-gray-500">
                    * You need to login before enrolling.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
