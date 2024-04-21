import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    text: "Home",
    link: "/",
  },

  {
    id: 2,
    text: "Create recipe",
    link: "/create",
  },
];

function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            className="btn btn-ghost hover:bg-neutral hover:text-white "
            key={link.id}
            to={link.link}
          >
            {link.text}
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
