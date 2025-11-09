const express = require("express");
const dotenv = require("dotenv");
const {
  foodList,
  foodLocations,
  nutritionInfo,
  stockouts,
} = require("./mockdata");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const delayFunction = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//function 1 (food list)

async function getFoodList() {
  await delayFunction(115);
  return foodList;
}

//Function 2 (food locations)
async function getFoodLocations() {
  await delayFunction(2 * 60 * 1000); // 2 minutes
  return foodLocations;
}

//Function 3 (nutrition info)
async function getNutritionInfo() {
  await delayFunction(30);
  return nutritionInfo;
}

//Function 4 (stockouts)
async function getStockouts() {
  await delayFunction(200);
  return stockouts;
}

app.get("/food-data", async (req, res) => {
  try {
    const startTime = Date.now();

    const [foodListData, foodLocationsData, nutritionInfoData, stockoutsData] =
      await Promise.all([
        getFoodList(),
        getFoodLocations(),
        getNutritionInfo(),
        getStockouts(),
      ]);

    const mergedData = foodListData.map((food) => {
      const stockOutEntries =
        stockoutsData.filter((s) => s.foodId === food.id) || [];

      const locationIdsOut = new Set();
      stockOutEntries.forEach((s) => {
        if (Array.isArray(s.locationIds))
          s.locationIds.forEach((id) => locationIdsOut.add(id));
      });

      const availableAt = foodLocationsData
        .filter(
          (loc) =>
            Array.isArray(loc.availableFoods) &&
            loc.availableFoods.includes(food.id)
        )
        .filter((loc) => !locationIdsOut.has(loc.id))
        .map((loc) => ({ id: loc.id, name: loc.name }));

      return {
        ...food,
        nutrition: nutritionInfoData[food.id],
        stockOut:
          stockoutsData.find((stockout) => stockout.foodId === food.id) || null,
        isAvailable: availableAt.length > 0,
        availableAt,
      };
    });

    const totalTimeTaken = Date.now() - startTime;

    res.json({
      query: "Food data for Goa",
      data: mergedData,
      responseGeneratedAt: new Date().toISOString(),
      timeTakenMs: totalTimeTaken,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
