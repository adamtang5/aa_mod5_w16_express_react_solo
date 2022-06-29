import { createRef, useState, useEffect } from "react";
import BubbleQuillEditor from "./BubbleQuillEditor";
import SnowQuillEditor from "./SnowQuillEditor";

const QuillEditor = ({ elementId, snowToolbarId, bubbleToolbarId, placeholder, setData, initialHtml }) => {
    const hiddenQuillRef = createRef();
    const visibleQuillRef = createRef();
    const hiddenRedoRef = createRef();
    const hiddenUndoRef = createRef();

    const [singleSourceHtml, setSingleSourceHtml] = useState(initialHtml || "");

    const onEditorChange = value => {
        setData(value);
        setSingleSourceHtml(value);
        console.log(`singleSourceHtml: ${singleSourceHtml}`);
    };

    useEffect(() => {
        console.log(hiddenQuillRef.current);
        console.log(visibleQuillRef?.current?.editor?.history);
    }, [singleSourceHtml]);

    const undoChange = () => {
        hiddenUndoRef?.current?.click();
        // visibleQuillRef.current?.editor.history.undo();
    };

    const redoChange = () => {
        hiddenRedoRef.current.click();
        // visibleQuillRef.current?.editor.history.redo();
    };

    return (
        <div id={elementId}>
            <SnowQuillEditor
                toolbarId={snowToolbarId}
                hiddenQuillRef={hiddenQuillRef}
                onEditorChange={onEditorChange}
                initialHtml={initialHtml}
                undoChange={undoChange}
                redoChange={redoChange}
            />
            <BubbleQuillEditor
                toolbarId={bubbleToolbarId}
                visibleQuillRef={visibleQuillRef}
                hiddenRedoRef={hiddenRedoRef}
                hiddenUndoRef={hiddenUndoRef}
                placeholder={placeholder}
                onEditorChange={onEditorChange}
                initialHtml={initialHtml}
            />
        </div>
    );
};

export default QuillEditor;
