import { Modal } from 'antd';
import React from 'react';
import ProcessFlow from '../../comps/Diagram/comps/ProcessFlow';

const Home = () => {
  const onModelChange = (e: any) => {
    console.log('onModelChange');
    console.log(e);
  };

  const nodeDataArray = [
    {
      key: 'exception',
      name: 'exception_data_c_json',
      description: '处理异常信息',
      category: 'Process',
      args: [
        {
          id: '7862e730-af9f-47d3-bfc8-415460bb95c5',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '18149129-b4b5-418d-b54d-afdfe9733369',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'exception_data_c_json',
          enumValue: 'exception_data_c_json',
        },
      ],
      pos: '220 180',
    },
    {
      key: 'guidescript',
      name: 'python3',
      description: '算法计算',
      category: 'Process',
      args: [
        {
          id: '3c5e6312-60c5-4f50-8645-83cb2f75e8fa',
          name: 'executescript',
          code: 'executescript',
          type: '输入',
          defaultValue: '__init__.py',
          enumValue: '__init__.py',
        },
        {
          id: '6b087507-e2b6-49bc-82d7-18417d250627',
          name: 'language',
          code: 'language',
          type: '输入',
          defaultValue: 'python3',
          enumValue: 'python3',
        },
      ],
      pos: '40 -300',
    },
    {
      key: 'cache',
      name: 'dat_algorithm_cache',
      description: '加入缓存数据',
      category: 'Process',
      args: [
        {
          id: '0d575d1b-4a32-488c-bb69-df3f2272193f',
          name: 'keyspace',
          code: 'keyspace',
          type: '输入',
          defaultValue: 'rzbigdata',
          enumValue: 'rzbigdata',
        },
        {
          id: '646a03fc-9c8b-4b75-aa66-e3b490318e00',
          name: 'table',
          code: 'table',
          type: '输入',
          defaultValue: 'dat_algorithm_cache',
          enumValue: 'dat_algorithm_cache',
        },
        {
          id: '19f16b8f-f1dc-4b17-b4f4-697f92c40fcb',
          name: 'host',
          code: 'host',
          type: '输入',
          defaultValue: '172.16.3.1,172.16.3.2,172.16.3.3,172.16.3.4',
          enumValue: '172.16.3.1,172.16.3.2,172.16.3.3,172.16.3.4',
        },
      ],
      pos: '-140 -300',
    },
    {
      key: 'subscribe',
      name: 'graph_sh_indices_json',
      description: '订阅kafka数据',
      category: 'Process',
      args: [
        {
          id: 'dfa472a0-b712-453d-b342-cdcd23db1b95',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '29b292d6-25c6-47bf-9f06-d99c15c0f420',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'graph_sh_indices_json',
          enumValue: 'graph_sh_indices_json',
        },
      ],
      pos: '-500 -300',
    },
    {
      key: 'errorsignal',
      name: 'ryohaerr',
      description: '处理误信号数据',
      category: 'Process',
      args: [
        {
          id: 'a1fa2f28-4f7f-4767-b0b8-5eba3e010f41',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        { id: 'a8515317-e381-4dc2-8e96-b63b4a3d41d9', name: 'topic', code: 'topic', type: '输入', defaultValue: 'ryohaerr', enumValue: 'ryohaerr' },
      ],
      pos: '220 20',
    },
    {
      key: 'temporarygraph',
      name: 'ryohagraph',
      description: '存储计算结果',
      category: 'Process',
      args: [
        {
          id: '0f59df47-b26c-4dea-92da-d14d1484e798',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: 'd6501b62-85c4-4e93-a39e-82f5a67f59ac',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'ryohagraph',
          enumValue: 'ryohagraph',
        },
      ],
      pos: '220 -300',
    },
    {
      key: 'event',
      name: 'alarm_event_c_json',
      description: '存储报警数据',
      category: 'Process',
      args: [
        {
          id: '587505ae-c166-4d84-8cc1-3b7984b7299b',
          name: 'ip',
          code: 'ip',
          type: '输入',
          defaultValue: '172.16.4.221,172.16.4.222,172.16.4.223,172.16.4.224,172.16.4.225,172.16.4.226',
          enumValue: '172.16.4.221,172.16.4.222,172.16.4.223,172.16.4.224,172.16.4.225,172.16.4.226',
        },
        { id: 'e0371868-5228-483a-b425-c84f52b5bb3d', name: 'port', code: 'port', type: '输入', defaultValue: '6667', enumValue: '6667' },
        {
          id: '43bb1785-c2dc-42b2-b0fc-08cc4792ec29',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'alarm_event_c_json',
          enumValue: 'alarm_event_c_json',
        },
      ],
      pos: '220 -140',
    },
    {
      key: 'savetokafka',
      name: 'ryohasource',
      description: '存储指标数据',
      category: 'Process',
      args: [
        {
          id: '23776b7f-c99c-4d33-a38d-111ce1ae556a',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: 'bc9d1e5e-0af5-4104-81ba-75e86a4d4d34',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'ryohasource',
          enumValue: 'ryohasource',
        },
      ],
      pos: '220 -220',
    },
    {
      key: 'devicemodel',
      name: 'DeviceModel',
      description: '加入设备模型',
      category: 'Process',
      args: [
        {
          id: '7eda96f3-b5dc-49cb-a4d4-2dc04afe15e3',
          name: 'url',
          code: 'url',
          type: '输入',
          defaultValue: 'http://172.16.0.131:5058/api/v1/devicemodel',
          enumValue: 'http://172.16.0.131:5058/api/v1/devicemodel',
        },
      ],
      pos: '-320 -300',
    },
    {
      key: 'statistics',
      name: 'statistics_c_json',
      description: '处理统计信息',
      category: 'Process',
      args: [
        {
          id: '214b2c98-7668-4edf-9a02-95a6cac861af',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '1ecbbea3-4896-4c21-81a6-41993596febc',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'statistics_c_json',
          enumValue: 'statistics_c_json',
        },
      ],
      pos: '220 100',
    },
    {
      key: 'cacheToCassandra',
      name: 'dat_algorithm_cache_test',
      description: '存储缓存数据',
      category: 'Process',
      args: [
        {
          id: '6e3ddc34-04c7-4302-861c-fc1f433bc10f',
          name: 'keyspace',
          code: 'keyspace',
          type: '输入',
          defaultValue: 'rzbigdata',
          enumValue: 'rzbigdata',
        },
        {
          id: 'ba98af9a-768d-45aa-8434-e0ddf9712277',
          name: 'table',
          code: 'table',
          type: '输入',
          defaultValue: 'dat_algorithm_cache_test',
          enumValue: 'dat_algorithm_cache_test',
        },
      ],
      pos: '220 -60',
    },
  ];

  const linkDataArray = [
    { from: 'subscribe', to: 'devicemodel', key: -1 },
    { from: 'guidescript', to: 'temporarygraph', key: -2 },
    { from: 'guidescript', to: 'savetokafka', key: -3 },
    { from: 'guidescript', to: 'event', key: -4 },
    { from: 'guidescript', to: 'cacheToCassandra', key: -5 },
    { from: 'guidescript', to: 'errorsignal', key: -6 },
    { from: 'guidescript', to: 'statistics', key: -7 },
    { from: 'guidescript', to: 'exception', key: -8 },
    { from: 'devicemodel', to: 'cache', key: -9 },
    { from: 'cache', to: 'guidescript', key: -10 },
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
