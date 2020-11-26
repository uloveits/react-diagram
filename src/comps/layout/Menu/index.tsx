import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.less';

const MyMenu = () => {
  const [currentPath, setCurrentPath] = React.useState<string>('home');
  const [current, setCurrent] = React.useState<any>({});
  const [isSecondMeun, setIsSecondMeun] = React.useState<boolean>(false);

  const menu = [
    { name: '首页', path: 'home', icon: 'home' },
    {
      name: '编辑器',
      path: 'code',
      icon: 'code',
      children: [
        { name: 'JSON', path: 'code/jsonView' },
        { name: 'SQL', path: 'code/sqlEdit' },
      ],
    },
    {
      name: '流程图',
      path: 'diagram',
      icon: 'diagram',
      children: [
        { name: '算子图', path: 'diagram/dynamicPorts' },
        { name: '工业流程图', path: 'diagram/processFlow' },
      ],
    },
  ];

  const history = useHistory();

  // 菜单点击事件
  const onMenuClick = (e: any) => {
    console.log('click ', e);
    console.log(history);
    if (e.children && e.children.length > 0) {
      setCurrent({ ...e });
      setIsSecondMeun(true);
      return;
    }
    setCurrentPath(e.path);
    setIsSecondMeun(false);
    setCurrent({});
    history.push(`/${e.path}`);
  };

  // 鼠标移入事件
  const onMouseOver = (item: any) => {
    console.log('鼠标移入事件');
    console.log(item);
    console.log(currentPath);
    if (item.path === currentPath.split('/')[0]) {
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
      {menu.map((item: any) => (
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
            <div className="base-menu-text">{item.name}</div>
          </div>
        </div>
      ))}

      {isSecondMeun && (
        <div className="second-menu-board" onFocus={() => 0} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
          <div className="title">{current.name}</div>
          <div className="content">
            <div className="content-border" style={{ height: `${current?.children.length * 30}px` }} />
            <div style={{ paddingLeft: '20px' }}>
              {current.children.map((child: any) => (
                <div
                  className={`menu-item ${currentPath === child.path ? 'menu-item-select' : ''}`}
                  key={child.path}
                  role="button"
                  onClick={() => {
                    onMenuClick(child);
                  }}
                >
                  {currentPath === child.path && <div className="menu-item-select-border" />}
                  {child.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMenu;
