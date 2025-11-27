"use client";

import { ArrowLeft, User, Mail, Lock, Bell, Globe, Moon, HelpCircle, LogOut, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userName, setUserName] = useState("Maria Silva");
  const [userEmail, setUserEmail] = useState("maria.silva@email.com");
  const [tempName, setTempName] = useState(userName);
  const [tempEmail, setTempEmail] = useState(userEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    setUserName(tempName);
    setUserEmail(tempEmail);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setTempEmail(userEmail);
    setShowEditModal(false);
  };

  const handleSavePassword = () => {
    // Validação básica
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (newPassword.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    // Aqui você implementaria a lógica real de mudança de senha
    alert("Senha alterada com sucesso!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);
  };

  const settingsSections = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Editar Perfil", action: "edit-profile", hasChevron: true },
        { icon: Mail, label: "Email", value: userEmail, hasChevron: true },
        { icon: Lock, label: "Alterar Senha", action: "change-password", hasChevron: true }
      ]
    },
    {
      title: "Preferências",
      items: [
        { icon: Bell, label: "Notificações", toggle: true, enabled: true },
        { icon: Moon, label: "Modo Escuro", toggle: true, enabled: false },
        { icon: Globe, label: "Idioma", value: "Português", hasChevron: true }
      ]
    },
    {
      title: "Suporte",
      items: [
        { icon: HelpCircle, label: "Central de Ajuda", action: "help", hasChevron: true },
        { icon: Mail, label: "Contactar Suporte", action: "contact", hasChevron: true }
      ]
    }
  ];

  const handleItemClick = (action?: string) => {
    if (action === "edit-profile") {
      setShowEditModal(true);
    } else if (action === "change-password") {
      setShowPasswordModal(true);
    }
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
          <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Profile Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white mb-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{userName}</h3>
              <p className="text-sm opacity-90">{userEmail}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowEditModal(true)}
            >
              Editar
            </Button>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <div
                    key={itemIndex}
                    onClick={() => item.action && handleItemClick(item.action)}
                    className={`flex items-center justify-between p-5 hover:bg-gray-50 transition-all duration-300 ${
                      item.action ? 'cursor-pointer' : ''
                    } ${
                      itemIndex !== section.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        {item.value && (
                          <p className="text-sm text-gray-500 mt-0.5">{item.value}</p>
                        )}
                      </div>
                    </div>
                    
                    {item.toggle && (
                      <Switch defaultChecked={item.enabled} />
                    )}
                    
                    {item.hasChevron && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
            Sobre a App
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Versão</span>
              <span className="font-semibold text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Última Atualização</span>
              <span className="font-semibold text-gray-900">Janeiro 2024</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="lg"
          className="w-full h-14 border-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 rounded-2xl transition-all duration-300"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Terminar Sessão
        </Button>

        {/* Legal Links */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
          <button className="hover:text-emerald-600 transition-colors">
            Termos de Uso
          </button>
          <span>•</span>
          <button className="hover:text-emerald-600 transition-colors">
            Privacidade
          </button>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Editar Perfil</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelEdit}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300"
                  placeholder="Digite seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300"
                  placeholder="Digite seu email"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="flex-1 h-12 rounded-2xl border-2"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Alterar Senha</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPasswordModal(false)}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300"
                  placeholder="Digite sua senha atual"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300"
                  placeholder="Digite sua nova senha"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300"
                  placeholder="Confirme sua nova senha"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 h-12 rounded-2xl border-2"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSavePassword}
                className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl"
              >
                Alterar Senha
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
