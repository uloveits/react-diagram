import React from 'react';
import DynamicPorts from '../../comps/Diagram/comps/DynamicPorts';

const Home = () => {
  const nodeDataArray = [
    {
      key: '7c3ac1a4-7ca9-4246-b5b5-d3dd90c8e698',
      name: '输入算子',
      path: 'Operator_GetInput',
      args: [],
      color: '#40A9FF',
      loc: '-432 -114',
      leftArray: [],
      rightArray: [
        {
          portColor: '#008B8B',
          name: 'Out1',
          portId: 'Out1',
          seq: 1,
        },
      ],
      operatorId: '11355c5e-953f-4bbf-beab-e0c8700cd71f',
      group: 5,
    },
    {
      key: '7c3ac1a4-7ca9-4246-b5b5-d3dd90c8e699',
      name: '其他算子',
      path: 'Operator_GetInput',
      args: [],
      color: '#40A9FF',
      loc: '0 0',
      leftArray: [
        {
          portColor: '#008B8B',
          name: 'in',
          portId: 'in',
          seq: 1,
        },
      ],
      rightArray: [],
      operatorId: '11355c5e-953f-4bbf-beab-e0c8700cd71f',
      group: 5,
    },
    {
      key: '7c3ac1a4-7ca9-4246-b5b5-d3dd90c8e695',
      name: '哈哈算子',
      path: 'Operator_GetInput',
      args: [],
      color: '#40A9FF',
      loc: '120 20',
      leftArray: [
        {
          portColor: '#008B8B',
          name: 'in',
          portId: 'in',
          seq: 1,
        },
      ],
      rightArray: [],
      operatorId: '11355c5e-953f-4bbf-beab-e0c8700cd7rr',
    },
    { key: 5, text: '工作流组一', color: '#fff', isGroup: true },
  ];

  const linkDataArray = [
    {
      from: '7c3ac1a4-7ca9-4246-b5b5-d3dd90c8e698',
      to: '7c3ac1a4-7ca9-4246-b5b5-d3dd90c8e699',
      fromPort: 'Out1',
      toPort: 'in',
      key: -1,
    },
  ];

  const onModelChange = (e: any) => {
    console.log('onModelChange');
    console.log(e);
  };

  return (
    <>
      <DynamicPorts
        isScroll={true}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        divStyle={{ width: '100%', height: '100%' }}
        onModelChange={onModelChange}
      />
    </>
  );
};

export default Home;
