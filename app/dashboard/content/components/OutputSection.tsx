"use client";

import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import type { Editor as ToastEditor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';

const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((module) => module.Editor),
  { ssr: false },
);

interface Props {
  aiOutput: string;
  loading: boolean;
}

function OutputSection({ aiOutput, loading }: Props) {
  const editorRef = useRef<ToastEditor | null>(null);

  // Function to copy editor content
  const copyToClipboard = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown();
      navigator.clipboard.writeText(content);
      // alert("Output copied to clipboard!");
    }
  };

  // Update the editor when aiOutput changes
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      if (loading) {
        editorInstance.setMarkdown(`
<div class="loading-container">
  <p class="loading-text">✨ Generating Content... ✨</p>
</div>
        `);
      } else {
        editorInstance.setMarkdown(aiOutput || "Your Result Will Be Displayed Here");
      }
    }
  }, [aiOutput, loading]);

  return (
    <div className='min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
      {aiOutput && !loading && (
        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5'>
          <div><p className='text-xs font-semibold uppercase tracking-wider text-cyan-600'>Generated draft</p><h2 className='mt-1 font-semibold text-slate-900'>Your content is ready</h2></div>
          <Button className='rounded-xl' variant="outline" onClick={copyToClipboard}>
            <Clipboard className='w-4 h-4' /> Copy
          </Button>
        </div>
      )}
      <div className='relative min-h-[32rem] overflow-hidden'>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <p className="text-sm font-semibold text-slate-600 animate-pulse sm:text-base">Generating your content…</p>
          </div>
        ) : null}
        <Editor
          ref={editorRef}
          initialValue="Your Result Will Be Displayed Here"
          initialEditType="markdown"
          height="min(68vh, 720px)"
          useCommandShortcut={true}
        />
      </div>
    </div>
  );
}

export default OutputSection;
