import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, XCircle } from 'lucide-react';

const PricingPlan = ({ title, price, description, features, includedFeatures, excludedFeatures, buttonText, isPremium }) => (
  <Card className={`w-full max-w-sm mx-auto ${isPremium ? 'border-primary' : ''}`}>
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold mb-4">{price}</div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {includedFeatures && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Funcionalidades Incluidas:</h4>
          <ul className="space-y-1">
            {includedFeatures.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {excludedFeatures && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Funcionalidades Excluidas:</h4>
          <ul className="space-y-1">
            {excludedFeatures.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={isPremium ? "default" : "outline"}>{buttonText}</Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const basicFeatures = [
    "Gestión de perfiles de usuario",
    "Publicaciones básicas",
    "Itinerarios básicos",
    "Feed limitado"
  ];

  const premiumFeatures = [
    "Todas las funcionalidades del plan básico",
    "Estadísticas avanzadas",
    "Creación de actividades en itinerarios",
    "Recomendaciones personalizadas",
    "Mensajería directa",
    "Integración con servicios externos"
  ];

  const basicExcludedFeatures = [
    "Estadísticas avanzadas",
    "Información climática",
    "Recomendaciones personalizadas",
    "Mensajería directa",
    "Notificaciones por correo"
  ];

return (
    <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Planes de Precios</h2>
        <div className="flex justify-center items-center mb-8">
            <span className="mr-2">Mensual</span>
            <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
            />
            <span className="ml-2">Anual</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 justify-center">
            <PricingPlan
                title="Plan Básico"
                price="Gratis"
                description="Perfecto para empezar tu aventura"
                features={basicFeatures}
                excludedFeatures={basicExcludedFeatures}
                buttonText="Comenzar Gratis"
                isPremium={false}
            />
            <PricingPlan
                title="Plan Premium"
                price={isAnnual ? "€99.99/año" : "€9.99/mes"}
                description="Para viajeros expertos"
                features={premiumFeatures}
                includedFeatures={["Addon de climatología disponible"]}
                buttonText="Obtener Premium"
                isPremium={true}
            />
        </div>
    </div>
);
};

export default Pricing;

