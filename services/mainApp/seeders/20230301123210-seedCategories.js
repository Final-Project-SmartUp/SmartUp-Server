"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let categories = [
            {
                name: "General Knowledge",
                value: 9,
            },
            {
                name: "Books",
                value: 10,
            },
            {
                name: "Films",
                value: 11,
            },
            {
                name: "Music",
                value: 12,
            },
            {
                name: "Musicals and Theaters",
                value: 13,
            },
            {
                name: "Television",
                value: 14,
            },
            {
                name: "Video Games",
                value: 15,
            },
            {
                name: "Board Games",
                value: 16,
            },
            {
                name: "Science and Nature",
                value: 17,
            },
            {
                name: "Computer",
                value: 18,
            },
            {
                name: "Mathematics",
                value: 19,
            },
            {
                name: "Mythology",
                value: 20,
            },
            {
                name: "Sports",
                value: 21,
            },
            {
                name: "Geography",
                value: 22,
            },
            {
                name: "History",
                value: 23,
            },
            {
                name: "Politics",
                value: 24,
            },
            {
                name: "Art",
                value: 25,
            },
            {
                name: "Celebrities",
                value: 26,
            },
            {
                name: "Animals",
                value: 27,
            },
            {
                name: "Vehicles",
                value: 28,
            },
            {
                name: "Comics",
                value: 29,
            },
            {
                name: "Gadgets",
                value: 30,
            },
            {
                name: "Japanese Anime",
                value: 31,
            },
            {
                name: "Cartoon and Animations",
                value: 32,
            },
        ].map((el) => {
            el.createdAt = new Date();
            el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Categories", categories, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
