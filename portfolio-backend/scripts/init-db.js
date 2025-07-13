const { writeDB } = require('../utils/dbUtils');
writeDB({
    contacts: [],
    projects: [
        {
            id: 1,
            title: "Masa Spot Flyer",
            imageUrl: "/assets/images/masa.png"
        }
    ]
});
console.log("Database initialized!");