const Category = require("../../../../../Models/TestSeries/Category");
const Series = require("../../../../../Models/TestSeries/Series");
const Test = require("../../../../../Models/TestSeries/Test");
const Question = require("../../../../../Models/TestSeries/Question");
const Option = require("../../../../../Models/TestSeries/Option");
const { deleteFile } = require("../../../../../Utils/subaseS3");

// Helper function to delete image if exists
async function deleteEntityImage(entity) {
    if (entity.imageUrl) {
        await deleteFile(entity.imageUrl);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.body;
        const category = await Category.findByPk(id);
        
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Find all series in this category
        const series = await Series.findAll({ where: { CategoryId: id } });
        
        for (const serie of series) {
            // Find all tests in this series
            const tests = await Test.findAll({ where: { SeriesId: serie.id } });
            
            for (const test of tests) {
                // Find all questions in this test
                const questions = await Question.findAll({ where: { TestId: test.id } });
                
                for (const question of questions) {
                    // Delete all options of this question
                    const options = await Option.findAll({ where: { QuestionId: question.id } });
                    for (const option of options) {
                        await deleteEntityImage(option);
                        await option.destroy();
                    }
                    
                    await deleteEntityImage(question);
                    await question.destroy();
                }
                
                await deleteEntityImage(test);
                await test.destroy();
            }
            
            await deleteEntityImage(serie);
            await serie.destroy();
        }
        
        await deleteEntityImage(category);
        await category.destroy();

        return res.status(200).json({ success: true, message: "Category and all associated content deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

exports.deleteSeries = async (req, res, next) => {
    try {
        const { id } = req.body;
        const series = await Series.findByPk(id);
        
        if (!series) {
            return res.status(404).json({ success: false, message: "Series not found" });
        }

        // Find all tests in this series
        const tests = await Test.findAll({ where: { SeriesId: id } });
        
        for (const test of tests) {
            const questions = await Question.findAll({ where: { TestId: test.id } });
            
            for (const question of questions) {
                const options = await Option.findAll({ where: { QuestionId: question.id } });
                for (const option of options) {
                    await deleteEntityImage(option);
                    await option.destroy();
                }
                
                await deleteEntityImage(question);
                await question.destroy();
            }
            
            await deleteEntityImage(test);
            await test.destroy();
        }
        
        await deleteEntityImage(series);
        await series.destroy();

        return res.status(200).json({ success: true, message: "Series and all associated content deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

exports.deleteTest = async (req, res, next) => {
    try {
        const { id } = req.body;
        const test = await Test.findByPk(id);
        
        if (!test) {
            return res.status(404).json({ success: false, message: "Test not found" });
        }

        const questions = await Question.findAll({ where: { TestId: id } });
        
        for (const question of questions) {
            const options = await Option.findAll({ where: { QuestionId: question.id } });
            for (const option of options) {
                await deleteEntityImage(option);
                await option.destroy();
            }
            
            await deleteEntityImage(question);
            await question.destroy();
        }
        
        await deleteEntityImage(test);
        await test.destroy();

        return res.status(200).json({ success: true, message: "Test and all associated content deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

exports.deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.body;
        const question = await Question.findByPk(id);
        
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        const options = await Option.findAll({ where: { QuestionId: id } });
        for (const option of options) {
            await deleteEntityImage(option);
            await option.destroy();
        }
        
        await deleteEntityImage(question);
        await question.destroy();

        return res.status(200).json({ success: true, message: "Question and all associated options deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

exports.deleteOption = async (req, res, next) => {
    try {
        const { id } = req.body;
        const option = await Option.findByPk(id);
        
        if (!option) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }

        await deleteEntityImage(option);
        await option.destroy();

        return res.status(200).json({ success: true, message: "Option deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};