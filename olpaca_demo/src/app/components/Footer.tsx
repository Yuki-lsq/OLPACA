import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <ul className="flex flex-col md:flex-row w-full px-24 justify-center gap-2 animated-list mt-8">
      <li className="md:w-[300px] transition-opacity justify-center border rounded-lg p-4 border-primary">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="mailto:aihackolpaca@gmail.com"
        >
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            <span className="text-lg">Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-auto text-tertiary"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </a>
      </li>
      <li className="md:w-[300px] transition-opacity justify-center border rounded-lg p-4 border-primary">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/Yuki-lsq/OLPACA"
        >
          <div className="flex items-center gap-3">
            <FaGithub />
            <span className="text-lg">GitHub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-auto text-tertiary"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </a>
      </li>
    </ul>
  );
}
