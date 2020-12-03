
import React from 'react';

import JsonView from '@/comps/JsonView';
import SqlEdit from '@/comps/SqlEdit';



const JsonViewPage = () => {
  const [isSetValue, setIsSetValue] = React.useState<boolean>(true);

  const [json, setJson] = React.useState<string>(
    '{"type":"object","title":"执行器环境参数","properties":{"batchtime":{"type":"integer","title":"批间隔","description":"单位为秒","default":20},"appname":{"type":"string","title":"应用名称","default":"test"},"spark.executor.memoryOverhead":{"type":"string","default":"1200"},"spark.streaming.kafka.maxRatePerPartition":{"type":"string","default":"10"},"spark.network.timeout":{"type":"string","default":"180s"}}}'
  );

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: '30%', height: '100%' }}>
          <SqlEdit
            isSetValue={isSetValue}
            theme="idea"
            mode="application/json"
            value={json}
            onCallback={() => {
              setIsSetValue(false);
            }}
            onChange={(value) => {
              setJson(value);
            }}
          />
        </div>
        <div style={{ width: '1%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '100%', width: '1px', background: '#000' }} />
        </div>
        <div style={{ width: '69%', height: '100%', padding: '10px' }}>
          <JsonView json={json} />
        </div>
      </div>
    </>
  );
};

export default JsonViewPage;
