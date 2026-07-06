"use client";
import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clipboard } from "lucide-react";

export interface HistoryRecord {
  id: number,
  icon?:string,
  formData: string,
  templateSlug: string,
  aiResponse: string,
  createdBy: string,
  createdAt: string,
}

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [search, setSearch] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await db
          .select()
          .from(AIOutput)
          .orderBy(desc(AIOutput.id));
        
        const formattedHistory: HistoryRecord[] = result.map((item) => ({
          id: item.id,
          formData: item.FormData, 
          aiResponse: item.aiResponse || "", 
          templateSlug: item.templateSlug,
          createdBy: item.createdBy,
          createdAt: item.createdAt || "", 
        }));
  
        setHistory(formattedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
  
    fetchHistory();
  }, []);
  

  const filteredHistory = history.filter((item) =>
    item.templateSlug.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Your library</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Generation history</h1><p className="mt-1 text-sm text-slate-500">Search and reuse your previously generated content.</p></div><Button asChild variant="outline" className="rounded-xl"><Link href="/dashboard"><ArrowLeft /> Templates</Link></Button></div>

      
      <div className="mt-7">
        <input
          type="text"
          placeholder="Search by template name..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      {filteredHistory.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No matching generations found.</div>
      ) : (
        <div className="mt-6 hidden overflow-x-auto md:block">
          <table className="w-full overflow-hidden rounded-2xl bg-white text-sm shadow-sm ring-1 ring-slate-200">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-2">TEMPLATE</th>
                <th className="px-4 py-2">AI RESP</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">WORDS</th>
                <th className="px-4 py-2">COPY</th>
              </tr>
            </thead>
        <tbody>
            {filteredHistory.map((item) => {
        const matchingTemplate = Templates.find(template => template.slug === item.templateSlug);
        
        return (
        <tr key={item.id} className="border-t">
            <td className="px-4 py-2 flex items-center gap-2">
            {matchingTemplate && (
                <img src={matchingTemplate.icon} alt={matchingTemplate.name} className="w-6 h-6" />
            )}
            <span className="font-medium">{matchingTemplate ? matchingTemplate.name : item.templateSlug}</span>
            </td>
            <td className="px-4 py-2 truncate max-w-xs">{item.aiResponse}</td>
            <td className="px-4 py-2">{item.createdAt}</td>
            <td className="px-4 py-2">{item.aiResponse.split(" ").length}</td>
            <td className="px-4 py-2">
            <Button variant="outline" onClick={() => copyToClipboard(item.aiResponse)}>
                <Clipboard size={16}/> Copy
            </Button>
            </td>
        </tr>
        );
    })}
</tbody>

          </table>
        </div>
      )}
      {filteredHistory.length > 0 && (
        <div className="mt-6 grid gap-4 md:hidden">
          {filteredHistory.map((item) => {
            const matchingTemplate = Templates.find((template) => template.slug === item.templateSlug);

            return (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    {matchingTemplate && (
                      <img src={matchingTemplate.icon} alt="" className="h-7 w-7 shrink-0" />
                    )}
                    <h2 className="font-semibold">
                      {matchingTemplate ? matchingTemplate.name : item.templateSlug}
                    </h2>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                    onClick={() => copyToClipboard(item.aiResponse)}
                  >
                    <Clipboard size={16} /> Copy
                  </Button>
                </div>
                <p className="mt-3 line-clamp-3 break-words text-sm text-gray-600">{item.aiResponse}</p>
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>{item.createdAt}</span>
                  <span>{item.aiResponse.split(" ").length} words</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
