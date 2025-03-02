"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import { Extension } from "@tiptap/core";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl } from "react-icons/fa";
import { MdOutlineTitle, MdOutlineTextFields } from "react-icons/md";
import { useEffect } from "react";

// Custom Case Conversion Extension
const CaseConversion = Extension.create({
  name: "caseConversion",
  addCommands() {
    return {
      toUpperCase: () => ({ tr, state, dispatch }) => {
        const { from, to } = state.selection;
        const text = state.doc.textBetween(from, to);
        if (!text || !dispatch) return false;
        dispatch(tr.replaceWith(from, to, state.schema.text(text.toUpperCase())));
        return true;
      },
      toLowerCase: () => ({ tr, state, dispatch }) => {
        const { from, to } = state.selection;
        const text = state.doc.textBetween(from, to);
        if (!text || !dispatch) return false;
        dispatch(tr.replaceWith(from, to, state.schema.text(text.toLowerCase())));
        return true;
      },
    };
  },
});

// Custom Bullet List Extension
const CustomBulletList = BulletList.extend({
  addCommands() {
    return {
      toggleBulletList:
        () =>
        ({ commands, editor, state, dispatch }) => {
          const { from, to } = state.selection;
          const text = state.doc.textBetween(from, to) || editor.getText();

          // If no text is selected or available, toggle normally
          if (!text || !dispatch) {
            return commands.toggleBulletList();
          }

          // Split text by newlines and filter out empty lines
          const lines = text.split("\n").filter((line) => line.trim() !== "");
          if (lines.length === 0) {
            return commands.toggleBulletList();
          }

          // Create a bullet list with each line as a separate <li>
          const listItems = lines.map((line) => {
            // Create a paragraph node containing the text
            const paragraph = state.schema.nodes.paragraph.create(null, state.schema.text(line));
            // Create a list item containing the paragraph
            return state.schema.nodes.listItem.create(null, paragraph);
          });

          // Create the bullet list with the list items
          const bulletList = state.schema.nodes.bulletList.create(null, listItems);

          // Replace the selected range with the new bullet list
          dispatch(state.tr.replaceSelectionWith(bulletList));
          return true;
        },
    };
  },

  // Handle Enter key to create new list items
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { $from } = editor.state.selection;
        const parent = $from.parent;

        // If we're inside a list item, pressing Enter should create a new list item
        if (parent.type.name === "listItem") {
          return editor.commands.splitListItem("listItem");
        }
        return false;
      },
    };
  },
});

const editorStyles = `
  .editor-container {
    max-width: 100%;
    margin: 0 auto;
  }
  .toolbar {
    display: flex;
    gap: 8px;
    padding: 8px;
    
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .toolbar button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .toolbar button:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  .toolbar button.active {
    background: #3b82f6;
    color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  .tiptap-editor {
    border: 1px solid #e5e7eb;
    padding: 12px;
    min-height: 200px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  .tiptap-editor:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  .tiptap-editor p.is-empty::before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
    position: absolute;
  }
  .tiptap-editor p {
    margin: 0;
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  .tiptap-editor ul li {
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor ol {
    list-style-type: decimal;
    margin-left: 20px;
  }
  .tiptap-editor ol li {
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 0.67em 0;
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.83em 0;
    border: none !important;
    outline: none !important;
  }
  .tiptap-editor *:focus {
    outline: none !important;
    border: none !important;
  }
`;

const RichTextEditor = ({ content, interimTranscript, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false, // Disable default to use custom
        orderedList: false, // Disable default to use custom
        heading: false, // Disable default to use custom
      }),
      Underline,
      CaseConversion,
      CustomBulletList, // Use custom bullet list
      OrderedList,
      Heading.configure({
        levels: [1, 2], // Only allow H1 and H2
      }),
    ],
    content: content || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  // Debugging: Log editor extensions
  useEffect(() => {
    if (editor) {
      console.log("Editor extensions:", editor.extensionManager.extensions);
    }
  }, [editor]);

  // Update editor content when interimTranscript changes
  useEffect(() => {
    if (editor && interimTranscript) {
      const currentContent = editor.getHTML();
      const newContent = `${currentContent.replace(/<\/p>$/, "")} ${interimTranscript}</p>`;
      editor.commands.setContent(newContent, false); // false prevents unnecessary emit
    }
  }, [interimTranscript, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <style>{editorStyles}</style>
      <div className="toolbar">
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <FaBold size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <FaItalic size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={editor.isActive("underline") ? "active" : ""}
          title="Underline"
        >
          <FaUnderline size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
            console.log("H1 toggled:", editor.getHTML());
          }}
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
          title="Heading 1"
        >
          <MdOutlineTitle size={22} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            console.log("H2 toggled:", editor.getHTML());
          }}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          title="Heading 2"
        >
          <MdOutlineTitle size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleBulletList().run();
            console.log("Bullet List toggled:", editor.getHTML());
          }}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet List"
        >
          <FaListUl size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toggleOrderedList().run();
            console.log("Ordered List toggled:", editor.getHTML());
          }}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Ordered List"
        >
          <FaListOl size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toUpperCase().run();
          }}
          title="Uppercase"
        >
          <MdOutlineTextFields size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().focus().toLowerCase().run();
          }}
          title="Lowercase"
        >
          <MdOutlineTextFields size={14} />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="tiptap-editor"
        data-placeholder="Start typing..."
      />
    </div>
  );
};

export default RichTextEditor;

