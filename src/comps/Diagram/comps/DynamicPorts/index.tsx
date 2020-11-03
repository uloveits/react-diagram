import React from 'react';
import * as go from 'gojs';

import './index.less';
import { GuidedDraggingTool } from '../../utils/GuidedDraggingTool';
import ReactDiagram from '../ReactDiagram';

interface IDynamicPortsProps {
  isReadOnly?: boolean;
  isScroll?: boolean;
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray?: Array<go.ObjectData>;
  modelData?: go.ObjectData;
  skipsDiagramUpdate?: boolean;
  divStyle?: React.CSSProperties;
  onModelChange?: (e: go.IncrementalData) => void;
  onModelClick?: (e: go.IncrementalData) => void;
}

export const ItemTypes = {
  BOX: 'box',
};

const DynamicPorts = (props: IDynamicPortsProps) => {
  const {
    isReadOnly = false,
    isScroll = false,
    skipsDiagramUpdate = false,
    nodeDataArray = [],
    linkDataArray = [],
    divStyle = { width: '300px', height: '400px' },
    modelData = { canRelink: true },
    onModelChange,
    onModelClick,
  } = props;

  // Use some pastel colors for ports
  const getPortColor = () => {
    const portColors = ['#fae3d7', '#d6effc', '#ebe3fc', '#eaeef8', '#fadfe5', '#6cafdb', '#66d6d1'];
    return portColors[Math.floor(Math.random() * portColors.length)];
  };

  const initDiagram = () => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true, // enable undo & redo
      grid: $(
        go.Panel,
        'Grid',
        $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),

        $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 })
      ),
      'grid.visible': true,
      'grid.gridCellSize': new go.Size(30, 30),

      allowZoom: isScroll,
      allowHorizontalScroll: isScroll,
      allowVerticalScroll: isScroll,

      'clickCreatingTool.archetypeNodeData': { name: 'NEW NODE', color: 'lightblue', leftArray: [], rightArray: [], topArray: [], bottomArray: [] },
      draggingTool: new GuidedDraggingTool(), // defined in GuidedDraggingTool.ts
      'draggingTool.horizontalGuidelineColor': 'blue',
      'draggingTool.verticalGuidelineColor': 'blue',
      'draggingTool.centerGuidelineColor': 'green',
      'draggingTool.guidelineWidth': 1,
      model: $(go.GraphLinksModel, {
        copiesArrays: true,
        copiesArrayObjects: true,
        isReadOnly,
        linkFromPortIdProperty: 'fromPort', // required information:
        linkToPortIdProperty: 'toPort',

        linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        // positive keys for nodes
        makeUniqueKeyFunction: (m: go.Model, data: any) => {
          let k = data.key || 1;
          while (m.findNodeDataForKey(k)) k += 1;
          data.key = k;
          return k;
        },
        // negative keys for links
        makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
          let k = data.key || -1;
          while (m.findLinkDataForKey(k)) k -= 1;
          data.key = k;
          return k;
        },
      }),
    });

    // To simplify this code we define a function for creating a context menu button:
    const makeButton = (text: string, action: (e: any, obj: any) => void, visiblePredicate?: any) => {
      return $(
        'ContextMenuButton',
        $(go.TextBlock, text),
        { click: action },
        // don't bother with binding GraphObject.visible if there's no predicate
        visiblePredicate
          ? new go.Binding('visible', '', (o, e) => {
              return o.diagram ? visiblePredicate(o, e) : false;
            }).ofObject()
          : {}
      );
    };

    // 添加引脚
    const addPort = (side: string) => {
      diagram.startTransaction('addPort');

      for (let it = diagram.selection.iterator; it.next(); ) {
        // it.value可以拿到选中节点的Node数据
        if (it.value instanceof go.Node) {
          const node = it.value.data;
          console.log(node);
          const arr = node[`${side}Array`] || [];

          if (arr) {
            // create a new port data object
            const newportdata = {
              portId: side,
              name: side,
              portColor: getPortColor(),
              // if you add port data properties here, you should copy them in copyPortData above
            };

            // and add it to the Array of port data
            diagram.model.insertArrayItem(arr, -1, newportdata);
          }
        }
      }

      diagram.commitTransaction('addPort');
    };

    // 添加组
    const addGroup = () => {
      diagram.startTransaction('addGroup');
      diagram.model.addNodeData({ key: '工作流组', isGroup: true });
      diagram.commitTransaction('addGroup');
    };

    const nodeMenu = $(
      // context menu for each Node
      'ContextMenu',
      makeButton('复制', (e, obj) => {
        e.diagram.commandHandler.copySelection();
      }),
      makeButton('删除', (e, obj) => {
        e.diagram.commandHandler.deleteSelection();
      }),
      $(go.Shape, 'LineH', { strokeWidth: 1, height: 1, stretch: go.GraphObject.Horizontal }),
      makeButton('新增TOP引脚', (e, obj) => {
        addPort('top');
      }),
      makeButton('新增LEFT引脚', (e, obj) => {
        addPort('left');
      }),
      makeButton('新增RIGHT引脚', (e, obj) => {
        addPort('right');
      }),
      makeButton('新增BOTTOM引脚', (e, obj) => {
        addPort('bottom');
      })
    );

    const portSize = new go.Size(15, 15);

    diagram.nodeTemplate = $(
      go.Node,
      'Table',
      {
        locationObjectName: 'BODY',
        locationSpot: go.Spot.Center,
        selectionObjectName: 'BODY',
        movable: !isReadOnly, // 禁止拖动
        deletable: !isReadOnly, // 禁止删除
        selectionAdorned: !isReadOnly, // 显示选中边框
        contextMenu: nodeMenu,
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),

      // the body
      $(
        go.Panel,
        'Auto',
        {
          row: 1,
          column: 1,
          name: 'BODY',
          stretch: go.GraphObject.Fill,
        },
        $(go.Shape, 'Rectangle', {
          fill: '#40a9FF',
          stroke: null,
          strokeWidth: 0,
          minSize: new go.Size(50, 50),
        }),
        $(
          go.TextBlock,
          { margin: 10, textAlign: 'center', font: 'bold 12px Segoe UI,sans-serif', stroke: '#fff', editable: true },
          new go.Binding('text', 'name').makeTwoWay()
        )
      ), // end Auto Panel body

      // the Panel holding the left port elements, which are themselves Panels,
      // created for each item in the itemArray, bound to data.leftArray
      $(go.Panel, 'Vertical', new go.Binding('itemArray', 'leftArray'), {
        row: 1,
        column: 0,
        itemTemplate: $(
          go.Panel,
          'Auto',
          {
            _side: 'left', // internal property to make it easier to tell which side it's on
            fromSpot: go.Spot.Left,
            toSpot: go.Spot.Left,
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
            // contextMenu: portMenu
          },
          new go.Binding('portId', 'portId'),
          $(
            go.Shape,
            'Rectangle',
            {
              stroke: null,
              strokeWidth: 0,
              desiredSize: portSize,
              margin: new go.Margin(4, 0),
            },
            new go.Binding('fill', 'portColor')
          ),
          $(
            go.TextBlock,
            { margin: new go.Margin(3, 0), textAlign: 'center', font: '10px Segoe UI,sans-serif', stroke: '#000', editable: true },
            new go.Binding('text', 'name').makeTwoWay()
          )
        ), // end itemTemplate
      }), // end Vertical Panel

      // the Panel holding the top port elements, which are themselves Panels,
      // created for each item in the itemArray, bound to data.topArray
      $(go.Panel, 'Horizontal', new go.Binding('itemArray', 'topArray'), {
        row: 0,
        column: 1,
        itemTemplate: $(
          go.Panel,
          {
            _side: 'top',
            fromSpot: go.Spot.Top,
            toSpot: go.Spot.Top,
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
            // contextMenu: portMenu
          },
          new go.Binding('portId', 'portId'),
          $(
            go.Shape,
            'Rectangle',
            {
              stroke: null,
              strokeWidth: 0,
              desiredSize: portSize,
              margin: new go.Margin(0, 1),
            },
            new go.Binding('fill', 'portColor')
          )
        ), // end itemTemplate
      }), // end Horizontal Panel

      // the Panel holding the right port elements, which are themselves Panels,
      // created for each item in the itemArray, bound to data.rightArray
      $(go.Panel, 'Vertical', new go.Binding('itemArray', 'rightArray'), {
        row: 1,
        column: 2,
        itemTemplate: $(
          go.Panel,
          {
            _side: 'right',
            fromSpot: go.Spot.Right,
            toSpot: go.Spot.Right,
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
          },
          new go.Binding('portId', 'portId'),
          $(
            go.Shape,
            'Rectangle',
            {
              stroke: null,
              strokeWidth: 0,
              desiredSize: portSize,
              margin: new go.Margin(4, 0),
            },
            new go.Binding('fill', 'portColor')
          ),
          $(
            go.TextBlock,
            { margin: new go.Margin(6, 0), textAlign: 'center', font: '10px Segoe UI,sans-serif', stroke: '#000', editable: true },
            new go.Binding('text', 'name').makeTwoWay()
          )
        ), // end itemTemplate
      }), // end Vertical Panel

      // the Panel holding the bottom port elements, which are themselves Panels,
      // created for each item in the itemArray, bound to data.bottomArray
      $(go.Panel, 'Horizontal', new go.Binding('itemArray', 'bottomArray'), {
        row: 2,
        column: 1,
        itemTemplate: $(
          go.Panel,
          {
            _side: 'bottom',
            fromSpot: go.Spot.Bottom,
            toSpot: go.Spot.Bottom,
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
          },
          new go.Binding('portId', 'portId'),
          $(
            go.Shape,
            'Rectangle',
            {
              stroke: null,
              strokeWidth: 0,
              desiredSize: portSize,
              margin: new go.Margin(0, 1),
            },
            new go.Binding('fill', 'portColor')
          )
        ), // end itemTemplate
      }) // end Horizontal Panel
    ); // end Node

    // relinking depends on modelData
    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      new go.Binding('relinkableFrom', 'canRelink').ofModel(),
      new go.Binding('relinkableTo', 'canRelink').ofModel(),
      $(go.Shape, { stroke: '#0099CC', strokeWidth: 2 }),
      $(go.Shape, { stroke: '#0099CC', fill: '#0099CC', toArrow: 'Standard' })
    );

    // define the group template
    diagram.groupTemplate = $(
      go.Group,
      'Auto',
      {
        // define the group's internal layout
        // layout: $(go.TreeLayout, { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false }),
        // the group begins unexpanded;
        // upon expansion, a Diagram Listener will generate contents for the group
        isSubGraphExpanded: true,
        ungroupable: true,
      },
      $(go.Shape, 'Rectangle', { fill: null, stroke: 'gray', strokeWidth: 2 }),
      $(
        go.Panel,
        'Vertical',
        { defaultAlignment: go.Spot.Left, margin: 4 },
        $(
          go.Panel,
          'Horizontal',
          { defaultAlignment: go.Spot.Top },
          // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
          $('SubGraphExpanderButton'),
          $(go.TextBlock, { font: 'Bold 18px Sans-Serif', margin: 4, editable: true }, new go.Binding('text', 'name'))
        ),
        // create a placeholder to represent the area where the contents of the group are
        $(go.Placeholder, { padding: new go.Margin(0, 10) })
      ) // end Vertical Panel
    ); // end Group

    diagram.contextMenu = $(
      'ContextMenu',
      makeButton(
        '粘贴',
        (e, obj) => {
          e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint);
        },
        (o: any) => {
          return o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint);
        }
      ),
      makeButton(
        'Undo',
        (e, obj) => {
          e.diagram.commandHandler.undo();
        },
        (o: any) => {
          return o.diagram.commandHandler.canUndo();
        }
      ),
      makeButton(
        'Redo',
        (e, obj) => {
          e.diagram.commandHandler.redo();
        },
        (o: any) => {
          return o.diagram.commandHandler.canRedo();
        }
      ),
      makeButton('添加组', (e, obj) => {
        addGroup();
      })
    );

    return diagram;
  };

  return (
    <ReactDiagram
      divStyle={{ ...divStyle }}
      initDiagram={initDiagram}
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      modelData={modelData}
      onModelChange={onModelChange}
      onModelClick={onModelClick}
      skipsDiagramUpdate={skipsDiagramUpdate}
    />
  );
};

export default DynamicPorts;
