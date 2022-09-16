import { Form, Link, NavLink, Outlet } from '@remix-run/react'
import { Button } from '~/components'
import { Bars3BottomRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import clsx from 'clsx'

/*
// grab everything we need
const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar");
let isSidebarOpen = false;

// add our event listener for the click
btn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});

// close sidebar if user clicks outside of the sidebar
document.addEventListener("click", (event) => {
  const isButtonClick = btn === event.target && btn.contains(event.target);
  const isOutsideClick =
    sidebar !== event.target && !sidebar.contains(event.target);

  // bail out if sidebar isnt open
  if (sidebar.classList.contains("-translate-x-full")) return;

  // if the user clicks the button, then toggle the class
  if (isButtonClick) {
    console.log("does not contain");
    sidebar.classList.toggle("-translate-x-full");
    return;
  }

  // check to see if user clicks outside the sidebar
  if (!isButtonClick && isOutsideClick) {
    console.log("outside click");
    sidebar.classList.add("-translate-x-full");
    return;
  }
});

*/

export default function PrivateApp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="relative md:flex md:min-h-screen">
        {/* <!-- mobile menu bar --> */}
        <div className="flex justify-between bg-gray-800 text-gray-100 md:hidden">
          {/* <!-- logo --> */}
          <a href="/home" className="block p-4 font-bold text-white">
            Better Dev
          </a>

          {/* <!-- mobile menu button --> */}
          <button
            className="mobile-menu-button p-4 focus:bg-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bars3BottomRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* <!-- sidebar --> */}
        <div
          className={clsx(
            `absolute top-0 left-0 z-50 w-64 transform space-y-6 bg-blue-800 py-7 px-2 text-blue-100 transition duration-200 ease-in-out md:relative md:left-0 md:block md:h-screen md:translate-x-0`,
            {
              '-translate-x-full': isOpen,
            }
          )}
        >
          {/* <!-- logo --> */}
          <Link to="/home" className="flex items-center space-x-2 px-4 text-white">
            <span className="text-2xl font-extrabold">Qatar</span>
          </Link>

          {/* <!-- nav --> */}
          <nav>
            <NavLink
              to="/home"
              className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Home
            </NavLink>
            <NavLink
              to="/test"
              className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Test
            </NavLink>

            <Form action="/logout" method="post">
              <Button
                type="submit"
                className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                Logout
              </Button>
            </Form>
          </nav>
        </div>

        {/* <!-- content --> */}
        <main className="max-h-screen min-h-screen w-full overflow-y-auto p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
