import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) =>{
    
    const data = await ctx.db.find({
    collection: "categories",
    depth: 1, // Tạo subscategories, subcategories[0] sex
    pagination: false,
    where:{
      parent:{
        exists: false
      }
    },
    sort: "name"
    });
    
    const formattedData= data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                // "Depth : 1" tạo ra 1 loại của "Category"
                ...(doc as  Category),
            }))
        }));
        return formattedData;
    })
})