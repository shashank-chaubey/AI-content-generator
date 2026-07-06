"use client";

import React, { useContext, useState } from "react";
import FormSection from "../components/FormSection";
import OutputSection from "../components/OutputSection";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { chatSession } from "@/utils/AiModel";
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
    const templateSlug = params["template-slug"] as string; 

    const selectedTemplate = Templates.find((item) => item.slug === templateSlug);

    if (!selectedTemplate) {
      alert("Invalid template!");
      setLoading(false);
      return;
    }

    const FinalPrompt = JSON.stringify(FormData) + ", " + selectedTemplate.aiPrompt;
    const result = await chatSession.sendMessage(FinalPrompt);

    const aiResponseText = result?.response?.text() || "";
    setAiOutput(aiResponseText);

    await SaveInDb(FormData, selectedTemplate.slug, aiResponseText);
    setLoading(false);
    setCreditUsage(Date.now());
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
    <div className="p-4 sm:p-6 lg:p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 gap-5 py-5 xl:grid-cols-3">
        {/* Form Section */}
        <FormSection
          selectedTemplate={Templates.find((item) => item.slug === params["template-slug"])}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* Output Section */}
        <div className="min-w-0 xl:col-span-2">
          <OutputSection aiOutput={aiOutput} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
