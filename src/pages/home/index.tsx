import { useRouterStore } from '@/stores';
import { Button } from 'antd';
import React from 'react';

import { Motion, spring } from 'react-motion';
import './index.less';

const Home = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { pathNames } = useRouterStore();

  React.useEffect(() => {
    console.log('useRouterStore===Home');
    console.log(pathNames);
  }, [pathNames]);

  const handleMouseDown = () => {
    setOpen(!open);
  };

  const handleTouchStart = (e: any) => {
    e.preventDefault();
    handleMouseDown();
  };
  return (
    <>
      <Button onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
        Toggle
      </Button>

      <Motion style={{ x: spring(open ? 400 : 0) }}>
        {({ x }) => (
          <div className="demo0">
            <div
              className="demo0-block"
              style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}
            />
          </div>
        )}
      </Motion>
    </>
  );
};

export default Home;
