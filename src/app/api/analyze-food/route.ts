import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não fornecida' },
        { status: 400 }
      );
    }

    // Verifica se a chave da API está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Configuração necessária',
          details: 'OPENAI_API_KEY não configurada. Configure sua chave da OpenAI para usar a análise de alimentos.'
        },
        { status: 401 }
      );
    }

    // Chama a API do OpenAI Vision para análise detalhada
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um especialista em nutrição e análise de alimentos. Sua tarefa é analisar imagens de alimentos e fornecer informações nutricionais precisas e detalhadas.

IMPORTANTE: Identifique EXATAMENTE o alimento na imagem. Seja PRECISO na identificação:
- Se for uma maçã, identifique como "Maçã"
- Se for um iogurte, identifique como "Iogurte"
- Se for uma banana, identifique como "Banana"
- Nunca confunda frutas com laticínios ou vice-versa
- Analise cuidadosamente a forma, cor, textura e características visuais
- Observe detalhes como: casca, formato, tamanho, embalagem (se houver)

Responda SEMPRE em formato JSON válido com a seguinte estrutura:
{
  "name": "Nome exato do alimento identificado",
  "brand": "Marca (se visível) ou 'Produto Natural' para frutas/vegetais",
  "healthScore": número de 0-100 baseado em valor nutricional,
  "category": "healthy" | "moderate" | "unhealthy",
  "nutrition": {
    "calories": número estimado de calorias por 100g,
    "protein": gramas de proteína por 100g,
    "carbs": gramas de carboidratos por 100g,
    "fat": gramas de gordura por 100g,
    "sugar": gramas de açúcar por 100g,
    "fiber": gramas de fibra por 100g,
    "sodium": miligramas de sódio por 100g
  },
  "ingredients": ["lista de ingredientes principais"],
  "analysis": "Análise detalhada dos benefícios e alertas nutricionais"
}

Para frutas e vegetais naturais:
- Use valores nutricionais reais e precisos baseados em tabelas nutricionais
- Destaque vitaminas e minerais específicos (ex: Vitamina C, Potássio, Fibras)
- Mencione benefícios para a saúde comprovados
- healthScore geralmente entre 85-100
- Identifique corretamente: maçã tem casca lisa e formato arredondado, banana tem casca amarela e formato alongado, etc.

Para produtos processados:
- Analise rótulos se visíveis
- Alerte sobre aditivos e conservantes
- Considere teor de açúcar, sódio e gorduras
- healthScore varia conforme processamento

ATENÇÃO ESPECIAL: Diferencie claramente entre:
- Frutas (maçã, banana, laranja, etc.) - formato, cor e textura característicos
- Laticínios (iogurte, leite, queijo) - geralmente em embalagens ou com textura cremosa
- Grãos e cereais (arroz, aveia, granola)
- Proteínas (carnes, ovos, leguminosas)
- Vegetais (alface, tomate, cenoura)`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analise este alimento e forneça informações nutricionais detalhadas. Identifique EXATAMENTE o que é mostrado na imagem, observando cuidadosamente todas as características visuais.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.2, // Temperatura ainda mais baixa para máxima precisão
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('Erro da OpenAI:', errorData);
      
      // Verifica se é erro de autenticação
      if (openaiResponse.status === 401) {
        return NextResponse.json(
          { 
            error: 'Erro de autenticação',
            details: 'Chave da OpenAI inválida. Verifique sua OPENAI_API_KEY.'
          },
          { status: 401 }
        );
      }
      
      throw new Error('Erro ao analisar imagem com OpenAI');
    }

    const openaiData = await openaiResponse.json();
    const analysisText = openaiData.choices[0].message.content;

    // Parse do JSON retornado pela OpenAI
    let analysisResult;
    try {
      // Remove possíveis marcadores de código markdown
      const cleanedText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', analysisText);
      return NextResponse.json(
        { 
          error: 'Erro ao processar resposta',
          details: 'Não foi possível processar a análise da IA. Tente novamente.'
        },
        { status: 500 }
      );
    }

    // Adiciona a imagem ao resultado
    analysisResult.image = image;

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('Erro na análise de alimento:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao analisar alimento',
        details: error instanceof Error ? error.message : 'Erro desconhecido ao processar a imagem'
      },
      { status: 500 }
    );
  }
}
