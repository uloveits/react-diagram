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
          id: '449416f4-bd34-4a56-b57a-a60c200d3eb6',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: 'df2fe9c1-0a94-4035-8ffd-9397e4575b6b',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'exception_data_c_json',
          enumValue: 'exception_data_c_json',
        },
      ],
      pos: '360 240',
    },
    {
      key: 'guidescript',
      name: 'python3',
      description: '算法计算',
      category: 'Process',
      args: [
        {
          id: '1b4fd09c-f318-48f8-b9be-df0abd6772ea',
          name: 'executescript',
          code: 'executescript',
          type: '输入',
          defaultValue: '__init__.py',
          enumValue: '__init__.py',
        },
        {
          id: 'b8661039-74f2-4b04-94c2-1ba13b59b472',
          name: 'language',
          code: 'language',
          type: '输入',
          defaultValue: 'python3',
          enumValue: 'python3',
        },
      ],
      pos: '180 -240',
    },
    {
      key: 'cache',
      name: 'dat_algorithm_cache',
      description: '加入缓存数据',
      category: 'Process',
      args: [
        {
          id: '77e7fa2d-9d77-4e64-97e3-eec14acf8e6c',
          name: 'keyspace',
          code: 'keyspace',
          type: '输入',
          defaultValue: 'rzbigdata',
          enumValue: 'rzbigdata',
        },
        {
          id: '63a7a949-8864-4f41-b26d-f86a73b410b2',
          name: 'table',
          code: 'table',
          type: '输入',
          defaultValue: 'dat_algorithm_cache',
          enumValue: 'dat_algorithm_cache',
        },
        {
          id: 'f8ed737e-3abb-49c4-8927-fc42c5b9edc7',
          name: 'host',
          code: 'host',
          type: '输入',
          defaultValue: '172.16.3.1,172.16.3.2,172.16.3.3,172.16.3.4',
          enumValue: '172.16.3.1,172.16.3.2,172.16.3.3,172.16.3.4',
        },
      ],
      pos: '0 -240',
    },
    {
      key: 'subscribe',
      name: 'graph_sh_indices_json',
      description: '订阅kafka数据',
      category: 'Process',
      args: [
        {
          id: '79f71e09-5025-419d-a8fe-e45d763b0941',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '358b3af3-2566-43a4-aab7-e3e06e5203ed',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'graph_sh_indices_json',
          enumValue: 'graph_sh_indices_json',
        },
      ],
      pos: '-360 -240',
    },
    {
      key: 'errorsignal',
      name: 'ryohaerr',
      description: '处理误信号数据',
      category: 'Process',
      args: [
        {
          id: '7eaae40d-4b15-4cad-a1eb-ae109d789e63',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        { id: '12a5c6d3-1ffa-48f3-bc85-a00f8e209a54', name: 'topic', code: 'topic', type: '输入', defaultValue: 'ryohaerr', enumValue: 'ryohaerr' },
      ],
      pos: '360 80',
    },
    {
      key: 'temporarygraph',
      name: 'ryohagraph',
      description: '存储计算结果',
      category: 'Process',
      args: [
        {
          id: '346dc37d-4eea-4905-93a9-a9b74010f635',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '80b926ce-8c71-4ee4-b0a6-74ab99cb4a08',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'ryohagraph',
          enumValue: 'ryohagraph',
        },
      ],
      pos: '360 -240',
    },
    {
      key: 'event',
      name: 'alarm_event_c_json',
      description: '存储报警数据',
      category: 'Process',
      args: [
        {
          id: 'db4dee2f-98dd-4bf0-9933-f9a4a917bb6d',
          name: 'ip',
          code: 'ip',
          type: '输入',
          defaultValue: '172.16.4.221,172.16.4.222,172.16.4.223,172.16.4.224,172.16.4.225,172.16.4.226',
          enumValue: '172.16.4.221,172.16.4.222,172.16.4.223,172.16.4.224,172.16.4.225,172.16.4.226',
        },
        { id: '412138a9-1d0b-4276-a439-82baefc84dda', name: 'port', code: 'port', type: '输入', defaultValue: '6667', enumValue: '6667' },
        {
          id: '75f67eb8-37a5-4df0-8821-2e65fa22e467',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'alarm_event_c_json',
          enumValue: 'alarm_event_c_json',
        },
      ],
      pos: '360 -80',
    },
    {
      key: 'savetokafka',
      name: 'ryohasource',
      description: '存储指标数据',
      category: 'Process',
      args: [
        {
          id: '483f2e0f-5e96-4a9a-9b3a-396715590b1a',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '5388b5e3-5027-4506-b49a-75a36e8cceae',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'ryohasource',
          enumValue: 'ryohasource',
        },
      ],
      pos: '360 -160',
    },
    {
      key: 'devicemodel',
      name: 'DeviceModel',
      description: '加入设备模型',
      category: 'Process',
      args: [
        {
          id: '21c20e58-4bec-4fb5-abd0-6c3022cf167b',
          name: 'url',
          code: 'url',
          type: '输入',
          defaultValue: 'http://172.16.0.131:5058/api/v1/devicemodel',
          enumValue: 'http://172.16.0.131:5058/api/v1/devicemodel',
        },
      ],
      pos: '-180 -240',
    },
    {
      key: 'statistics',
      name: 'statistics_c_json',
      description: '处理统计信息',
      category: 'Process',
      args: [
        {
          id: 'd64a7677-d564-482e-9f4e-b4aa965ecf12',
          name: 'brokeraddress',
          code: 'brokeraddress',
          type: '输入',
          defaultValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
          enumValue: '172.16.4.221:6667,172.16.4.222:6667,172.16.4.223:6667,172.16.4.224:6667,172.16.4.225:6667,172.16.4.226:6667',
        },
        {
          id: '18e4ecac-a098-4123-b56e-e3eccb2b5df8',
          name: 'topic',
          code: 'topic',
          type: '输入',
          defaultValue: 'statistics_c_json',
          enumValue: 'statistics_c_json',
        },
      ],
      pos: '360 160',
    },
    {
      key: 'cacheToCassandra',
      name: 'dat_algorithm_cache_test',
      description: '存储缓存数据',
      category: 'Process',
      args: [
        {
          id: '296a6fa6-c4f5-4730-aad6-2b2e723c4657',
          name: 'keyspace',
          code: 'keyspace',
          type: '输入',
          defaultValue: 'rzbigdata',
          enumValue: 'rzbigdata',
        },
        {
          id: '099e96bc-f9f8-490e-980b-73e4c30883f3',
          name: 'table',
          code: 'table',
          type: '输入',
          defaultValue: 'dat_algorithm_cache_test',
          enumValue: 'dat_algorithm_cache_test',
        },
      ],
      pos: '360 0',
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
