import mongoose from "mongoose";

export const Category = mongoose.model("Category", { term: String,keywords: [{type: String}] });