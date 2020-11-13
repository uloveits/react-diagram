import React from 'react';
import DynamicPorts from '../../comps/Diagram/comps/DynamicPorts';

const DynamicPortsPage = () => {


  const onModelChange = (e: any) => {
    console.log('onModelChange');
    console.log(e);
  };

  return (
    <>
      <DynamicPorts
        isReadOnly={false}
        isScroll={false}
        nodeDataArray={[]}
        linkDataArray={[]}
        divStyle={{ width: '100%', height: '100%' }}
        onModelChange={onModelChange}
      />
    </>
  );
};

export default DynamicPortsPage;
