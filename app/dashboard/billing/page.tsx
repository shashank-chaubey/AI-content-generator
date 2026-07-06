"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Check, Loader2Icon, Sparkles } from "lucide-react";
import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";

const plans = [
  { name: "Free", price: 0, credits: 10000, description: "Great for starters" },
  { name: "Pro", price: 200, originalPrice: 300, credits: 100000, description: "Best for professionals & regular users" },
];

declare global{
  interface Window {
    Razorpay: any;
  }
}

function BillingPage() {
  const { user } = useUser();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const { setTotalUsage } = useContext(TotalUsageContext);

  const CreateSubscription = async (plan: any) => {
    if (plan.name === "Free") return;

    try {
      setLoadingPlan(plan.name);
      const response = await axios.post("/api/create-subscription", { plan });
      console.log("Subscription Created:", response.data);
      OnPayment(response.data.id);
    } catch (error) {
      alert("Something went wrong. Please refresh the page and try again!");
      setLoadingPlan(null);
    }
  };

  const OnPayment = (subId: string) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subId,
        name: "ContGen",
        description: "Monthly Subscription",
        handler: async (response: any) => {
          console.log("Payment Success:", response);
          if (response?.razorpay_payment_id) {
            await SaveSubscription(response.razorpay_payment_id);
          }
          setLoadingPlan(null);
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay is not loaded. Please refresh the page.");
    }
  };

  const SaveSubscription = async (paymentId: string) => {
    try {
      await db.insert(UserSubscription).values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        active: true,
        paymentId: paymentId,
        joinDate: moment().format("DD/MM/yyyy"),
      });

      console.log("Subscription saved successfully!");
      setUserSubscription(true);
      setTotalUsage(0);
      window.location.reload();
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="mx-auto mb-10 max-w-2xl text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"><Sparkles className="h-6 w-6" /></div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Simple pricing</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Create more when inspiration hits</h1><p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">Start free and move to Pro when you need a larger monthly creative budget.</p></div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-8 ${plan.name === "Pro" ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200"}`}
          >
            {plan.name === "Pro" && <span className="absolute right-5 top-5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">Most popular</span>}
            <h2 className="text-xl font-bold text-slate-950">{plan.name}</h2>
            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {plan.originalPrice && (
                <span className="mr-2 text-base font-normal text-slate-400 line-through">₹{plan.originalPrice}</span>
              )}
              ₹{plan.price}/month
            </p>
            <p className="mt-3 text-sm text-slate-500">{plan.description}</p>
            <div className="my-6 h-px bg-slate-100" />
            <ul className="space-y-3 text-sm text-slate-600"><li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" />{plan.credits.toLocaleString()} monthly credits</li><li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" />All content templates</li><li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" />Generation history</li></ul>
            <button
              type="button"
              disabled={plan.name === "Free" || loadingPlan === plan.name}
              className={`mt-7 flex h-12 w-full items-center justify-center rounded-xl font-semibold transition ${
                plan.name === "Free" ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-slate-950 text-white hover:bg-slate-800"
              }`}
              onClick={() => CreateSubscription(plan)}
            >
              {loadingPlan === plan.name && <Loader2Icon className="animate-spin mr-2 w-5 h-5" />}
              {plan.name === "Free" ? "Free plan" : "Upgrade to Pro"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillingPage;
