import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    organisation: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      ...args,
      eventId: "osr-2026",
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_createdAt")
      .order("desc")
      .take(1000);
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db
      .query("leads")
      .withIndex("by_eventId", (q) => q.eq("eventId", "osr-2026"))
      .collect();

    // Calculate "today" starting from midnight local time or UTC. We will use UTC midnight here.
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayMillis = startOfToday.getTime();

    const todayLeads = leads.filter((l) => l.createdAt >= todayMillis).length;

    return {
      total: leads.length,
      today: todayLeads,
    };
  },
});

export const exportAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
