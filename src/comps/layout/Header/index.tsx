import React from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';


const MyHeader = () => {
  const [current, setCurrent] = React.useState<string>('mail');

  const history = useHistory();

  const handleClick = (e: any) => {
    console.log('click ', e);
    console.log(history);
    setCurrent(e.key);
    history.push(`/${e.key}`);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <SubMenu key="diagram" icon={<SettingOutlined />} title="Diagram组件">
        <Menu.Item key="dynamicPorts">算子图</Menu.Item>
        <Menu.Item key="processFlow">工业流程图</Menu.Item>
      </SubMenu>
      <Menu.Item key="sqlEdit">Sql编辑器</Menu.Item>
    </Menu>
  );
};
export default MyHeader;
