import Course from "../models/Course.js";

// GET MY COURSES
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const courses = await Course.find({
      students: userId,
    }).sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error("Get My Courses Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ENROLL COURSE
export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const alreadyEnrolled = course.students.some(
      (student) => student.toString() === userId.toString(),
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "You already enrolled in this course",
      });
    }

    course.students.push(userId);
    await course.save();

    res.json({
      message: "Enroll success",
    });
  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// CANCEL ENROLL
export const cancelEnroll = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const isEnrolled = course.students.some(
      (student) => student.toString() === userId.toString(),
    );

    if (!isEnrolled) {
      return res.status(400).json({
        message: "You are not enrolled in this course",
      });
    }

    course.students = course.students.filter(
      (student) => student.toString() !== userId.toString(),
    );

    await course.save();

    res.json({
      message: "Enrollment cancelled",
    });
  } catch (error) {
    console.error("Cancel Enroll Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
