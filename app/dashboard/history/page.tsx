"use client";
import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
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
        const result = await db.select().from(AIOutput);
        
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
    <div className="p-4 sm:p-6 lg:p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>

      <h1 className="mt-5 text-2xl font-bold sm:text-3xl">History</h1>
      <p className="text-gray-600">Search your previously generated AI content</p>

      
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      {filteredHistory.length === 0 ? (
        <p className="text-gray-500 mt-4">No history found.</p>
      ) : (
        <div className="mt-6 hidden overflow-x-auto md:block">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
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
              <article key={item.id} className="rounded-lg border bg-white p-4 shadow-sm">
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
