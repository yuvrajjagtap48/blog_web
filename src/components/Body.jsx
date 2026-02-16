import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import NewBlog from './NewBlog';
import ProfileModal from './Profile';
import FloatingBackButton from './FloatingBackButton';
import {
  openNewBlogModal,
  openProfileModal,
  closeAllModals
} from '../utils/modalSlice';

const Body = () => {
  const dispatch = useDispatch();
  const { isNewBlogModalOpen, isProfileModalOpen } = useSelector((state) => state.modal);
  const user = useSelector((store) => store.user);

  const handleCloseModals = () => dispatch(closeAllModals());

  return (
    <div className="relative min-h-screen">
      <NavBar
        onNewBlogClick={() => dispatch(openNewBlogModal())}
        onProfileClick={() => dispatch(openProfileModal())}
      />

      <Outlet />

      <Footer />

      <NewBlog
        isOpen={isNewBlogModalOpen}
        onClose={handleCloseModals}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseModals}
        user={user}
      />

      <FloatingBackButton />
    </div>
  );
};

export default Body;
