import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.less';

const MyMenu = () => {
  const [current, setCurrent] = React.useState<string>('home');

  const menu = [
    { name: '首页', path: 'home', icon: 'home' },
    { name: '编辑器', path: 'jsonView', icon: 'home' },
    { name: '流程图', path: 'sqlEdit', icon: 'home' },
  ];

  const history = useHistory();

  const handleClick = (e: any) => {
    console.log('click ', e);
    console.log(history);
    setCurrent(e.path);
    history.push(`/${e.path}`);
  };

  return (
    <div className="my-menu">
      {menu.map((item: any) => (
        <div
          className={`base-menu ${current === item.path ? 'select' : ''}`}
          key={item.path}
          role="button"
          onClick={() => {
            handleClick(item);
          }}
        >
          <div className="base-menu-icon">
            <span className={`fa fa-${item.icon}`} style={{ fontSize: '24px' }} />
            <div className="base-menu-text">{item.name}</div>
          </div>
        </div>
      ))}
      <div className="second-menu">hah</div>
    </div>
  );
};

export default MyMenu;
