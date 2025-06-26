import { PhoneIcon } from "@heroicons/react/16/solid";
import React from "react";
import { BiPhoneCall, BiUser } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdMessage, MdOutlineMailOutline } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { useSettings } from "../../context/SettingsContext";
import ContactSectionSkeleton from "./ContactSectionSkeleton";

function ContactSection() {
  const { contact: contactData, isLoading, error } = useSettings();

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <ContactSectionSkeleton />;
  }

  // Show error state if there's an error
  if (error) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Error Loading Contact Information
            </h2>
            <p className="text-gray-600">
              Failed to load contact details. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Extract contact data from settings
  const { phone = "470-601-1911", email = "Pagedone1234@gmail.com" } =
    contactData;

  return (
    <>
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs tailwind section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-main object-cover"
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block flex flex-col items-start">
                      <a
                        href={`https://api.whatsapp.com/send?phone=${phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mb-6 hover:text-main transition-all duration-300"
                      >
                        <BiPhoneCall size={30} className="text-main" />
                        <h5 className="font-[500] text-base leading-6 ml-5">
                          {phone}
                        </h5>
                      </a>
                      <a
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-main transition-all duration-300"
                      >
                        <TfiEmail size={30} className="text-main" />
                        <h5 className="font-[500] text-base leading-6 ml-5">
                          {email}
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 className="text-main font-manrope text-4xl font-semibold leading-10 mb-11">
                Send Us A Message
              </h2>
              <form className="flex flex-col justify-between">
                <div className="form-inputs">
                  <div className="pb-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#111827]"
                    >
                      Full Name
                    </label>
                    <div className="relative text-gray-400">
                      <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                        <BiUser className="w-6 h-6" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                        placeholder="full name"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="pb-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#111827]"
                    >
                      Email Address
                    </label>
                    <div className="relative text-gray-400">
                      <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                        <MdOutlineMailOutline className="w-6 h-6" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                        placeholder="name@gmail.com"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="pb-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#111827]"
                    >
                      Phone Number
                    </label>
                    <div className="relative text-gray-400">
                      <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                        <PhoneIcon className="w-6 h-6" />
                      </span>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                        placeholder="+201065984343"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="pb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#111827]"
                    >
                      Message
                    </label>
                    <div className="relative text-gray-400">
                      <span className="absolute translate-y-2 left-0 flex items-center p-1 pl-3">
                        <MdMessage className="w-6 h-6" />
                      </span>
                      <textarea
                        name="message"
                        id="message"
                        placeholder="your message"
                        className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                        aria-autocomplete="list"
                        rows={10}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-[#FFFFFF] bg-main hover:bg-main-dark transition cursor-pointer focus:ring-4 focus:outline-hidden focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
