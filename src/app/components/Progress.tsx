"use client";

import { ArrowLeft, TrendingUp, Calendar, Award, Target, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { useState } from "react";

interface ProgressProps {
  onBack: () => void;
}

export default function Progress({ onBack }: ProgressProps) {
  const [weekOffset, setWeekOffset] = useState(0); // 0 = semana atual, -1 = semana passada, etc.

  // Função para gerar dados da semana baseado no offset
  const getWeeklyData = (offset: number) => {
    // Simulando dados diferentes para cada semana
    const baseData = [
      { day: "Seg", scans: 3, healthy: 2 },
      { day: "Ter", scans: 2, healthy: 2 },
      { day: "Qua", scans: 4, healthy: 3 },
      { day: "Qui", scans: 1, healthy: 1 },
      { day: "Sex", scans: 3, healthy: 2 },
      { day: "Sáb", scans: 0, healthy: 0 },
      { day: "Dom", scans: 0, healthy: 0 }
    ];

    // Para semanas passadas, gerar dados diferentes
    if (offset < 0) {
      return baseData.map(d => ({
        ...d,
        scans: Math.max(0, d.scans + offset),
        healthy: Math.max(0, d.healthy + offset)
      }));
    }

    return baseData;
  };

  // Função para obter o período da semana
  const getWeekPeriod = (offset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (offset * 7)); // Segunda-feira
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Domingo

    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    };

    if (offset === 0) {
      return "Semana Atual";
    }

    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  const weeklyData = getWeeklyData(weekOffset);

  const monthlyGoals = [
    { name: "Análises Realizadas", current: 47, target: 60, unit: "análises" },
    { name: "Escolhas Saudáveis", current: 32, target: 40, unit: "produtos" },
    { name: "Receitas Preparadas", current: 18, target: 25, unit: "receitas" },
    { name: "Dias Consecutivos", current: 7, target: 14, unit: "dias" }
  ];

  const achievements = [
    { name: "Primeira Semana", description: "7 dias consecutivos", date: "15 Jan 2024", completed: true },
    { name: "Explorador Saudável", description: "30 análises realizadas", date: "20 Jan 2024", completed: true },
    { name: "Chef Dedicado", description: "15 receitas preparadas", date: "25 Jan 2024", completed: true },
    { name: "Mestre Nutricional", description: "50 escolhas saudáveis", date: "Em progresso", completed: false }
  ];

  const maxScans = Math.max(...weeklyData.map(d => d.scans), 1);

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
          <h2 className="text-lg font-semibold text-gray-900">Meu Progresso</h2>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Current Streak */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Sequência Atual</p>
              <p className="text-5xl font-bold">7</p>
              <p className="text-sm opacity-90 mt-1">dias consecutivos</p>
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Flame className="w-12 h-12" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm">
              Continue assim! Você está a apenas <span className="font-bold">7 dias</span> de alcançar sua meta de 2 semanas consecutivas.
            </p>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Atividade Semanal</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWeekOffset(weekOffset - 1)}
                className="rounded-full hover:bg-emerald-50 h-8 w-8"
                disabled={weekOffset <= -4}
              >
                <ChevronLeft className="w-4 h-4 text-emerald-600" />
              </Button>
              <Calendar className="w-5 h-5 text-emerald-600" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWeekOffset(weekOffset + 1)}
                className="rounded-full hover:bg-emerald-50 h-8 w-8"
                disabled={weekOffset >= 0}
              >
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </Button>
            </div>
          </div>

          {/* Week Period Indicator */}
          <div className="text-center mb-4">
            <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
              {getWeekPeriod(weekOffset)}
            </span>
          </div>
          
          <div className="flex items-end justify-between gap-3 h-48 mb-4">
            {weeklyData.map((data, index) => {
              const healthyHeight = maxScans > 0 ? (data.healthy / maxScans) * 100 : 0;
              const otherHeight = maxScans > 0 ? ((data.scans - data.healthy) / maxScans) * 100 : 0;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full">
                  {/* Bar container */}
                  <div className="w-full flex flex-col-reverse items-center justify-start flex-1 gap-1">
                    {data.scans > 0 ? (
                      <>
                        {/* Healthy bar (green) */}
                        {data.healthy > 0 && (
                          <div
                            className="w-full bg-emerald-500 rounded-t-lg transition-all duration-300 hover:bg-emerald-600"
                            style={{ height: `${healthyHeight}%` }}
                          />
                        )}
                        {/* Other bar (gray) */}
                        {(data.scans - data.healthy) > 0 && (
                          <div
                            className="w-full bg-gray-300 rounded-t-lg transition-all duration-300"
                            style={{ height: `${otherHeight}%` }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-2 bg-gray-100 rounded-lg" />
                    )}
                  </div>
                  {/* Day label */}
                  <span className="text-xs font-semibold text-gray-600 mt-2">{data.day}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded" />
              <span className="text-gray-600">Saudável</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded" />
              <span className="text-gray-600">Outros</span>
            </div>
          </div>
        </div>

        {/* Monthly Goals */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Metas do Mês</h3>
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          
          <div className="space-y-5">
            {monthlyGoals.map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{goal.name}</span>
                    <span className="text-sm text-gray-600">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <ProgressBar value={percentage} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    {percentage >= 100 ? "Meta atingida! 🎉" : `Faltam ${goal.target - goal.current} ${goal.unit}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements Timeline */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Conquistas</h3>
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  achievement.completed
                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    achievement.completed
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{achievement.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </div>
                {achievement.completed && (
                  <div className="text-emerald-600 font-bold text-sm">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 text-white text-center shadow-xl">
          <TrendingUp className="w-12 h-12 mx-auto mb-3" />
          <h4 className="text-xl font-bold mb-2">Excelente Progresso!</h4>
          <p className="text-sm opacity-90">
            Você está 68% mais saudável este mês comparado ao anterior. Continue assim!
          </p>
        </div>
      </main>
    </div>
  );
}
