"use client";

import React, { useContext, useState } from "react";
import FormSection from "../components/FormSection";
import OutputSection from "../components/OutputSection";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsage } from "@/app/(context)/UpdateCreditUsage";
import Templates from "@/app/(data)/Templates";


const CreateNewContent: React.FC = () => {
  const params = useParams(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { creditUsage, setCreditUsage } = useContext(UpdateCreditUsage);

  const maxWords = userSubscription ? 100000 : 10000;

  const GenerateAIContent = async (FormData: any) => {
    if (totalUsage >= maxWords) {
      alert("You have reached your usage limit. Upgrade your plan.");
      router.push("/dashboard/billing");
      return;
    }

    setLoading(true);

    try {
      const templateSlug = params["template-slug"] as string;
      const selectedTemplate = Templates.find((item) => item.slug === templateSlug);

      if (!selectedTemplate) {
        throw new Error("Invalid template.");
      }

      const prompt = JSON.stringify(FormData) + ", " + selectedTemplate.aiPrompt;
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await response.json()) as { text?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Content generation failed.");
      }

      const aiResponseText = data.text || "";
      setAiOutput(aiResponseText);
      await SaveInDb(FormData, selectedTemplate.slug, aiResponseText);
      setCreditUsage(Date.now());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Content generation failed.";
      alert(message);
      console.error("Content generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (FormData: any, slug: string, aiResp: string) => {
    try {
      await db.insert(AIOutput).values({
        FormData: FormData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown_user",
        createdAt: moment().format("DD/MM/yyyy"),
      });
      console.log("Saved to DB successfully!");
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">AI workspace</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Create new content</h1></div>
        <Button variant="outline" asChild className="rounded-xl">
          <Link href={"/dashboard"}><ArrowLeft /> All templates</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(18rem,23rem)_minmax(0,1fr)]">
        {/* Form Section */}
        <FormSection
          selectedTemplate={Templates.find((item) => item.slug === params["template-slug"])}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* Output Section */}
        <div className="min-w-0">
          <OutputSection aiOutput={aiOutput} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
