import React from "react";

function ContactSectionSkeleton() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <div className="w-full h-96 lg:rounded-l-2xl rounded-2xl bg-gray-300 animate-pulse"></div>
                <div className="absolute top-11 left-11">
                  <div className="h-10 bg-gray-300 rounded animate-pulse w-32"></div>
                </div>
                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                  <div className="bg-white rounded-lg p-6 block">
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-32 ml-5"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-48 ml-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <div className="h-10 bg-gray-300 rounded animate-pulse w-64 mb-11"></div>
            <div className="flex flex-col justify-between">
              <div className="form-inputs space-y-6">
                <div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-20 mb-2"></div>
                  <div className="h-12 bg-gray-300 rounded animate-pulse w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-24 mb-2"></div>
                  <div className="h-12 bg-gray-300 rounded animate-pulse w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-28 mb-2"></div>
                  <div className="h-12 bg-gray-300 rounded animate-pulse w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-16 mb-2"></div>
                  <div className="h-32 bg-gray-300 rounded animate-pulse w-full"></div>
                </div>
              </div>
              <div className="h-12 bg-gray-300 rounded animate-pulse w-full mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSectionSkeleton;
