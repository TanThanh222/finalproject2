import Course from "../models/Course.js";
import cloudinary from "../config/cloudinaryConfig.js";

const parseLessonList = (rawLessonList) => {
  if (!rawLessonList) return [];

  try {
    const parsed = JSON.parse(rawLessonList);

    if (!Array.isArray(parsed)) return [];

    return parsed.map((lesson, index) => ({
      title: lesson.title || `Lesson ${index + 1}`,
      description: lesson.description || "",
      videoUrl: lesson.videoUrl || "",
      duration: Number(lesson.duration) || 0,
      order: Number(lesson.order) || index + 1,
      isPreview: Boolean(lesson.isPreview),
    }));
  } catch (error) {
    return [];
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("students", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Get Courses Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "students",
      "name email",
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "courses",
      });

      imageUrl = uploadResult.secure_url;
    }

    const lessonList = parseLessonList(req.body.lessonList);

    const course = await Course.create({
      title: req.body.title,
      category: req.body.category,
      instructor: req.body.instructor,
      weeks: Number(req.body.weeks) || 0,
      level: req.body.level,
      lessons: lessonList.length,
      price: Number(req.body.price) || 0,
      oldPrice: Number(req.body.oldPrice) || 0,
      rating: Number(req.body.rating) || 0,
      overview: req.body.overview,
      courseLink: req.body.courseLink,
      image: imageUrl,
      lessonList,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Create Course Error:", error);

    res.status(500).json({
      message: "Create course failed",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    let imageUrl = course.image;

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "courses",
      });

      imageUrl = uploadResult.secure_url;
    }

    const lessonList =
      req.body.lessonList != null
        ? parseLessonList(req.body.lessonList)
        : course.lessonList;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        instructor: req.body.instructor,
        weeks: Number(req.body.weeks) || 0,
        level: req.body.level,
        lessons: lessonList.length,
        price: Number(req.body.price) || 0,
        oldPrice: Number(req.body.oldPrice) || 0,
        rating: Number(req.body.rating) || 0,
        overview: req.body.overview,
        courseLink: req.body.courseLink,
        image: imageUrl,
        lessonList,
      },
      { new: true },
    );

    res.json(updatedCourse);
  } catch (error) {
    console.error("Update Course Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
