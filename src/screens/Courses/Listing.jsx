import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer.jsx";
import CourseCard from "../../components/courses/CourseCard.jsx";
import { SearchIcon, GridIcon, ListIcon } from "../../assets/icons/ui.jsx";
import { CourseContext } from "../../context/CourseContext";
import useAuth from "../../hook/useAuth";
import useCourseRegister from "../../hook/useCourseRegister";

export default function Listing() {
  const navigate = useNavigate();
  const { courses, courseLoading } = useContext(CourseContext);
  const { user } = useAuth();
  const { registers, regLoading } = useCourseRegister();

  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [priceFilter, setPriceFilter] = useState("All");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [minStars, setMinStars] = useState(null);
  const [tab, setTab] = useState("all");

  const toggleInArray = (arr, value) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const safeCourses = useMemo(
    () => (Array.isArray(courses) ? courses : []),
    [courses]
  );

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(safeCourses.map((c) => c?.category))).filter(Boolean),
    [safeCourses]
  );

  const instructorOptions = useMemo(
    () =>
      Array.from(new Set(safeCourses.map((c) => c?.instructor))).filter(
        Boolean
      ),
    [safeCourses]
  );

  const levelOptions = useMemo(
    () => Array.from(new Set(safeCourses.map((c) => c?.level))).filter(Boolean),
    [safeCourses]
  );

  const userId = useMemo(() => {
    const email = user?.email ? String(user.email).toLowerCase().trim() : "";
    return email;
  }, [user?.email]);

  const myCourseIdSet = useMemo(() => {
    if (!userId) return new Set();
    const ids = (Array.isArray(registers) ? registers : [])
      .filter(
        (r) =>
          String(r?.userId || "")
            .toLowerCase()
            .trim() === String(userId)
      )
      .map((r) => String(r?.courseId || "").trim())
      .filter(Boolean);

    return new Set(ids);
  }, [registers, userId]);

  const baseCourses = useMemo(() => {
    if (tab !== "my") return safeCourses;
    if (!userId) return [];

    return safeCourses.filter((c) => {
      const cId = String(c?.id || c?._id || "").trim();
      return myCourseIdSet.has(cId);
    });
  }, [safeCourses, tab, userId, myCourseIdSet]);

  const filteredCourses = useMemo(() => {
    return baseCourses.filter((course) => {
      if (searchTerm.trim()) {
        const keyword = searchTerm.toLowerCase();
        const inTitle = course?.title?.toLowerCase()?.includes(keyword);
        const inInstructor = course?.instructor
          ?.toLowerCase()
          ?.includes(keyword);
        if (!inTitle && !inInstructor) return false;
      }

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(course?.category)
      ) {
        return false;
      }

      if (
        selectedInstructors.length > 0 &&
        !selectedInstructors.includes(course?.instructor)
      ) {
        return false;
      }

      const price = Number(course?.price ?? 0);
      if (priceFilter === "Free" && price > 0) return false;
      if (priceFilter === "Paid" && price === 0) return false;

      if (
        selectedLevels.length > 0 &&
        !selectedLevels.includes(course?.level)
      ) {
        return false;
      }

      if (minStars != null) {
        const rounded = Math.round(course?.rating || 0);
        if (rounded < minStars) return false;
      }

      return true;
    });
  }, [
    baseCourses,
    searchTerm,
    selectedCategories,
    selectedInstructors,
    priceFilter,
    selectedLevels,
    minStars,
  ]);

  const handleChangeTab = (nextTab) => {
    if (nextTab === "my" && !user) {
      navigate("/auth");
      return;
    }
    setTab(nextTab);
  };

  const loading = courseLoading || (tab === "my" && regLoading);

  return (
    <section className="bg-[#F4F5F7] py-14">
      <PageContainer>
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-[24px] font-semibold text-slate-900">
              {tab === "my" ? "My Courses" : "All Courses"}
            </h1>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleChangeTab("all")}
                className={`rounded-full px-3 py-1 border transition ${
                  tab === "all"
                    ? "border-[#FF782D] bg-[#FF782D] text-white"
                    : "border-[#e5e7eb] bg-white text-slate-600 hover:border-[#FF782D] hover:text-[#FF782D]"
                }`}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => handleChangeTab("my")}
                className={`rounded-full px-3 py-1 border transition ${
                  tab === "my"
                    ? "border-[#FF782D] bg-[#FF782D] text-white"
                    : "border-[#e5e7eb] bg-white text-slate-600 hover:border-[#FF782D] hover:text-[#FF782D]"
                }`}
              >
                My Courses
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-64 rounded-full border border-[#e5e7eb] bg-white pl-4 pr-9 text-xs text-slate-700 placeholder:text-slate-400 focus:border-[#FF782D] focus:outline-none"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon className="h-4 w-4" />
              </span>
            </div>

            <div className="flex items-center rounded-full border border-[#e5e7eb] bg-white px-1 py-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition ${
                  viewMode === "grid"
                    ? "bg-[#FF782D]/10 text-[#FF782D]"
                    : "hover:bg-slate-100"
                }`}
              >
                <GridIcon className="h-4 w-4" />
              </button>

              <span className="mx-1 h-4 w-px bg-slate-200" />

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition ${
                  viewMode === "list"
                    ? "bg-[#FF782D]/10 text-[#FF782D]"
                    : "hover:bg-slate-100"
                }`}
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 space-y-4">
              {viewMode === "grid" ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course?.id || course?._id}
                      course={course}
                      variant="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course?.id || course?._id}
                      course={course}
                      variant="list"
                    />
                  ))}
                </div>
              )}

              {filteredCourses.length === 0 && (
                <p className="mt-4 text-center text-xs text-slate-500">
                  {tab === "my"
                    ? "Bạn chưa đăng ký khóa học nào."
                    : "Không tìm thấy khóa học nào phù hợp với bộ lọc hiện tại."}
                </p>
              )}

              <div className="mt-6 flex justify-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition ${
                      page === 1
                        ? "border-[#FF782D] bg-[#FF782D] text-white"
                        : "border-[#e5e7eb] bg-white text-slate-600 hover:border-[#FF782D] hover:text-[#FF782D]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            <aside className="w-full shrink-0 space-y-6 rounded-3xl bg-white p-5 lg:w-80 lg:p-6">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Course Category
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {categoryOptions.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3 w-3 rounded border-slate-300 text-[#FF782D]"
                          checked={selectedCategories.includes(item)}
                          onChange={() =>
                            setSelectedCategories((prev) =>
                              toggleInArray(prev, item)
                            )
                          }
                        />
                        <span>{item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Instructors
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {instructorOptions.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3 w-3 rounded border-slate-300 text-[#FF782D]"
                          checked={selectedInstructors.includes(item)}
                          onChange={() =>
                            setSelectedInstructors((prev) =>
                              toggleInArray(prev, item)
                            )
                          }
                        />
                        <span>{item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Price
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {["All", "Free", "Paid"].map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="price"
                          className="h-3 w-3 border-slate-300 text-[#FF782D]"
                          checked={priceFilter === item}
                          onChange={() => setPriceFilter(item)}
                        />
                        <span>{item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Review
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      key={star}
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() =>
                        setMinStars((prev) => (prev === star ? null : star))
                      }
                    >
                      <label className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={
                              idx < star ? "text-[#F7B500]" : "text-slate-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </label>
                      <span
                        className={`text-[11px] ${
                          minStars === star
                            ? "text-[#FF782D]"
                            : "text-slate-400"
                        }`}
                      >
                        {star}★ & up
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Level
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {levelOptions.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3 w-3 rounded border-slate-300 text-[#FF782D]"
                          checked={selectedLevels.includes(item)}
                          onChange={() =>
                            setSelectedLevels((prev) =>
                              toggleInArray(prev, item)
                            )
                          }
                        />
                        <span>{item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </PageContainer>
    </section>
  );
}
