import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, ListBulletIcon, DocumentTextIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: '儀表板', href: '/', icon: HomeIcon },
    { name: '任務', href: '/tasks', icon: ListBulletIcon },
    { name: '筆記', href: '/notes', icon: DocumentTextIcon },
    { name: '設定', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}
        transition-transform duration-300`}
        role="dialog" aria-modal="true"
      >
        <div className="relative mr-16 flex w-full max-w-xs flex-1">
          <Transition
            show={sidebarOpen}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </Transition>

          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link to="/" className="text-white text-xl font-bold">
                Productivity Hub
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${isActive
                              ? 'bg-primary text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                          }
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 md:w-64">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Productivity Hub
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${isActive
                            ? 'bg-primary text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                        }
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-300">
                  <img
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="sr-only">Your profile</span>
                  <span>Alex Johnson</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-40 md:hidden flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-base font-semibold leading-6 text-gray-900">
            {/* Page Title will go here */}
          </div>
        </div>
        <main className="flex-1 py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;