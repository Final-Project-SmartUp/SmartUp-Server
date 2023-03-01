const axios = require("axios");

class QuestionController {
    static async getQuestionsByCategoryValue(request, response, next) {
        try {
            const { categoryValue } = request.params;
            let url = `https://opentdb.com/api.php?amount=5&category=${categoryValue}&type=multiple`;
            console.log("asdasdsad");
            const { data } = await axios({
                method: "GET",
                url: url,
            });
            response.status(200).json(data);
        } catch (err) {
            console.log(err);
            response.status(500).json(err);
        }
    }
}

module.exports = QuestionController;
