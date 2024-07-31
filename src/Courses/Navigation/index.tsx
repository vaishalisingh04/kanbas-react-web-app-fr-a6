import { useParams, useLocation } from "react-router";
import "./index.css";
import { courses } from "../../Kambaz/Database";

export default function CoursesNavigation() {
  const links = [
    { name: "Home", path: "Home" },
    { name: "Modules", path: "Modules" },
    { name: "Piazza", path: "Piazza" },
    { name: "Zoom", path: "Zoom" },
    { name: "Assignments", path: "Assignments" },
    { name: "Quizzes", path: "Quizzes" },
    { name: "Grades", path: "Grades" },
    {name:"People",path:"People"}
  ];
  const { cid } = useParams();
  console.log("inside naviggation page"+cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <a
          key={link.name}
          id={`wd-course-${link.name.toLowerCase()}-link`}
          href={`#/Kambaz/Courses/${cid}/${link.path}`}
          className={`list-group-item border border-0 ${pathname.includes(link.path) ? 'active' : 'text-danger'}`}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
