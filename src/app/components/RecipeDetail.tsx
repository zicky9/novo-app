"use client";

import { ArrowLeft, Clock, Users, Flame, Heart, Share2, CheckCircle, Beef, Wheat, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RecipeDetailProps {
  recipe: {
    name: string;
    image: string;
    time: number;
    servings: number;
    calories: number;
    difficulty: string;
    category: string;
    ingredients?: string[];
    steps?: string[];
    nutrition?: {
      protein?: number;
      carbs?: number;
      fat?: number;
    };
  };
  onBack: () => void;
}

export default function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  // Garantir que todos os dados sejam seguros
  const ingredients = recipe?.ingredients || [];
  const steps = recipe?.steps || [];
  const nutrition = recipe?.nutrition || {};
  const protein = nutrition?.protein || 0;
  const carbs = nutrition?.carbs || 0;
  const fat = nutrition?.fat || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-emerald-50"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-900">Receita</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-50">
              <Share2 className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Recipe Image */}
        <div className="mb-6">
          <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden bg-white shadow-lg">
            <img
              src={recipe?.image || '/placeholder.jpg'}
              alt={recipe?.name || 'Receita'}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2">
                {recipe?.category || 'Categoria'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{recipe?.name || 'Receita sem nome'}</h1>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
            <Clock className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{recipe?.time || 0}</p>
            <p className="text-xs text-gray-600">minutos</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
            <Users className="w-6 h-6 text-teal-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{recipe?.servings || 0}</p>
            <p className="text-xs text-gray-600">porções</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{recipe?.calories || 0}</p>
            <p className="text-xs text-gray-600">calorias</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
            <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{recipe?.difficulty || 'N/A'}</p>
            <p className="text-xs text-gray-600">nível</p>
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 mb-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-4">Valores Nutricionais (por porção)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Beef className="w-6 h-6 mx-auto mb-2" />
              <p className="text-2xl font-bold">{protein}g</p>
              <p className="text-xs opacity-90">Proteína</p>
            </div>
            <div className="text-center">
              <Wheat className="w-6 h-6 mx-auto mb-2" />
              <p className="text-2xl font-bold">{carbs}g</p>
              <p className="text-xs opacity-90">Carboidratos</p>
            </div>
            <div className="text-center">
              <Droplet className="w-6 h-6 mx-auto mb-2" />
              <p className="text-2xl font-bold">{fat}g</p>
              <p className="text-xs opacity-90">Gordura</p>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredientes</h3>
          {ingredients.length > 0 ? (
            <ul className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhum ingrediente disponível</p>
          )}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Modo de Preparo</h3>
          {steps.length > 0 ? (
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    completedSteps.includes(index)
                      ? "bg-emerald-50 border-2 border-emerald-500"
                      : "bg-gray-50 border-2 border-transparent hover:border-emerald-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold transition-all duration-300 ${
                      completedSteps.includes(index)
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-gray-600 border-2 border-gray-300"
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p
                    className={`flex-1 leading-relaxed transition-all duration-300 ${
                      completedSteps.includes(index)
                        ? "text-emerald-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhum passo disponível</p>
          )}
        </div>

        {/* Progress */}
        {steps.length > 0 && (
          <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Progresso da Receita</span>
              <span className="text-sm font-bold text-emerald-600">
                {completedSteps.length}/{steps.length} passos
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
