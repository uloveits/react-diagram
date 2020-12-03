const MENUS = [
  { title: '首页', path: 'home', icon: 'home', hidden: false, comp: 'home', children: [] },
  {
    title: '编辑器',
    path: 'editor',
    icon: 'code',
    hidden: false,
    children: [
      { title: 'JSON', hidden: false, path: 'editor/jsonView', comp: 'editor/jsonView', children: [] },
      { title: 'SQL', hidden: false, path: 'editor/sqlEdit', comp: 'editor/sqlEdit', children: [] },
    ],
  },
  {
    title: '流程图',
    path: 'diagram',
    icon: 'diagram',
    children: [
      { title: '算子图', hidden: false, path: 'diagram/dynamicPorts', comp: 'diagram/dynamicPorts', children: [] },
      { title: '工业流程图', hidden: false, path: 'diagram/processFlow', comp: 'diagram/dynamicPorts', children: [] },
    ],
  },
];

export default MENUS;
