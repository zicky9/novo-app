"use client";

import { ArrowLeft, Clock, Users, Flame, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipesListProps {
  product: any;
  onSelectRecipe: (recipe: any) => void;
  onBack: () => void;
}

export default function RecipesList({ product, onSelectRecipe, onBack }: RecipesListProps) {
  const recipes = [
    {
      id: 1,
      name: "Bowl de Iogurte com Frutas e Granola",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop",
      time: 10,
      servings: 1,
      calories: 320,
      difficulty: "Fácil",
      category: "Café da Manhã",
      ingredients: [
        "200g de iogurte grego",
        "1 banana fatiada",
        "1/2 xícara de morangos",
        "3 colheres de sopa de granola",
        "1 colher de sopa de mel",
        "Sementes de chia a gosto"
      ],
      steps: [
        "Coloque o iogurte grego em uma tigela",
        "Adicione as frutas fatiadas por cima",
        "Polvilhe a granola uniformemente",
        "Regue com mel",
        "Finalize com sementes de chia",
        "Sirva imediatamente"
      ],
      nutrition: {
        protein: 18,
        carbs: 45,
        fat: 8
      }
    },
    {
      id: 2,
      name: "Smoothie Proteico de Iogurte",
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&h=600&fit=crop",
      time: 5,
      servings: 1,
      calories: 280,
      difficulty: "Muito Fácil",
      category: "Bebida",
      ingredients: [
        "150g de iogurte grego",
        "1 banana congelada",
        "1/2 xícara de mirtilos",
        "1 colher de sopa de manteiga de amendoim",
        "200ml de leite de amêndoas",
        "1 colher de chá de mel",
        "Gelo a gosto"
      ],
      steps: [
        "Adicione todos os ingredientes no liquidificador",
        "Bata em velocidade alta por 1-2 minutos",
        "Verifique a consistência e ajuste com mais leite se necessário",
        "Sirva em um copo alto",
        "Decore com frutas frescas se desejar"
      ],
      nutrition: {
        protein: 15,
        carbs: 38,
        fat: 10
      }
    },
    {
      id: 3,
      name: "Parfait de Iogurte com Camadas",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
      time: 15,
      servings: 2,
      calories: 350,
      difficulty: "Fácil",
      category: "Sobremesa",
      ingredients: [
        "300g de iogurte grego",
        "1 xícara de granola caseira",
        "1 xícara de frutas vermelhas mistas (morangos, framboesas, mirtilos)",
        "2 colheres de sopa de mel",
        "Raspas de limão siciliano",
        "Folhas de hortelã fresca para decorar"
      ],
      steps: [
        "Em copos transparentes, faça uma camada de iogurte",
        "Adicione uma camada de granola",
        "Coloque uma camada de frutas vermelhas",
        "Repita as camadas até encher o copo",
        "Finalize com mel e raspas de limão",
        "Decore com folhas de hortelã",
        "Sirva gelado"
      ],
      nutrition: {
        protein: 16,
        carbs: 52,
        fat: 9
      }
    },
    {
      id: 4,
      name: "Panquecas de Iogurte Proteicas",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
      time: 20,
      servings: 2,
      calories: 380,
      difficulty: "Médio",
      category: "Café da Manhã",
      ingredients: [
        "150g de iogurte grego",
        "2 ovos grandes",
        "1 xícara de aveia em flocos finos",
        "1 colher de chá de fermento em pó",
        "1 banana madura amassada",
        "1 colher de chá de canela em pó",
        "1 pitada de sal",
        "Mel e frutas frescas para servir"
      ],
      steps: [
        "Misture todos os ingredientes secos em uma tigela",
        "Em outra tigela, bata os ovos com o iogurte",
        "Adicione a banana amassada à mistura líquida",
        "Combine os ingredientes secos com os líquidos",
        "Aqueça uma frigideira antiaderente em fogo médio",
        "Despeje porções da massa e cozinhe até dourar (2-3 minutos)",
        "Vire e cozinhe o outro lado até dourar",
        "Sirva quente com mel e frutas frescas"
      ],
      nutrition: {
        protein: 22,
        carbs: 48,
        fat: 11
      }
    },
    {
      id: 5,
      name: "Mousse de Iogurte com Frutas Vermelhas",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop",
      time: 25,
      servings: 4,
      calories: 220,
      difficulty: "Médio",
      category: "Sobremesa",
      ingredients: [
        "400g de iogurte grego natural",
        "200g de frutas vermelhas mistas",
        "3 colheres de sopa de mel",
        "1 envelope de gelatina sem sabor",
        "100ml de água",
        "Raspas de limão",
        "Hortelã para decorar"
      ],
      steps: [
        "Hidrate a gelatina na água fria por 5 minutos",
        "Aqueça a gelatina em banho-maria até dissolver completamente",
        "Bata as frutas vermelhas com o mel no liquidificador",
        "Misture o iogurte com o purê de frutas",
        "Adicione a gelatina dissolvida e misture bem",
        "Distribua em taças individuais",
        "Leve à geladeira por pelo menos 3 horas",
        "Decore com frutas frescas e hortelã antes de servir"
      ],
      nutrition: {
        protein: 12,
        carbs: 28,
        fat: 6
      }
    },
    {
      id: 6,
      name: "Wrap de Frango com Molho de Iogurte",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop",
      time: 30,
      servings: 2,
      calories: 420,
      difficulty: "Médio",
      category: "Almoço",
      ingredients: [
        "2 tortilhas integrais",
        "200g de peito de frango grelhado em tiras",
        "150g de iogurte grego",
        "1 dente de alho picado",
        "Suco de 1/2 limão",
        "Alface americana",
        "1 tomate fatiado",
        "1/2 pepino em rodelas",
        "Sal e pimenta a gosto"
      ],
      steps: [
        "Misture o iogurte com alho, limão, sal e pimenta para fazer o molho",
        "Aqueça as tortilhas levemente",
        "Espalhe o molho de iogurte sobre cada tortilha",
        "Adicione as folhas de alface",
        "Distribua o frango grelhado",
        "Coloque tomate e pepino",
        "Enrole firmemente as tortilhas",
        "Corte ao meio e sirva imediatamente"
      ],
      nutrition: {
        protein: 32,
        carbs: 38,
        fat: 12
      }
    }
  ];

  // Proteção contra product null/undefined
  const productName = product?.name || "este produto";

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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Receitas Sugeridas</h2>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header Info */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Receitas com {productName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Encontramos {recipes.length} receitas deliciosas e saudáveis para você
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{recipe.category}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                  {recipe.name}
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-xs">{recipe.time} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-xs">{recipe.servings} porção</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    <span className="text-xs">{recipe.calories} cal</span>
                  </div>
                </div>

                {/* Nutrition Info */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{recipe.nutrition.protein}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Proteína</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{recipe.nutrition.carbs}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Carbo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{recipe.nutrition.fat}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Gordura</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{recipe.difficulty}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
                  >
                    Ver Receita
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
