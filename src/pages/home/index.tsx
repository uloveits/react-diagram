import { Modal } from 'antd';
import React from 'react';
import ProcessFlow from '../../comps/Diagram/comps/ProcessFlow';

const Home = () => {
  const onModelChange = (e: any) => {
    console.log('onModelChange');
    console.log(e);
  };

  const nodeDataArray = [
    { key: 'P1', category: 'Process', pos: '-183 111', name: '小王' },
    { key: 'P2', category: 'Process', pos: '301 40', name: '小李' },
    { category: 'Process', name: '小张', key: 1, pos: '222 355' },
    { category: 'Process', name: '小黄', key: 2, pos: '137 -1' },
    { category: 'Process', name: '小朱', key: 3, pos: '260 180' },
  ];

  const linkDataArray = [
    { from: 'P1', to: 'P2', key: -1 },
    {
      from: 'P1',
      to: 1,
      fromPort: 'B',
      toPort: 'T',
      key: -2,
    },
    {
      from: 'P1',
      to: 2,
      fromPort: 'R',
      toPort: 'L',
      key: -3,
    },
    {
      from: 'P1',
      to: 3,
      fromPort: 'R',
      toPort: 'L',
      key: -4,
    },
  ];

  const toJson = (text: string) => {
    Modal.success({
      content: text,
    });
  };

  return (
    <>
      <ProcessFlow
        isReadOnly={false}
        isScroll={true}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        divStyle={{ width: '100%', height: '100%' }}
        onModelChange={onModelChange}
        toJson={toJson}
      />
    </>
  );
};

export default Home;
