import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Page from '../../components/TeacherPageComponents/Page'
import Footer from '../../components/Footer/Footer'

function TeacherPage() {
  return (
    <>
    <Navbar/>
    <Page/>
    <Footer custom={true}/>
    </>
  )
}

export default TeacherPage