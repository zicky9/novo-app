"use client";

import { ArrowLeft, Heart, Clock, TrendingUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FavoritesProps {
  onBack: () => void;
  onSelectRecipe: (recipe: any) => void;
}

export default function Favorites({ onBack, onSelectRecipe }: FavoritesProps) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([
    {
      id: 1,
      name: "Smoothie Bowl de Frutas Vermelhas",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
      time: "10 min",
      difficulty: "Fácil",
      healthScore: 92,
      category: "healthy"
    },
    {
      id: 2,
      name: "Salada Grega com Iogurte",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      time: "15 min",
      difficulty: "Fácil",
      healthScore: 88,
      category: "healthy"
    },
    {
      id: 3,
      name: "Panquecas de Aveia e Banana",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      time: "20 min",
      difficulty: "Médio",
      healthScore: 85,
      category: "healthy"
    },
    {
      id: 4,
      name: "Bowl de Iogurte com Granola",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
      time: "5 min",
      difficulty: "Fácil",
      healthScore: 90,
      category: "healthy"
    }
  ]);

  const [favoriteProducts, setFavoriteProducts] = useState([
    { id: 1, name: "Iogurte Grego Natural", score: 85, category: "healthy", savedDate: "Há 2 dias" },
    { id: 2, name: "Aveia Integral", score: 90, category: "healthy", savedDate: "Há 5 dias" },
    { id: 3, name: "Mel Orgânico", score: 75, category: "moderate", savedDate: "Há 1 semana" }
  ]);

  const handleRemoveRecipe = (recipeId: number) => {
    setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.id !== recipeId));
  };

  const handleRemoveProduct = (productId: number) => {
    setFavoriteProducts(favoriteProducts.filter(product => product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-emerald-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Meus Favoritos</h2>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white shadow-lg">
            <Heart className="w-8 h-8 mb-2" />
            <p className="text-3xl font-bold mb-1">{favoriteRecipes.length}</p>
            <p className="text-sm opacity-90">Receitas Favoritas</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
            <TrendingUp className="w-8 h-8 mb-2" />
            <p className="text-3xl font-bold mb-1">{favoriteProducts.length}</p>
            <p className="text-sm opacity-90">Produtos Salvos</p>
          </div>
        </div>

        {/* Favorite Recipes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Receitas Favoritas</h3>
          {favoriteRecipes.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700">
              <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Nenhuma receita favorita ainda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => onSelectRecipe(recipe)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveRecipe(recipe.id);
                        }}
                      >
                        <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        recipe.category === "healthy" ? "bg-emerald-500" :
                        recipe.category === "moderate" ? "bg-amber-500" :
                        "bg-red-500"
                      }`}>
                        {recipe.healthScore} pontos
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{recipe.name}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorite Products */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Produtos Salvos</h3>
          {favoriteProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700">
              <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Nenhum produto salvo ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-3 h-3 rounded-full ${
                        product.category === "healthy" ? "bg-emerald-500" :
                        product.category === "moderate" ? "bg-amber-500" :
                        "bg-red-500"
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{product.savedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{product.score}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">pontos</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
