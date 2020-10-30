import React from 'react';
import * as go from 'gojs';

export interface IDiagramProps {
  initDiagram: () => go.Diagram;
  divStyle: React.CSSProperties;
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray?: Array<go.ObjectData>;
  modelData?: go.ObjectData;
  skipsDiagramUpdate: boolean;
  onModelChange?: (e: go.IncrementalData) => void;
  onModelClick?: (e: any) => void;
}

const ReactDiagram = (props: IDiagramProps) => {

  const divRef = React.useRef<HTMLDivElement | null>(null);
  // let modelChangedListener: ((e: go.ChangedEvent) => void) | null = null;

  const {
    divStyle,
    nodeDataArray,
    linkDataArray,
    modelData,
    skipsDiagramUpdate,
    onModelChange,
    onModelClick,
    initDiagram,
  } = props;

  const getDiagram = (): go.Diagram | null => {
    if (divRef.current !== null) {
      if (skipsDiagramUpdate) {
        console.log('go.Diagram.fromDiv(divRef.current)1111');
        console.log(go.Diagram.fromDiv(divRef.current));
        return go.Diagram.fromDiv(divRef.current) || initDiagram();
      }
    }
    return initDiagram();
  };


  const updateDiagram = (diagram: go.Diagram) => {

    console.log('updateDiagram================');
    if (diagram !== null) {
      const model = diagram.model;
      model.startTransaction('update data');
      model.mergeNodeDataArray(nodeDataArray);
      if (linkDataArray !== undefined && model instanceof go.GraphLinksModel) {
        model.mergeLinkDataArray(linkDataArray);
      }
      if (modelData !== undefined) {
        model.assignAllDataProperties(model.modelData, modelData);
      }
      model.commitTransaction('update data');
    }
  };



  React.useEffect(() => {
    if (divRef.current === null) return;

    const diagram = getDiagram();

    console.log('diagram=================');
    console.log(diagram);
    if (!diagram) return;
    if (skipsDiagramUpdate && go.Diagram.fromDiv(divRef.current)) {
      updateDiagram(diagram);
      return;
    }
    console.log('diagram.model.toJson()');
    console.log(diagram.model.toJson());

    diagram.div = divRef.current;

    // 初始化 data change 监听事件
    const modelChangedListener = (e: go.ChangedEvent) => {
      if (e.isTransactionFinished) {
        const dataChanges = e.model!.toIncrementalData(e);
        console.log('dataChanges');
        console.log(dataChanges);
        if (dataChanges !== null) onModelChange && onModelChange(dataChanges);
      }
    };

    diagram.addModelChangedListener(modelChangedListener);

    diagram.addDiagramListener('ObjectSingleClicked', (e) => {
      console.log('ObjectSingleClicked');
      console.log(e.subject.part.data);
      onModelClick && onModelClick(e.subject.part.data);
    });

    diagram.delayInitialization(() => {
      const model = diagram.model;
      model.commit((m: go.Model) => {
        m.mergeNodeDataArray(nodeDataArray);
        if (linkDataArray !== undefined && m instanceof go.GraphLinksModel) {
          m.mergeLinkDataArray(linkDataArray);
        }
        if (modelData !== undefined) {
          m.assignAllDataProperties(m.modelData, modelData);
        }
      }, 'gojs-react init merge');
    });

    // eslint-disable-next-line
  }, [nodeDataArray]);


  return (<div ref={divRef} style={{ ...divStyle }} />);
};

export default ReactDiagram;