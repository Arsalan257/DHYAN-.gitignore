import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Search, Flame, Scale, Clock, Target } from 'lucide-react';

const FoodPage = () => {
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: 'Breakfast',
      foods: [
        { name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 58, fat: 6 },
        { name: 'Greek Yogurt', calories: 150, protein: 20, carbs: 9, fat: 0 },
      ],
      time: '08:30 AM',
    },
    {
      id: 2,
      name: 'Lunch',
      foods: [
        { name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 15, fat: 28 },
      ],
      time: '12:45 PM',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');

  const foodDatabase = [
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Broccoli (1 cup)', calories: 25, protein: 3, carbs: 5, fat: 0.3 },
    { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21 },
    { name: 'Eggs (2 large)', calories: 140, protein: 12, carbs: 1, fat: 10 },
  ];

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalCalories = () => {
    return meals.reduce((total, meal) => 
      total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0), 0
    );
  };

  const getTotalMacros = () => {
    const totals = { protein: 0, carbs: 0, fat: 0 };
    meals.forEach(meal => {
      meal.foods.forEach(food => {
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fat += food.fat;
      });
    });
    return totals;
  };

  const addFoodToMeal = (food: any, mealId: number) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, foods: [...meal.foods, food] }
        : meal
    ));
    setShowAddFood(false);
    setSearchTerm('');
  };

  const removeFoodFromMeal = (mealId: number, foodIndex: number) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, foods: meal.foods.filter((_, index) => index !== foodIndex) }
        : meal
    ));
  };

  const addNewMeal = () => {
    const newMeal = {
      id: meals.length + 1,
      name: `Meal ${meals.length + 1}`,
      foods: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMeals([...meals, newMeal]);
  };

  const totalCalories = getTotalCalories();
  const totalMacros = getTotalMacros();
  const calorieGoal = 2000;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Nutrition Tracker</h2>
        <p className="text-gray-300 text-lg">Track your daily nutrition and reach your goals</p>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{totalCalories}</p>
            <p className="text-gray-300 text-sm">Calories</p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{Math.round(totalMacros.protein)}g</p>
            <p className="text-gray-300 text-sm">Protein</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{Math.round(totalMacros.carbs)}g</p>
            <p className="text-gray-300 text-sm">Carbs</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{Math.round(totalMacros.fat)}g</p>
            <p className="text-gray-300 text-sm">Fat</p>
          </div>
        </div>
      </div>

      {/* Calorie Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Daily Calorie Goal</h3>
          <span className="text-gray-300">{totalCalories} / {calorieGoal} cal</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
            style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-300 text-sm">
            {calorieGoal - totalCalories > 0 ? `${calorieGoal - totalCalories} calories remaining` : 'Goal reached!'}
          </span>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
                  <p className="text-gray-400 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {meal.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedMeal(meal.id.toString());
                  setShowAddFood(true);
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Food</span>
              </button>
            </div>

            {meal.foods.length > 0 ? (
              <div className="space-y-3">
                {meal.foods.map((food, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{food.name}</h4>
                      <div className="flex space-x-4 text-sm text-gray-400 mt-1">
                        <span>{food.calories} cal</span>
                        <span>P: {food.protein}g</span>
                        <span>C: {food.carbs}g</span>
                        <span>F: {food.fat}g</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFoodFromMeal(meal.id, index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Meal Total:</span>
                    <span className="text-white font-medium">
                      {meal.foods.reduce((total, food) => total + food.calories, 0)} calories
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No foods added yet</p>
              </div>
            )}
          </div>
        ))}

        {/* Add New Meal */}
        <button
          onClick={addNewMeal}
          className="w-full bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-6 text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Meal</span>
        </button>
      </div>

      {/* Add Food Modal */}
      {showAddFood && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-white/20 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Add Food</h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Food List */}
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {filteredFoods.map((food, index) => (
                <div
                  key={index}
                  onClick={() => addFoodToMeal(food, parseInt(selectedMeal))}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <h4 className="text-white font-medium">{food.name}</h4>
                  <div className="flex space-x-4 text-sm text-gray-400 mt-1">
                    <span>{food.calories} cal</span>
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>F: {food.fat}g</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowAddFood(false);
                setSearchTerm('');
              }}
              className="w-full bg-white/10 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;