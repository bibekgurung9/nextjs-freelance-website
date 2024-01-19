const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main(){
  try{
    await database.category.createMany({
      data: [
      { name: "Programming and Development" },
      { name: "Digital Marketing" },
      { name: "Sales and Marketing" },
      { name: "Writing and Content Creation" },
      { name: "Graphic Design and Multimedia" },
      { name: "Online Tutoring and Education" },
      { name: "E-commerce Services" },
      { name: "Consulting and Business Services" },
      { name: "Health and Wellness" },
      { name: "Administrative Support" },
      { name: "Translation and Language Services" },
      { name: "Event Planning" },
      { name: "Real Estate Services" },
      { name: "Engineering and Architecture" },
    ]
    })
    console.log("Success!")
  } catch(error){
    console.log("Error seeding the database categories", error);
  } finally{
    await database.$disconnect();
  }
}

main();