import React from 'react';
import { Button, message } from 'antd';
import SqlEdit from '@/comps/SqlEdit';


const SqlEditPage = () => {
  const [isSetValue, setIsSetValue] = React.useState<boolean>(true);

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
      <div style={{ height: '100%' }}>
        <SqlEdit
          theme="panda-syntax"
          isSetValue={isSetValue}
          onCallback={() => {
            setIsSetValue(false);
          }}
          value="SELECT * FROM uloveits"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SqlEditPage;
