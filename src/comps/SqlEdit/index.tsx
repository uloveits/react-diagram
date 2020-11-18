import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/javascript/javascript.js';

import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

import './index.less';

interface ISqlEditProps {
  theme?: 'neat' | 'neo' | 'panda-syntax' | 'idea' | 'rubyblue';
  mode?: 'text/javascript' | 'text/x-mysql' | 'application/json';
  isSetValue?: boolean;
  value?: string;
  readOnly?: boolean;
  onCallback?: () => void;
  onChange?: (txt: string) => void;
}

const SqlEdit = (props: ISqlEditProps) => {
  const { theme = 'idea', mode = 'text/x-mysql', readOnly = false, value, isSetValue = false, onChange, onCallback } = props;
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [editor, setEditor] = React.useState<any>(null);

  const dico = [
    { className: 'sql', text: 'SELECT' },
    { className: 'sql', text: 'FROM' },
    { className: 'sql', text: 'WHERE' },
    { className: 'sql', text: 'INNER' },
    { className: 'sql', text: 'JOIN' },
    { className: 'sql', text: 'UNION' },
    { className: 'sql', text: 'EXEC' },
    { className: 'sql', text: 'INSERT' },
    { className: 'sql', text: 'INTO' },
    { className: 'sql', text: 'VALUES' },
    { className: 'sql', text: 'UPDATE' },
    { className: 'sql', text: 'DELETE' },
    { className: 'sql', text: 'GROUP' },
    { className: 'sql', text: 'BY' },
    { className: 'sql', text: 'HAVING' },
    { className: 'sql', text: 'IS' },
    { className: 'sql', text: 'DISTINCT' },
    { className: 'sql', text: 'OUTER' },
    { className: 'sql', text: 'TOP' },
    { className: 'sql', text: 'EXISTS' },
    { className: 'sql', text: 'WHEN' },
    { className: 'sql', text: 'CASE' },
    { className: 'sql', text: 'CAST' },
    { className: 'sql', text: 'IN' },
    { className: 'sql', text: 'NULL' },
    { className: 'table', text: 'te_cash_exchange_new' },
    { className: 'table', text: 'ParamsAtos' },
    { className: 'table', text: 'te_client_transfers' },
    { className: 'column', text: 'status_cash' },
    { className: 'column', text: 'datet' },
    { className: 'column', text: 'ammount' },
    { className: 'column', text: 'cash_exchange_id_start' },
    { className: 'column', text: 'cash_exchange_id_end' },
    { className: 'pf', text: 'AddParamAtos' },
    { className: 'pf', text: 'verify_backoffice_user' },
    { className: 'pf', text: 'checkAllowOperation' },
    { className: 'pf', text: 'addMoneyIn_01' },
  ];

  React.useEffect(() => {
    console.log('======value========');
    console.log(value);
    console.log(editor);
    if (editor && isSetValue) {
      editor.setValue(value);
      onCallback && onCallback();
      setTimeout(() => {
        editor.refresh();
      }, 100);
    }
    // eslint-disable-next-line
  }, [value, isSetValue]);

  React.useEffect(() => {
    if (textareaRef.current === null) return;
    const _editor = CodeMirror.fromTextArea(textareaRef.current, {
      tabSize: 4,
      mode,
      theme,
      readOnly,
      lineNumbers: true,
      lineWrapping: true,
      hintOptions: {
        completeSingle: false,
        hint,
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      lint: true,
      extraKeys: {
        'Ctrl-Space': (__editor: any) => {
          if (mode === 'text/x-mysql') {
            __editor.showHint();
          }
        },
        F7: (__editor: any) => {
          console.log('123');
          const textJson = JSON.parse(__editor.getValue());
          const result = JSON.stringify(textJson, undefined, 2);
          __editor.setValue(result);
        }, // 代码格式化
      },
    });
    _editor.on('keypress', (__editor: any) => {
      if (mode === 'text/x-mysql') {
        __editor.showHint();
      }
    });
    _editor.on('change', (__editor: any) => {
      onChange && onChange(__editor.getValue());
    });
    setEditor(_editor);
    // eslint-disable-next-line
  }, [textareaRef]);

  const hint = (__editor: any) => {
    const cur = __editor.getCursor();
    const token = __editor.getTokenAt(cur);
    const searchString = token.string;
    return {
      list: suggest(searchString),
      from: CodeMirror.Pos(cur.line, token.start),
      to: CodeMirror.Pos(cur.line, token.end),
    };
  };

  const suggest = (searchString: string) => {
    /*
     we will score which suggesion should appears first, the higer the score, the higer is the appearance order
    */
    let token = searchString;
    if (searchString.startsWith('.')) token = searchString.substring(1);
    else token = searchString.toLowerCase();
    const resu = [];
    const N = dico.length;

    // init scoring: only retains and score suggestions which contain the searchString
    for (let i = 0; i < N; i++) {
      const keyword = dico[i].text.toLowerCase();
      let suggestion = null;
      // the base score of all the suggestion is N-i (it means we respect the order in the dico)
      if (keyword.startsWith(token)) {
        // add N to the score of keywords which begin with the token to make them raise up in the suggestion list
        suggestion = { ...{ score: N + (N - i) }, ...dico[i] };
      } else if (keyword.includes(token)) {
        suggestion = { ...{ score: N - i }, ...dico[i] };
      }
      if (suggestion) resu.push(suggestion);
    }

    // case suggestion for "."
    if (searchString.startsWith('.')) {
      // raise score of columns, decrease the score of sql keyword
      resu.forEach((s) => {
        if (s.className === 'column') s.score += N;
        else if (s.className === 'sql') s.score -= N;
        return s;
      });
    }

    // console.log(searchString);
    return resu.sort((a, b) => b.score - a.score);
  };

  return (
    <>
      <textarea ref={textareaRef} defaultValue={value} className="my-txt" />
    </>
  );
};

export default SqlEdit;
