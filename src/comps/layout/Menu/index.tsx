import MENUS from '@/router/menus.config';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import { useRouterStore } from '@/stores';

import './index.less';

const MyMenu = () => {
  const [currentPath, setCurrentPath] = React.useState<string>('home');
  const [pathNames, setPathNames] = React.useState<string[]>([]);
  const [current, setCurrent] = React.useState<any>({});
  const [isSecondMeun, setIsSecondMeun] = React.useState<boolean>(false);

  const history = useHistory();
  const routerStore = useRouterStore();

  // 菜单点击事件
  const onMenuClick = (e: any) => {
    console.log('click ', e);
    if (e.children && e.children.length > 0) {
      const _pathNames = pathNames;
      _pathNames.push(e.title);
      setPathNames([..._pathNames]);
      routerStore.setPathNames(_pathNames);

      setCurrent({ ...e });
      setIsSecondMeun(true);
      return;
    }
    const _pathNames = [];
    _pathNames.push(e.title);
    setPathNames([..._pathNames]);
    routerStore.setPathNames(_pathNames);

    setCurrentPath(e.path);
    setIsSecondMeun(false);
    setCurrent({});
    history.push(`/${e.path}`);
  };

  // 鼠标移入事件
  const onMouseOver = (item: any) => {
    if (item.path === currentPath.split('/')[0] && item.children && item.children.length > 0) {
      setCurrent({ ...item });
      setIsSecondMeun(true);
      return;
    }
    if (Object.keys(current).length === 0) return;

    setIsSecondMeun(true);
  };

  // 鼠标移除事件
  const onMouseLeave = (e: any) => {
    setIsSecondMeun(false);
    setCurrent({});
  };

  return (
    <div className="my-menu">
      <div className="my-menu-first">
        {MENUS.map((item: any) => (
          <div
            className={`base-menu 
            ${currentPath.split('/')[0] === item.path ? 'select' : ''}
            ${isSecondMeun && current.path.split('/')[0] === item.path ? 'active' : ''}
          `}
            key={item.path}
            role="button"
            onClick={() => {
              onMenuClick(item);
            }}
          >
            <div
              className="base-menu-icon"
              onFocus={() => 0}
              onMouseOver={() => {
                onMouseOver(item);
              }}
            >
              <span className={`fa fa-${item.icon}`} style={{ fontSize: '24px' }} />
              <div className="base-menu-text">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      <Motion style={{ x: spring(isSecondMeun ? 180 : 0) }}>
        {({ x }) => (
          <div
            className="second-menu-board"
            style={{
              WebkitTransform: `translate3d(${x}px, 0, 0)`,
              transform: `translate3d(${x}px, 0, 0)`,
            }}
            onFocus={() => 0}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
            <div className="title">{current.title || ''}</div>
            <div className="content">
              <div className="content-border" style={{ height: `${current?.children?.length * 30 || 0}px` }} />
              <div style={{ paddingLeft: '20px' }}>
                {(current.children || []).map((child: any) => (
                  <div
                    className={`menu-item ${currentPath === child.path ? 'menu-item-select' : ''}`}
                    key={child.path}
                    role="button"
                    onClick={() => {
                      onMenuClick(child);
                    }}
                  >
                    {currentPath === child.path && <div className="menu-item-select-border" />}
                    {child.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Motion>
    </div>
  );
};

export default MyMenu;
