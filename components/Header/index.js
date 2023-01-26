import Link from 'next/link';
import { TopWrapper, Navigation, InfoArea } from './styles';
import { useState } from 'react';

const navMenu = ['Intro', 'Map', 'Donating'];

const Header = () => {
  // recoil 써서 나중에 전역으로 관리하자!
  const [isLogin, setIsLogin] = useState(false);
  return (
    <TopWrapper>
      <Navigation>
        <Link href="/">Logo</Link>
        {navMenu.map((menu) => {
          return <Link href={`/${menu.toLowerCase()}`}>{menu}</Link>;
        })}
      </Navigation>
      <InfoArea>
        {isLogin ? (
          <>
            <div>Message</div>
            <div>Alarm</div>
            <div class="signup">My</div>
          </>
        ) : (
          <>
            <div class="signin">Login</div>
          </>
        )}
      </InfoArea>
    </TopWrapper>
  );
};

export default Header;
