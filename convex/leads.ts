import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    organisation: v.string(),
    role: v.optional(v.string()),
    productInterest: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      ...args,
      status: "new",
      eventId: "osr-2026",
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    
    return await ctx.db.patch(args.id, { status: args.status });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.log("No identity found in Convex context");
      return [];
    }
    
    // Check role in token metadata
    // In Clerk, this is often found in identity.role or custom claims
    const role = (identity as any).role || (identity as any).publicMetadata?.role;
    console.log("Server side identity:", identity.email, "Role:", role);

    return await ctx.db
      .query("leads")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { total: 0, today: 0 };

    const leads = await ctx.db
      .query("leads")
      .withIndex("by_eventId", (q) => q.eq("eventId", "osr-2026"))
      .collect();

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db
      .query("leads")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
