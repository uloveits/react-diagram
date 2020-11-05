import React from 'react';
import * as go from 'gojs';
import { GuidedDraggingTool } from '../../utils/GuidedDraggingTool';
import ReactDiagram from '../ReactDiagram';
import './index.less';

interface IProcessFlowProps {
  isReadOnly?: boolean;
  isScroll?: boolean;
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray?: Array<go.ObjectData>;
  modelData?: go.ObjectData;
  skipsDiagramUpdate?: boolean;
  divStyle?: React.CSSProperties;
  onModelChange?: (e: go.IncrementalData) => void;
  onModelClick?: (e: go.IncrementalData) => void;
  toJson?: (text: string) => void;
}

export const ItemTypes = {
  BOX: 'box',
};

const ProcessFlow = (props: IProcessFlowProps) => {
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
    toJson,
  } = props;

  const [isMore, setIsMore] = React.useState<boolean>(false);
  const [moreInfo, setMoreInfo] = React.useState<any>({});

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

      'clickCreatingTool.archetypeNodeData': isReadOnly ? undefined : { category: 'Process', name: 'New Node' },
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

    const makePort = (name: string, spot: any, output: boolean, input: boolean) => {
      // the port is basically just a small transparent circle
      return $(go.Shape, 'Circle', {
        fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
        stroke: null,
        desiredSize: new go.Size(7, 7),
        alignment: spot, // align the port on the main Shape
        alignmentFocus: spot, // just inside the Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: 'pointer', // show a different cursor to indicate potential link point
      });
    };

    // To simplify this code we define a function for creating a context menu button:
    const makeButton = (text: string, action: (e: any, obj: any) => void, visiblePredicate?: any) => {
      const _visible = new go.Binding('visible', '', (o, e) => {
        return o.diagram ? visiblePredicate(o, e) : false;
      }).ofObject();

      return $(
        'ContextMenuButton',
        $(go.TextBlock, text),
        { click: action },
        // don't bother with binding GraphObject.visible if there's no predicate
        visiblePredicate ? _visible : {}
      );
    };

    diagram.nodeTemplateMap.add(
      'Process',
      $(
        go.Node,
        'Auto',
        {
          locationSpot: new go.Spot(0.5, 0.5),
          locationObjectName: 'SHAPE',
          resizable: false,
          // fromLinkable: true,
          // toLinkable: true,
          resizeObjectName: 'SHAPE',
          movable: !isReadOnly, // 禁止拖动
          deletable: !isReadOnly, // 禁止删除
          selectionAdorned: !isReadOnly, // 显示选中边框
        },
        new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(
          go.Shape,
          'RoundedRectangle',
          {
            name: 'SHAPE',
            strokeWidth: 2,
            fill: $(go.Brush, 'Linear', {
              start: go.Spot.Left,
              end: go.Spot.Right,
              0: 'gray',
              0.5: 'white',
              1: 'gray',
            }),
            minSize: new go.Size(50, 50),
            portId: '',
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides,
          },
          new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
        ),
        $(
          go.TextBlock,
          {
            alignment: go.Spot.Center,
            textAlign: 'center',
            margin: 5,
            editable: !isReadOnly,
          },
          new go.Binding('text', 'name').makeTwoWay()
        ),
        makePort('T', go.Spot.Top, !isReadOnly, !isReadOnly),
        makePort('L', go.Spot.Left, !isReadOnly, !isReadOnly),
        makePort('R', go.Spot.Right, !isReadOnly, !isReadOnly),
        makePort('B', go.Spot.Bottom, !isReadOnly, !isReadOnly),
        {
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: (e, node: any) => {
            setIsMore(true);

            console.log(node.data.pos.split(' '));
            console.log(node.position);

            const _data = node.data;
            const position = node.position;
            console.log(position.x);
            if (position.y <= 0) {
              _data.top = position.y + 50;
              _data.left = position.x;
              _data.popType = 'top';
            } else {
              _data.top = position.y;
              _data.left = position.x + 50;
              _data.popType = 'left';
            }

            console.log(_data);

            setMoreInfo(_data);
            showSmallPorts(node, !isReadOnly);
          },
          mouseLeave: (e, node) => {
            setIsMore(false);
            setMoreInfo({});
            showSmallPorts(node, isReadOnly);
          },
        }
      )
    );

    const showSmallPorts = (node: any, show: boolean) => {
      node.ports.each((port: any) => {
        if (port.portId !== '') {
          // don't change the default port, which is the big shape
          port.fill = show ? 'rgba(0,0,0,.3)' : null;
        }
      });
    };

    diagram.nodeTemplateMap.add(
      'Valve',
      $(
        go.Node,
        'Vertical',
        {
          locationSpot: new go.Spot(0.5, 1, 0, -21),
          locationObjectName: 'SHAPE',
          selectionObjectName: 'SHAPE',
          rotatable: true,
        },
        new go.Binding('angle').makeTwoWay(),
        new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(
          go.TextBlock,
          { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: true },
          new go.Binding('text').makeTwoWay(),
          // keep the text upright, even when the whole node has been rotated upside down
          new go.Binding('angle', 'angle', (a) => {
            return a === 180 ? 180 : 0;
          }).ofObject()
        ),
        $(go.Shape, {
          name: 'SHAPE',
          geometryString: 'F1 M0 0 L40 20 40 0 0 20z M20 10 L20 30 M12 30 L28 30',
          strokeWidth: 2,
          fill: $(go.Brush, 'Linear', { 0: 'gray', 0.35: 'white', 0.7: 'gray' }),
          portId: '',
          fromSpot: new go.Spot(1, 0.35),
          toSpot: new go.Spot(0, 0.35),
        })
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpGap,
        corner: 10,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        toShortLength: 7,
      },

      new go.Binding('points').makeTwoWay(),
      // mark each Shape to get the link geometry with isPanelMain: true
      $(go.Shape, { isPanelMain: true, stroke: 'black', strokeWidth: 7 }),
      $(go.Shape, { isPanelMain: true, stroke: 'gray', strokeWidth: 5 }),
      $(go.Shape, { isPanelMain: true, stroke: 'white', strokeWidth: 3, name: 'PIPE', strokeDashArray: [10, 10] }),
      $(go.Shape, { toArrow: 'Triangle', scale: 1.3, fill: 'gray', stroke: null })
    );

    if (!isReadOnly) {
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
        makeButton('生成JSON', (e, obj) => {
          _toJSON();
        })
      );

      // 添加组
      const _toJSON = () => {
        diagram.startTransaction('toJSON');
        const _json = diagram.model.toJson();
        console.log('_json');
        console.log(_json);
        toJson && toJson(_json);
        diagram.commitTransaction('toJSON');
      };
    }

    return diagram;
  };

  return (
    <>
      <ReactDiagram
        divStyle={{ ...divStyle }}
        initDiagram={initDiagram}
        isAnimation={true}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        modelData={modelData}
        onModelChange={onModelChange}
        onModelClick={onModelClick}
        skipsDiagramUpdate={skipsDiagramUpdate}
      />
      {isMore && (
        <>
          <div style={{ position: 'absolute', top: `calc(50% + ${moreInfo.top}px)`, left: `calc(50% + ${moreInfo.left}px)`, zIndex: 1000 }}>
            <div className="pop-more-info">
              <div className={`arrow-${moreInfo.popType}`}>
                <em />
                <span />
              </div>
              <div className="info-row">
                <div className="info-title">
                  <span style={{ fontWeight: 'bold' }}>描述</span>
                  <span>:</span>
                </div>
                <div className="info-content">
                  <span style={{ marginRight: '20px' }}>{moreInfo.description || '暂无'}</span>
                </div>
              </div>
              {(moreInfo.args || []).map((item: any) => (
                <div className="info-row" key={item.id}>
                  <div className="info-title">
                    <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                    <span>:</span>
                  </div>
                  <div className="info-content">
                    <span style={{ marginRight: '20px' }}>{item.defaultValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessFlow;
