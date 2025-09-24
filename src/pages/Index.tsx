import { useState } from 'react';
import ConfiguracaoAssinatura from '@/components/ConfiguracaoAssinatura';

interface DetalhesAssinaturaType {
  nomeServidor: string;
  ciclo: 'mensal' | 'anual';
}

const Index = () => {
  const [detalhes, setDetalhes] = useState<DetalhesAssinaturaType>({
    nomeServidor: '',
    ciclo: 'mensal'
  });

  const atualizarDetalhes = <K extends keyof DetalhesAssinaturaType>(
    campo: K, 
    valor: DetalhesAssinaturaType[K]
  ) => {
    setDetalhes(prev => ({ ...prev, [campo]: valor }));
  };

  const handleNextStep = () => {
    console.log('Próximo passo:', detalhes);
    // Aqui você pode navegar para a próxima etapa
  };

  return (
    <ConfiguracaoAssinatura
      detalhes={detalhes}
      atualizarDetalhes={atualizarDetalhes}
      onNextStep={handleNextStep}
      monthlyPriceDisplay="R$ 29,90"
      annualPriceDisplay="R$ 299,00"
    />
  );
};

export default Index;