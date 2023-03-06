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
                imgUrl: "https://img.icons8.com/external-chloe-kerismaker/256/external-general-knowledge-education-chloe-kerismaker.png"
            },
            {
                name: "Books",
                value: 10,
                imgUrl: "https://img.icons8.com/dusk/256/book-shelf.png"
            },
            {
                name: "Films",
                value: 11,
                imgUrl: "https://img.icons8.com/officel/256/film-reel.png"
            },
            {
                name: "Music",
                value: 12,
                imgUrl: "https://img.icons8.com/officel/256/musical-notes.png"
            },
            {
                name: "Musicals and Theaters",
                value: 13,
                imgUrl: "https://img.icons8.com/officel/256/theatre-mask.png"
            },
            {
                name: "Television",
                value: 14,
                imgUrl: "https://img.icons8.com/officel/256/retro-tv.png"
            },
            {
                name: "Video Games",
                value: 15,
                imgUrl: "https://img.icons8.com/officel/256/controller.png"
            },
            {
                name: "Board Games",
                value: 16,
                imgUrl: "https://img.icons8.com/officel/1x/checkers.png"
            },
            {
                name: "Science and Nature",
                value: 17,
                imgUrl: "https://img.icons8.com/officel/256/biotech.png"
            },
            {
                name: "Computer",
                value: 18,
                imgUrl: "https://img.icons8.com/officel/256/workstation.png"
            },
            {
                name: "Mathematics",
                value: 19,
                imgUrl: "https://img.icons8.com/officel/256/math.png"
            },
            {
                name: "Mythology",
                value: 20,
                imgUrl: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-mythology-history-flaticons-lineal-color-flat-icons.png"
            },
            {
                name: "Sports",
                value: 21,
                imgUrl: "https://img.icons8.com/stickers/256/strength.png"
            },
            {
                name: "Geography",
                value: 22,
                imgUrl: "https://img.icons8.com/officel/256/globe-earth.png"
            },
            {
                name: "History",
                value: 23,
                imgUrl: "https://img.icons8.com/external-goofy-color-kerismaker/256/external-history-education-goofy-color-kerismaker.png"
            },
            {
                name: "Politics",
                value: 24,
                imgUrl: "https://img.icons8.com/external-justicon-flat-justicon/256/external-politics-woman-day-justicon-flat-justicon-1.png"
            },
            {
                name: "Art",
                value: 25,
                imgUrl: "https://img.icons8.com/dusk/256/art-prices.png"
            },
            {
                name: "Celebrities",
                value: 26,
                imgUrl: "https://img.icons8.com/cotton/256/the-oscars.png"
            },
            {
                name: "Animals",
                value: 27,
                imgUrl: "https://img.icons8.com/dusk/256/pets.png"
            },
            {
                name: "Vehicles",
                value: 28,
                imgUrl: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-vehicles-automotive-dealership-flaticons-lineal-color-flat-icons-11.png"
            },
            {
                name: "Comics",
                value: 29,
                imgUrl: "https://img.icons8.com/external-microdots-premium-microdot-graphic/256/external-comic-lifestyle-entertainment-vol3-microdots-premium-microdot-graphic.png"
            },
            {
                name: "Gadgets",
                value: 30,
                imgUrl: "https://img.icons8.com/clouds/256/smartphone-tablet.png"
            },
            {
                name: "Japanese Anime",
                value: 31,
                imgUrl: "https://img.icons8.com/clouds/256/sharingan.png"
            },
            {
                name: "Cartoon and Animations",
                value: 32,
                imgUrl: "https://img.icons8.com/office/256/animation.png"
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
