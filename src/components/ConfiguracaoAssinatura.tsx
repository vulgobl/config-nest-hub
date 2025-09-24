import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Server, Crown, MapPin, Sparkles, Clock, Calendar } from 'lucide-react';

// Mock types for demo purposes
interface DetalhesAssinaturaType {
  nomeServidor: string;
  ciclo: 'mensal' | 'anual';
}

interface ConfiguracaoAssinaturaProps {
  detalhes: DetalhesAssinaturaType;
  atualizarDetalhes: <K extends keyof DetalhesAssinaturaType>(campo: K, valor: DetalhesAssinaturaType[K]) => void;
  onNextStep: () => void;
  monthlyPriceDisplay: string; 
  annualPriceDisplay: string;  
}

const ConfiguracaoAssinatura: React.FC<ConfiguracaoAssinaturaProps> = ({
  detalhes,
  atualizarDetalhes,
  onNextStep,
  monthlyPriceDisplay,
  annualPriceDisplay,
}) => {
  const [focusedInput, setFocusedInput] = useState(false);

  const handleCicloChange = (value: 'mensal' | 'anual') => {
    atualizarDetalhes('ciclo', value);
  };

  const handleNomeServidorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    atualizarDetalhes('nomeServidor', event.target.value);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header with animated icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-card p-4 rounded-full shadow-glow">
              <Server className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Configure Sua Assinatura
          </h1>
          <p className="text-muted-foreground">
            Personalize seu servidor de alta performance
          </p>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Crown className="h-5 w-5 text-primary" />
              Detalhes do Servidor
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Defina as configurações básicas do seu servidor premium
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Server Name Input */}
            <div className="space-y-3">
              <Label htmlFor="nomeServidor-config" className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                Nome do Servidor
              </Label>
              <div className="relative">
                <Input
                  id="nomeServidor-config"
                  placeholder="Ex: MeuServidorMTA"
                  value={detalhes.nomeServidor || ''}
                  onChange={handleNomeServidorChange}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                  required
                  className={`bg-muted/50 border transition-all duration-300 ${
                    focusedInput || detalhes.nomeServidor 
                      ? 'border-primary shadow-elegant' 
                      : 'border-border'
                  } hover:border-primary/60`}
                />
                {(focusedInput || detalhes.nomeServidor) && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse shadow-glow"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Server className="h-3 w-3" />
                Este será seu identificador único no painel TCAdmin
              </p>
            </div>

            {/* Payment Cycle Selection */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-primary" />
                Ciclo de Pagamento
              </Label>
              
              <RadioGroup
                value={detalhes.ciclo}
                onValueChange={handleCicloChange}
                className="space-y-3"
              >
                {/* Monthly Option */}
                <div className="relative group">
                  <Label
                    htmlFor="ciclo-mensal-config"
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      detalhes.ciclo === 'mensal' 
                        ? 'border-primary bg-gradient-hover shadow-elegant' 
                        : 'border-border hover:border-primary/50'
                    } group-hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem 
                        value="mensal" 
                        id="ciclo-mensal-config"
                        className="text-primary border-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Plano Mensal</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Flexibilidade máxima
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{monthlyPriceDisplay}</div>
                      <div className="text-xs text-muted-foreground">por mês</div>
                    </div>
                  </Label>
                  {detalhes.ciclo === 'mensal' && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse shadow-glow"></div>
                  )}
                </div>

                {/* Annual Option */}
                <div className="relative group">
                  <Label
                    htmlFor="ciclo-anual-config"
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      detalhes.ciclo === 'anual' 
                        ? 'border-primary bg-gradient-hover shadow-elegant' 
                        : 'border-border hover:border-primary/50'
                    } group-hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem 
                        value="anual" 
                        id="ciclo-anual-config"
                        className="text-primary border-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-primary" />
                          <span className="font-medium">Plano Anual</span>
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Econômico
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Melhor custo-benefício
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{annualPriceDisplay}</div>
                      <div className="text-xs text-muted-foreground">por ano</div>
                    </div>
                  </Label>
                  {detalhes.ciclo === 'anual' && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse shadow-glow"></div>
                  )}
                </div>
              </RadioGroup>
            </div>

            {/* Server Location */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Localização do Servidor
              </Label>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">Brasil</div>
                      <div className="text-xs text-muted-foreground">Latência ultra-baixa</div>
                    </div>
                  </div>
                  <div className="text-success font-medium text-sm">Incluído</div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <Button 
              onClick={onNextStep} 
              disabled={!detalhes.nomeServidor || detalhes.nomeServidor.trim() === ''}
              className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center gap-2">
                Continuar Configuração
                <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            🔒 Configuração segura e criptografada
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoAssinatura;