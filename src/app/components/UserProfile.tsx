"use client";

import { ArrowLeft, User, Mail, Calendar, Target, TrendingUp, Award, Heart, Camera, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface UserProfileProps {
  onBack: () => void;
  onOpenSettings: () => void;
}

export default function UserProfile({ onBack, onOpenSettings }: UserProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    
    if (savedName && savedEmail) {
      setUserName(savedName);
      setUserEmail(savedEmail);
      setTempName(savedName);
      setTempEmail(savedEmail);
    } else {
      // Se não houver dados salvos, mostrar modal de boas-vindas
      setShowWelcomeModal(true);
    }
  }, []);

  const handleSaveProfile = () => {
    if (tempName.trim() && tempEmail.trim()) {
      // Salvar no estado
      setUserName(tempName);
      setUserEmail(tempEmail);
      
      // Salvar no localStorage para persistência
      localStorage.setItem("userName", tempName);
      localStorage.setItem("userEmail", tempEmail);
      
      setShowEditModal(false);
      setShowWelcomeModal(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setTempEmail(userEmail);
    setShowEditModal(false);
  };

  const userStats = {
    name: userName || "Novo Utilizador",
    email: userEmail || "email@exemplo.com",
    memberSince: "Janeiro 2024",
    scansTotal: 0,
    healthyChoices: 0,
    recipesCooked: 0,
    favoriteRecipes: 0,
    currentStreak: 0
  };

  const recentActivity = [
    { product: "Iogurte Grego", date: "Hoje", score: 85, category: "healthy" },
    { product: "Cereais Integrais", date: "Ontem", score: 72, category: "moderate" },
    { product: "Suco Natural", date: "2 dias atrás", score: 78, category: "healthy" },
    { product: "Granola", date: "3 dias atrás", score: 80, category: "healthy" }
  ];

  const achievements = [
    { name: "Primeira Análise", icon: Camera, unlocked: false },
    { name: "Semana Saudável", icon: TrendingUp, unlocked: false },
    { name: "Chef Iniciante", icon: Award, unlocked: false },
    { name: "Mestre da Nutrição", icon: Target, unlocked: false }
  ];

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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Meu Perfil</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="rounded-full hover:bg-emerald-50 dark:hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-6 shadow-xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{userStats.name}</h1>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Mail className="w-4 h-4" />
                <span>{userStats.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                <Calendar className="w-4 h-4" />
                <span>Membro desde {userStats.memberSince}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => {
                setTempName(userName);
                setTempEmail(userEmail);
                setShowEditModal(true);
              }}
            >
              Editar
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold mb-1">{userStats.scansTotal}</p>
              <p className="text-sm opacity-90">Análises Totais</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold mb-1">{userStats.currentStreak}</p>
              <p className="text-sm opacity-90">Dias Consecutivos</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{userStats.healthyChoices}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Escolhas Saudáveis</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{userStats.recipesCooked}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Receitas Feitas</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{userStats.favoriteRecipes}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Favoritos</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">0%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Meta Semanal</p>
          </div>
        </div>

        {/* Health Goal Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Meta de Saúde Semanal</h3>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">0/7 dias</span>
          </div>
          <Progress value={0} className="h-3 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comece a analisar alimentos para acompanhar seu progresso semanal!
          </p>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Conquistas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-4 rounded-2xl transition-all duration-300 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-700"
                      : "bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{achievement.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity - Empty State */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Atividade Recente</h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Nenhuma análise ainda</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Comece a analisar alimentos para ver seu histórico aqui!
            </p>
          </div>
        </div>

        {/* Settings Button */}
        <div className="mt-6">
          <Button
            onClick={onOpenSettings}
            variant="outline"
            size="lg"
            className="w-full h-14 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-2xl transition-all duration-300"
          >
            <Settings className="w-5 h-5 mr-2" />
            Configurações da Conta
          </Button>
        </div>
      </main>

      {/* Welcome Modal (First Time) */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bem-vindo ao FoodLens!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Configure seu perfil para começar a sua jornada de alimentação saudável
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="welcome-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  id="welcome-name"
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Digite seu nome"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="welcome-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="welcome-email"
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Digite seu email"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                onClick={handleSaveProfile}
                disabled={!tempName.trim() || !tempEmail.trim()}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Começar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Editar Perfil</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelEdit}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Digite seu nome"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="edit-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Digite seu email"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="flex-1 h-12 rounded-2xl border-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={!tempName.trim() || !tempEmail.trim()}
                className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
