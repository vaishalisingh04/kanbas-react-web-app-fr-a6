import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "../Courses";
import Account from "./Account";
import Calender from "../Calender";
import Inbox from "../Inbox";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import * as client from "../Courses/client";
import ProtectedRoute from "./ProtectedRoute";
export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    console.log("courses ",courses)
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses, newCourse]);
  };
  const deleteCourse = async (courseId: any) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course.cid !== courseId));
  };
  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <Provider store={store}>
      <div id="wd-kambaz" className="h-100">
        <div className="d-flex h-100">
          <div className="d-none d-md-block bg-black">
            <KambazNavigation />
          </div>
          <div className="flex-fill p-4">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="Account/*" element={<Account />} />
              <Route
                path="Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Courses/:cid/*"
                element={
                  <ProtectedRoute>
                    <Courses courses={courses} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Calendar"
                element={
                  <ProtectedRoute>
                    <Calender />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Inbox"
                element={
                  <ProtectedRoute>
                    <Inbox />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
}
