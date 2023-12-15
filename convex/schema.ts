import { defineSchema,defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocumentId: v.optional(v.id("documents")),
        content: v.optional(v.string()), 
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
    })
    .index("userId",["userId"])
    .index("by_user_parent",["userId","parentDocumentId"])
})