import Footer from '../components/HomePage/Footer';
import Navbar from '../components/HomePage/Navbar';
import HeroSection from '../components/NoticeBoard/HeroSection';
import RecentNotices from '../components/NoticeBoard/RecentNotices';

const NoticeBoardPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RecentNotices />
      <Footer />
    </div>
  );
};

export default NoticeBoardPage;