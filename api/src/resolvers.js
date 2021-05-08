import { Category } from "../models/Category.js";

export const resolvers = {
  Query: {
    hello: () => "hi",
    categories: () => Category.find({}),
    getCategory: (parent, args) => {
      return Category.findById(args.id);
    }
  },
  Mutation: {
    createCategory: async (_, { term,keywords }) => {
      Category.findOne({"term":term}, function(err, example){
        console.log(term)
        if(err) console.log(err);
        if ( example){
          console.log(example)
          console.log("This has already been saved");
        } else {
          console.log("Not Saved")
          const category = new Category({ term, keywords});
          category.save();
          return category;
        }
    });
      
    },
    updateCategory:(parent, args) => {
      if (!args.term) return;
        return Category.updateOne(
         {
           term: args.term
         },
         {
           $set: {
             term: args.term,
             keywords: args.keywords,
           }
         }, {new: true}, (err, Category) => {
           if (err) {
             console.log('Something went wrong when updating the Category');
           } else {
           }
         }
      );
    },
    deleteCategory:(parent,args)=>{
      if (!args.term) return;
      return Category.deleteOne({term:args.term})
    }
  }
};