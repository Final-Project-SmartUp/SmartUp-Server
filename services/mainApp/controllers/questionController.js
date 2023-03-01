const axios = require("axios");

class QuestionController {
    static async getQuestionsByCategoryValue(request, response, next) {
        try {
            const { categoryValue } = request.params;
            //! Soal quiz yang di fetch ada 5 (untuk sekarang)
            let url = `https://opentdb.com/api.php?amount=5&category=${categoryValue}&type=multiple`;

            const { data } = await axios({
                method: "GET",
                url: url,
            });

            let result = data.results.map((el) => {
                let object = {
                    category: el.category,
                    question: el.question.replaceAll("&quot;", '"').replaceAll("\\", "").replaceAll("&#039;", "'"),
                    correctAnswer: el.correct_answer.replaceAll("&quot;", '"').replaceAll("\\", "").replaceAll("&#039;", "'"),
                    incorrectAnswers: el.incorrect_answers.map((el) => el.replaceAll("&quot;", '"').replaceAll("\\", "").replaceAll("&#039;", "'")),
                };
                return object;
            });

            response.status(200).json(result);
        } catch (err) {
            response.status(500).json(err);
        }
    }
}

module.exports = QuestionController;
