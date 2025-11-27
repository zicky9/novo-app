"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, TrendingUp, Heart, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import CameraScreen from "./components/CameraScreen";
import ProductAnalysis from "./components/ProductAnalysis";
import RecipesList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";
import UserProfile from "./components/UserProfile";
import Favorites from "./components/Favorites";
import Progress from "./components/Progress";
import Settings from "./components/Settings";

type Screen = "home" | "camera" | "analysis" | "recipes" | "recipe-detail" | "profile" | "favorites" | "progress" | "settings";

export default function FoodLens() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePhotoTaken = async (imageData: string) => {
    setErrorMessage("");
    
    try {
      // Envia a imagem para análise com OpenAI Vision
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Verifica se é erro de configuração da API
        if (result.details?.includes('API key') || result.details?.includes('401')) {
          setErrorMessage('Configure sua chave da OpenAI para usar a análise de alimentos. Clique no banner laranja acima.');
        } else {
          setErrorMessage(result.details || 'Erro ao analisar imagem. Tente novamente.');
        }
        
        // Mostra produto com erro
        const errorProduct = {
          name: "Erro na Análise",
          brand: "Configuração Necessária",
          image: imageData,
          healthScore: 0,
          category: "moderate",
          nutrition: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            sugar: 0,
            fiber: 0,
            sodium: 0
          },
          ingredients: ["Configure a chave da OpenAI para análise completa"],
          analysis: errorMessage || "Para usar a análise de alimentos, você precisa configurar sua chave da OpenAI. Clique no banner laranja que aparecerá acima para adicionar sua OPENAI_API_KEY."
        };
        setSelectedProduct(errorProduct);
        setCurrentScreen("analysis");
        return;
      }

      setSelectedProduct(result);
      setCurrentScreen("analysis");
    } catch (error) {
      console.error('Erro na análise:', error);
      setErrorMessage('Erro de conexão. Verifique sua internet e tente novamente.');
      
      // Fallback para dados de erro
      const errorProduct = {
        name: "Erro de Conexão",
        brand: "Tente Novamente",
        image: imageData,
        healthScore: 0,
        category: "moderate",
        nutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          sugar: 0,
          fiber: 0,
          sodium: 0
        },
        ingredients: ["Não foi possível conectar ao servidor"],
        analysis: "Ocorreu um erro de conexão. Por favor, verifique sua internet e tente novamente."
      };
      setSelectedProduct(errorProduct);
      setCurrentScreen("analysis");
    }
  };

  const handleViewRecipes = () => {
    setCurrentScreen("recipes");
  };

  const handleSelectRecipe = (recipe: any) => {
    setSelectedRecipe(recipe);
    setCurrentScreen("recipe-detail");
  };

  const handleBack = () => {
    if (currentScreen === "recipe-detail") {
      setCurrentScreen("recipes");
    } else if (currentScreen === "recipes") {
      setCurrentScreen("analysis");
    } else if (currentScreen === "analysis") {
      setCurrentScreen("home");
    } else if (currentScreen === "camera") {
      setCurrentScreen("home");
    } else if (currentScreen === "profile") {
      setCurrentScreen("home");
    } else if (currentScreen === "favorites") {
      setCurrentScreen("home");
    } else if (currentScreen === "progress") {
      setCurrentScreen("home");
    } else if (currentScreen === "settings") {
      setCurrentScreen("profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {currentScreen === "home" && (
        <HomeScreen 
          onOpenCamera={() => setCurrentScreen("camera")}
          onOpenProfile={() => setCurrentScreen("profile")}
          onOpenFavorites={() => setCurrentScreen("favorites")}
          onOpenProgress={() => setCurrentScreen("progress")}
          onPhotoTaken={handlePhotoTaken}
          errorMessage={errorMessage}
        />
      )}
      
      {currentScreen === "camera" && (
        <CameraScreen 
          onPhotoTaken={handlePhotoTaken}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === "analysis" && selectedProduct && (
        <ProductAnalysis 
          product={selectedProduct}
          onViewRecipes={handleViewRecipes}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === "recipes" && (
        <RecipesList 
          product={selectedProduct}
          onSelectRecipe={handleSelectRecipe}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === "recipe-detail" && selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === "profile" && (
        <UserProfile 
          onBack={handleBack}
          onOpenSettings={() => setCurrentScreen("settings")}
        />
      )}

      {currentScreen === "favorites" && (
        <Favorites 
          onBack={handleBack}
          onSelectRecipe={handleSelectRecipe}
        />
      )}

      {currentScreen === "progress" && (
        <Progress onBack={handleBack} />
      )}

      {currentScreen === "settings" && (
        <Settings onBack={handleBack} />
      )}
    </div>
  );
}

function HomeScreen({ 
  onOpenCamera, 
  onOpenProfile,
  onOpenFavorites,
  onOpenProgress,
  onPhotoTaken,
  errorMessage
}: { 
  onOpenCamera: () => void; 
  onOpenProfile: () => void;
  onOpenFavorites: () => void;
  onOpenProgress: () => void;
  onPhotoTaken: (imageData: string) => void;
  errorMessage?: string;
}) {
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        onPhotoTaken(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const recentScans = [
    { name: "Iogurte Grego", score: 85, category: "healthy" },
    { name: "Cereais Integrais", score: 72, category: "moderate" },
    { name: "Refrigerante", score: 35, category: "unhealthy" }
  ];

  const quickTips = [
    "Produtos com menos de 5 ingredientes são geralmente mais saudáveis",
    "Evite alimentos com açúcar nos primeiros 3 ingredientes",
    "Fibras são essenciais para uma boa digestão"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FoodLens
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Alimentação inteligente</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-emerald-50 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Moon className="w-5 h-5 text-emerald-600" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenProfile}
              className="rounded-full hover:bg-emerald-50 dark:hover:bg-gray-700"
            >
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
            <p className="text-red-800 dark:text-red-300 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Descubra o que está no seu prato
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tire uma foto de qualquer alimento e receba análise nutricional instantânea com sugestões de receitas saudáveis
          </p>
        </div>

        {/* Main Action Button */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <Button
            onClick={onOpenCamera}
            size="lg"
            className="w-full max-w-md h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Camera className="w-6 h-6 mr-3" />
            Tirar Foto do Produto
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleGalleryUpload}
            className="w-full max-w-md h-14 border-2 border-emerald-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700 text-emerald-700 dark:text-emerald-400 rounded-2xl transition-all duration-300"
          >
            <Upload className="w-5 h-5 mr-2" />
            Enviar da Galeria
          </Button>
        </div>

        {/* Recent Scans */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Análises Recentes</h3>
            <Button variant="ghost" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
              Ver todas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentScans.map((scan, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{scan.name}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    scan.category === "healthy" ? "bg-emerald-500" :
                    scan.category === "moderate" ? "bg-amber-500" :
                    "bg-red-500"
                  }`} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        scan.category === "healthy" ? "bg-emerald-500" :
                        scan.category === "moderate" ? "bg-amber-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${scan.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{scan.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips Carousel */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-xl font-bold">Dica do Dia</h3>
          </div>
          <div className="space-y-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-around">
            <Button variant="ghost" className="flex-col h-auto py-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-5 h-5 mb-1" />
              <span className="text-xs">Início</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={onOpenFavorites}
            >
              <Heart className="w-5 h-5 mb-1" />
              <span className="text-xs">Favoritos</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={onOpenProgress}
            >
              <TrendingUp className="w-5 h-5 mb-1" />
              <span className="text-xs">Progresso</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400" 
              onClick={onOpenProfile}
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
