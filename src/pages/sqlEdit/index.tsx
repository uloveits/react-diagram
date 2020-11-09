import { Button, message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import SqlEdit from '../../comps/SqlEdit';

const SqlEditPage = () => {
  const history = useHistory();
  console.log('hahah');
  console.log(history);

  const onChange = (value: string) => {
    console.log('onChange===');
    console.log(value);
  };

  const onSelect = () => {
    console.log('onSelect===');
    console.log(window.getSelection());
    console.log(document.getSelection()?.toString());
    message.info(document.getSelection()?.toString());
  };

  return (
    <>
      <div style={{ paddingBottom: '10px' }}>
        <Button onClick={onSelect}>获取当前选中</Button>
      </div>
      <SqlEdit theme="panda-syntax" onChange={onChange} />
    </>
  );
};

export default SqlEditPage;
