"use client";

import { ArrowLeft, Heart, Share2, AlertCircle, CheckCircle, AlertTriangle, Flame, Beef, Wheat, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProductAnalysisProps {
  product: {
    name: string;
    brand: string;
    image: string;
    healthScore: number;
    category: "healthy" | "moderate" | "unhealthy";
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      sugar: number;
      fiber: number;
      sodium: number;
    };
    ingredients: string[];
    analysis: string;
  };
  onViewRecipes: () => void;
  onBack: () => void;
}

export default function ProductAnalysis({ product, onViewRecipes, onBack }: ProductAnalysisProps) {
  const getHealthColor = () => {
    if (product.category === "healthy") return "from-emerald-500 to-teal-600";
    if (product.category === "moderate") return "from-amber-500 to-orange-600";
    return "from-red-500 to-rose-600";
  };

  const getHealthIcon = () => {
    if (product.category === "healthy") return <CheckCircle className="w-8 h-8" />;
    if (product.category === "moderate") return <AlertTriangle className="w-8 h-8" />;
    return <AlertCircle className="w-8 h-8" />;
  };

  const getHealthText = () => {
    if (product.category === "healthy") return "Produto Saudável";
    if (product.category === "moderate") return "Consumo Moderado";
    return "Evite Consumo Frequente";
  };

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
          <h2 className="text-lg font-semibold text-gray-900">Análise do Produto</h2>
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
        {/* Product Image */}
        <div className="mb-6">
          <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden bg-white shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.brand}</p>
        </div>

        {/* Health Score Card */}
        <div className={`bg-gradient-to-r ${getHealthColor()} rounded-3xl p-6 text-white mb-6 shadow-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getHealthIcon()}
              <div>
                <p className="text-sm opacity-90">Pontuação de Saúde</p>
                <p className="text-3xl font-bold">{product.healthScore}/100</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{getHealthText()}</p>
            </div>
          </div>
          <Progress value={product.healthScore} className="h-3 bg-white/20" />
        </div>

        {/* Nutrition Facts */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Informação Nutricional</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-2xl">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{product.nutrition.calories}</p>
              <p className="text-xs text-gray-600">Calorias</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-2xl">
              <Beef className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{product.nutrition.protein}g</p>
              <p className="text-xs text-gray-600">Proteína</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-2xl">
              <Wheat className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{product.nutrition.carbs}g</p>
              <p className="text-xs text-gray-600">Carboidratos</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-2xl">
              <Droplet className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{product.nutrition.fat}g</p>
              <p className="text-xs text-gray-600">Gordura</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Açúcar</span>
              <span className="text-sm font-semibold text-gray-900">{product.nutrition.sugar}g</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fibra</span>
              <span className="text-sm font-semibold text-gray-900">{product.nutrition.fiber}g</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sódio</span>
              <span className="text-sm font-semibold text-gray-900">{product.nutrition.sodium}mg</span>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredientes</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 mb-6 border border-emerald-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Análise Nutricional</h3>
          <p className="text-gray-700 leading-relaxed">{product.analysis}</p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onViewRecipes}
          size="lg"
          className="w-full h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Ver Receitas com Este Produto
        </Button>
      </main>
    </div>
  );
}
