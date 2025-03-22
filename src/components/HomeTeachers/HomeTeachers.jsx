import React from 'react'
import TeacherCard from '../TeacherCard/TeacherCard'
import Teachers from './Data'
function HomeTeachers() {
  return (
    <>
      <div className="cover py-20 items-center justify-center">
        <div className="sec-head mb-10 text-center w-full">
          <h1 className="text-3xl font-bold">Get To Know Our Teachers</h1>
        </div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Teachers?.map((teacher, index) => (
              <TeacherCard
                key={index}
                name={teacher.name}
                role={teacher.role}
                rating={teacher.rating}
                languages={teacher.languages}
                price={teacher.price}
                img={teacher.img}
              />
            )).slice(0, 6)}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeTeachers