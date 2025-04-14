
import UserInfo from './overview/user-info';
import Portfolio from './overview/portfolio';
import Skills from './overview/skills';
import Connections from "./overview/connections"
import AboutSecton from "./overview/about";
import Projects from './overview/projects';
import { useEffect, useState } from 'react';
import ProfileProgress from './overview/projects/profile-progress';
import Header from './components/header';
const Overview = ({load}) => {
  // const [isMobile, setIsMobile] = useState('');

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setIsMobile(window.innerWidth < 991);
  //     };
  
  //     handleResize(); // check on mount
  //     window.addEventListener("resize", handleResize);
  
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  return (
    <div className="pt-6 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-6 space-y-6">
        <Header />
        <ProfileProgress />

        <UserInfo />
        {/* {isMobile && <AboutSecton />} */}
        {/* <Portfolio /> */}
        {/* <Skills /> */}
        {/* <Connections /> */}
      </div>
      <div className="col-span-12 lg:col-span-6 space-y-6">
        {/* {!isMobile && <AboutSecton />} */}
        <Projects />
        <Projects custom={true}/>
      </div>
    </div>
  );
};

export default Overview;