import React from 'react'
import Image from 'next/image'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
<footer className="bg-white dark:bg-gray-900">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Freelance Nepal</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-l font-bold text-gray-900 uppercase dark:text-white">Navigation</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-2">
                          <a href="https://flowbite.com/" className="hover:underline">Home</a>
                      </li>
                      <li className="mb-2">
                          <a href="https://tailwindcss.com/" className="hover:underline">About Us</a>
                      </li>
                      <li className="mb-2">
                          <a href="https://tailwindcss.com/" className="hover:underline">Contact Us</a>
                      </li>
                      <li className="mb-2">
                          <a href="https://tailwindcss.com/" className="hover:underline">Find Talent</a>
                      </li>
                  </ul>
              </div>

              <div>
                <h2 className="mb-6 text-l font-bold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                      <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Freelance</a>. All Rights Reserved By Bibek Gurung.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://github.com/bibekgurung9" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" target='blank'>
                <FaGithub />
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="https://github.com/bibekgurung9" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" target='_blank'>
                <FaLinkedin />
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="https://github.com/bibekgurung9" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" target='blank'>
                <FaXTwitter />
                <span className="sr-only">GitHub account</span>
              </a>

          </div>
      </div>
    </div>
</footer>
  )
}

export default Footer;
