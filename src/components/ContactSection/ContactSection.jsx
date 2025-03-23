import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

function ContactSection() {
  return (
    <>
      <section class="py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 grid-cols-1">
            <div class="lg:mb-0 mb-10">
              <div class="group w-full h-full">
                <div class="relative h-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs tailwind section"
                    class="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-main object-cover"
                  />
                  <h1 class="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div class="absolute bottom-0 w-full lg:p-11 p-5">
                    <div class="bg-white rounded-lg p-6 block">
                      <a href="javascript:;" class="flex items-center mb-6">
                        <BiPhoneCall size={30} className="text-main" />
                        <h5 class="text-black text-base font-normal leading-6 ml-5">
                          470-601-1911
                        </h5>
                      </a>
                      <a href="javascript:;" class="flex items-center mb-6">
                        <TfiEmail size={30} className="text-main" />
                        <h5 class="text-black text-base font-normal leading-6 ml-5">
                          Pagedone1234@gmail.com
                        </h5>
                      </a>
                      <a href="javascript:;" class="flex items-center">
                        <IoLocationOutline size={30} className="text-main" />
                        <h5 class="text-black text-base font-normal leading-6 ml-5">
                          654 Sycamore Avenue, Meadowville, WA 76543
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 class="text-main font-manrope text-4xl font-semibold leading-10 mb-11">
                Send Us A Message
              </h2>
              <input
                type="text"
                class="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-md font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 mb-10"
                placeholder="Name"
              />
              <input
                type="text"
                class="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-md font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 mb-10"
                placeholder="Email"
              />
              <input
                type="text"
                class="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-md font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 mb-10"
                placeholder="Phone"
              />
              <textarea
                class="w-full text-gray-600 placeholder-gray-400 bg-transparent text-md font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 mb-10"
                placeholder="Message"
                rows={6}
              ></textarea>
              <button class="w-full h-12 text-white text-base font-semibold leading-6 rounded-xl transition-all duration-700 hover:bg-main-dark bg-main shadow-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
