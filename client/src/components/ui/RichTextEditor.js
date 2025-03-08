'use client';

import { RichTextEditor as MantineRichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useCallback } from 'react';

const RichTextEditor = ({ content = '', onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4',
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-gray-100 rounded p-2 font-mono text-sm my-2',
          },
        },
        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] px-4 py-2',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden h-full bg-white shadow-sm">
      <MantineRichTextEditor editor={editor}>
        <MantineRichTextEditor.Toolbar sticky className="border-b bg-gray-50 p-2 z-30 flex flex-wrap gap-1">
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Bold title="Bold" />
            <MantineRichTextEditor.Italic title="Italic" />
            <MantineRichTextEditor.Underline title="Underline" />
            <MantineRichTextEditor.Strikethrough title="Strikethrough" />
            <MantineRichTextEditor.ClearFormatting title="Clear formatting" />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.H1 title="Heading 1" />
            <MantineRichTextEditor.H2 title="Heading 2" />
            <MantineRichTextEditor.H3 title="Heading 3" />
            <MantineRichTextEditor.H4 title="Heading 4" />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.AlignLeft title="Align left" />
            <MantineRichTextEditor.AlignCenter title="Align center" />
            <MantineRichTextEditor.AlignRight title="Align right" />
            <MantineRichTextEditor.AlignJustify title="Align justify" />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.BulletList title="Bullet list" />
            <MantineRichTextEditor.OrderedList title="Ordered list" />
            <MantineRichTextEditor.Blockquote title="Blockquote" />
          </MantineRichTextEditor.ControlsGroup>
        </MantineRichTextEditor.Toolbar>

        <div className="flex-1 bg-white overflow-y-auto">
          <MantineRichTextEditor.Content 
            className="h-full prose max-w-none focus:outline-none"
            placeholder="Start writing your blog content here..."
          />
        </div>
      </MantineRichTextEditor>
    </div>
  );
};

export default RichTextEditor;
