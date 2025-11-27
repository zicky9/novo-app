"use client";

import { useState, useRef } from "react";
import { Camera, X, FlipHorizontal, Zap, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraScreenProps {
  onPhotoTaken: (imageData: string) => void;
  onBack: () => void;
}

export default function CameraScreen({ onPhotoTaken, onBack }: CameraScreenProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    // Simula captura de foto
    const mockImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop";
    setCapturedImage(mockImage);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onPhotoTaken(capturedImage);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-white font-semibold text-lg">Capturar Produto</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center text-white/60">
              <Camera className="w-20 h-20 mx-auto mb-4" />
              <p className="text-lg">Posicione o produto no centro</p>
              <p className="text-sm mt-2">Certifique-se de que o rótulo está visível</p>
            </div>
          </div>
        )}

        {/* Scanning Frame */}
        {!capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 border-4 border-emerald-400 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
        {capturedImage ? (
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleRetake}
              size="lg"
              variant="outline"
              className="flex-1 max-w-xs h-14 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 rounded-2xl backdrop-blur-sm"
            >
              <X className="w-5 h-5 mr-2" />
              Tirar Novamente
            </Button>
            <Button
              onClick={handleConfirm}
              size="lg"
              className="flex-1 max-w-xs h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Analisar Produto
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              >
                <FlipHorizontal className="w-6 h-6" />
              </Button>

              <Button
                onClick={handleCapture}
                size="icon"
                className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              >
                <Upload className="w-6 h-6" />
              </Button>
            </div>

            <p className="text-center text-white/80 text-sm">
              Toque no botão central para capturar
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
