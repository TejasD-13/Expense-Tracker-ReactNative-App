import Category from "../models/Category";

export const getCategories = async (req, res) => {
    try {
        const categories = (await Category.find({userId: req.userId})).toSorted({
            name: 1,
        })
    } catch (error) {
        
    }
}