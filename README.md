# Marketplace App

Aplicativo mobile de marketplace em React Native, construído sobre arquitetura MVVM, Zustand e TanStack React Query.

**Português** · [English](README.en.md)

![Expo](https://img.shields.io/badge/Expo-57-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0-2B2B2B)
![React Query](https://img.shields.io/badge/React_Query-5.101-FF4154?logo=reactquery&logoColor=white)

## Demonstração

[![Demonstração do Marketplace App](https://img.youtube.com/vi/aeXJ4LkxXUM/maxresdefault.jpg)](https://youtu.be/aeXJ4LkxXUM)

O vídeo percorre o fluxo completo: login, catálogo com scroll infinito, busca e filtros, skeleton loading, detalhes e avaliação de produto, carrinho, o flip 3D do cartão de crédito no checkout e o histórico de pedidos.

## Sobre o Projeto

Marketplace mobile que cobre o ciclo completo de compra — catálogo, produto, carrinho, pagamento e pedidos — consumindo uma API REST com autenticação JWT e refresh token.

- **Catálogo** paginado com scroll infinito, busca com debounce e filtros por categoria e faixa de preço
- **Produto** com avaliação média, comentários paginados e criação/edição da própria avaliação
- **Carrinho** persistido no dispositivo, com checkout por cartão de crédito
- **Conta** com cadastro, login, histórico de pedidos e edição de perfil com foto

O projeto foi um exercício deliberado de arquitetura: separar apresentação de lógica com MVVM, dividir estado de cliente e estado de servidor entre duas bibliotecas especializadas e manter as animações fora da thread de JavaScript.

## Stack

| Tecnologia | Versão | Papel no projeto |
|------------|--------|------------------|
| React Native | 0.86.0 | Base do aplicativo |
| Expo | ~57.0.7 | Plataforma e build |
| Expo Router | ~57.0.7 | Roteamento por arquivos, com rotas públicas e privadas |
| TypeScript | ~6.0.3 | Tipagem estática, incluindo o contrato entre View e ViewModel |
| Zustand | ^5.0.14 | Estado de cliente (sessão, carrinho, filtros, UI) |
| TanStack React Query | ^5.101.4 | Estado de servidor: cache, revalidação e paginação |
| Reanimated | ^4.5.2 | Animações executadas na UI thread |
| NativeWind | ^4.2.6 | Estilos utilitários com Tailwind |
| React Hook Form + Yup | ^7.83.0 / ^1.7.1 | Formulários e validação por schema |

## Decisões Técnicas

### Por que MVVM

O ecossistema React Native não empurra nenhuma arquitetura em particular, e o resultado comum é a tela virar um arquivo de 400 linhas misturando JSX, requisição, estado e formatação. Aqui cada tela é uma tríade: um container, uma View sem lógica e um ViewModel que concentra tudo o mais.

O que sustenta o padrão não é disciplina, é o compilador: a View é tipada como `FC<ReturnType<typeof useXViewModel>>`, então qualquer campo adicionado ou removido do ViewModel quebra a build da View. A convenção deixa de depender de revisão de código.

O efeito prático é que a View não importa Zustand, React Query nem Axios — ela recebe dados prontos e funções. Trocar a origem dos dados não toca em uma linha de JSX, e a lógica fica isolada em hooks puros, testáveis sem renderizar árvore.

### Por que Zustand *e* React Query

São dois problemas diferentes que costumam ser tratados como um só. **Estado de cliente** é o que o app é dono: sessão, carrinho, filtros selecionados, qual modal está aberto. **Estado de servidor** é uma cópia local de um dado que pertence à API: produtos, pedidos, comentários.

Estado de servidor traz consigo cache, invalidação, revalidação, paginação e estados de carregando/erro/refetch. Guardar produto numa store manual significaria reimplementar tudo isso à mão — e é exatamente o que o React Query já resolve. Já sessão e carrinho não têm nada disso: precisam de leitura síncrona, escrita simples e persistência local, que é onde o Zustand é imbatível em cerimônia.

A fronteira entre os dois fica explícita nas mutations de autenticação, onde a resposta do servidor é entregue à store persistida.

### Regra de negócio fora da store

O `cart-store` guarda estado e delega os cálculos para o [cart.service.ts](src/shared/services/cart.service.ts), que é um conjunto de funções puras recebendo lista e devolvendo lista. A store fica magra e a regra de carrinho é verificável sem instanciar nada.

### Animação fora da thread de JavaScript

Animação controlada por estado do React compete com o trabalho do JS e engasga sob carga. Com Reanimated, o valor animado vive na UI thread e continua fluido mesmo com a lista renderizando. Coerente com o MVVM, o `animatedStyle` nasce no ViewModel — a View apenas o aplica.

### Um trade-off assumido

Modal e BottomSheet são globais controlados por store: qualquer ViewModel abre qualquer conteúdo sem prop drilling e sem estado local. O preço é perder a tipagem das props desse conteúdo, já que o que trafega é `ReactNode`. Para o tamanho deste app a troca compensou, mas num projeto maior eu tiparia os conteúdos possíveis por união discriminada em vez de aceitar qualquer nó.

## Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) 18 ou superior
- [Yarn](https://yarnpkg.com/) ou npm
- [Android Studio](https://developer.android.com/studio) ou [Xcode](https://developer.apple.com/xcode/) (iOS apenas em macOS)

### Backend

O app consome a API REST oficial do desafio, mantida pela Rocketseat:

**[rocketseat-education/marketplace-backend](https://github.com/rocketseat-education/marketplace-backend)**

Suba o backend antes do aplicativo, seguindo as instruções do próprio repositório. Por padrão a API roda na porta `3001`.

### Instalação

```bash
git clone https://github.com/EnzoFelyx/marketplace-app.git
cd marketplace-app
yarn
cp .env.example .env.local
```

O `.env.local` define o endereço da API:

```bash
# API na mesma máquina
EXPO_PUBLIC_API_URL=http://localhost:3001

# Dispositivo físico ou API em outro PC da rede
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3001
```

A variável é obrigatória — sem ela, [marketplace.ts](src/shared/api/marketplace.ts) falha na inicialização com uma mensagem explicando o que configurar.

### Execução

```bash
yarn start     # servidor de desenvolvimento
yarn android   # executa no Android
yarn ios       # executa no iOS (apenas macOS)
yarn web       # executa na web
```

## Arquitetura em Detalhe

### A tríade MVVM

Toda tela em `src/viewModels/` segue a mesma divisão. A pasta `src/app/` fica reservada ao roteamento.

| Arquivo | Papel |
|---------|-------|
| `index.tsx` | Container — instancia o ViewModel e repassa o retorno para a View |
| `*.view.tsx` | View pura — só JSX e classes NativeWind |
| `use*.viewModel.ts` | ViewModel — estado, queries, stores, handlers e formatação |

```tsx
// src/viewModels/Home/components/ProductCard/index.tsx
export const ProductCard: FC<Props> = (props) => {
    const viewModel = useProductCardViewModel(props)

    return <ProductCardView {...viewModel} />
}
```

```ts
// src/viewModels/Home/components/ProductCard/useProductCard.viewModel.ts
export const useProductCardViewModel = ({ product }: Props) => {

    const displayName = formatProductName(product.name)
    const formatRating = product.averageRating.toFixed(1).replace(".", ",")

    return { product, displayName, formatRating }
}
```

```tsx
// src/viewModels/Home/components/ProductCard/ProductCard.view.tsx
export const ProductCardView: FC<ReturnType<typeof useProductCardViewModel>> = ({
    product, displayName, formatRating
}) => { /* só apresentação */ }
```

As rotas do Expo Router são cascas que montam a dupla — inclusive quando há parâmetro:

```tsx
// src/app/(private)/product/[id].tsx
export default function Product() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const viewModel = useProductViewModel(Number(id))

    return <ProductView {...viewModel} />
}
```

O padrão vale também para componentes compartilhados com lógica própria, como `PriceText` (formatação de moeda) e `Input` (visibilidade de senha e foco).

### Scroll infinito com filtros na queryKey

```ts
// src/shared/queries/product/use-product-infinite.query.ts
const { data, /* ... */ } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => getProducts({
        pagination: { page: pageParam, perPage: 10 },
        filters: {
            categoryIds: filters?.selectedCategories ?? [],
            maxValue: filters?.valueMax ?? undefined,
            minValue: filters?.valueMin ?? undefined,
            searchText: filters?.searchText ?? undefined
        }
    }),
    getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    queryKey: ["products", filters],
    staleTime: 1000 * 60 * 1,
})

const products = data?.pages.flatMap((page) => page.data)
```

Como `filters` faz parte da `queryKey`, mudar a busca ou um filtro cria uma nova entrada de cache automaticamente — e voltar ao filtro anterior reaproveita o que já foi baixado, sem nova requisição. O `flatMap` sobre `data.pages` entrega uma lista plana para a `FlatList`.

### Os três pilares juntos

O ViewModel da Home combina estado de cliente, debounce e query infinita, e devolve apenas props prontas:

```ts
// src/viewModels/Home/useHome.viewModel.ts
export const useHomeViewModel = () => {
    const { appliedFilterState } = useFilterStore()          // Zustand
    const [searchInputText, setSearchInputText] = useState("")
    const currentSearchText = useDebounce(searchInputText)   // hook compartilhado

    const { products, fetchNextPage, hasNextPage, isFetchingNextPage,
            isLoading, isRefetching, refetch } = useProductInfiniteQuery({
        filters: { ...appliedFilterState, searchText: currentSearchText }
    })                                                       // React Query

    const isInitialLoading = isLoading && !isRefetching

    return { products, handleEndReached, handleRefresh, isInitialLoading, /* ... */ }
}
```

### Cartão de crédito com flip 3D

O card vira quando o usuário foca o campo CVV e volta ao sair. O ViewModel deriva o gatilho de um único booleano (`isFlipped = focusedField === "cvv"`) e devolve os dois estilos animados:

```ts
// src/viewModels/Cart/components/CardBottomSheet/components/CreditCard/useCreditCard.viewModel.ts
const flipValue = useSharedValue(0)

const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipValue.value, [0, 1], [0, 180])
    return { transform: [{ rotateY: `${rotateValue}deg` }] }
})

const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipValue.value, [0, 1], [180, 360])
    return { transform: [{ rotateY: `${rotateValue}deg` }] }
})

useEffect(() => {
    flipValue.value = withTiming(isFlipped ? 1 : 0, { duration: 600 })
}, [isFlipped])
```

As duas faces são `Animated.View` sobrepostas em `position: "absolute"` com `backfaceVisibility: "hidden"`, girando em faixas defasadas de 180° a partir do mesmo shared value — daí a ilusão de um único cartão girando no eixo Y. Frente e verso são preenchidos em tempo real pelo `watch()` do react-hook-form, e o campo em foco ganha destaque enquanto o usuário digita.

### Skeleton loading

```ts
// src/shared/hooks/useSkeletonAnimation.ts
export const useSkeletonAnimation = (duration: number = 800) => {

    const pulseValue = useSharedValue(0.4)

    const animatedStyle = useAnimatedStyle(() => ({ opacity: pulseValue.value }))

    useEffect(() => {
        pulseValue.value = withRepeat(
            withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        )
    }, [duration])

    return animatedStyle
}
```

O hook alimenta um componente `Skeleton` genérico que anima qualquer conteúdo passado como filho. O `ProductCardSkeleton` só descreve a silhueta do card, e a Home troca a lista pelo grid de placeholders enquanto carrega:

```tsx
// src/viewModels/Home/Home.view.tsx
ListEmptyComponent={isInitialLoading ? <ProductCardSkeletonList /> : null}
```

Como `isInitialLoading` é `isLoading && !isRefetching`, o skeleton aparece só na primeira carga — o pull-to-refresh usa o `RefreshControl` nativo e mantém a lista visível.

<details>
<summary><b>Sessão persistida e proteção de rotas</b></summary>

```ts
// src/shared/store/user-store.ts
export const useUserStore = create<UserStore>()(persist((set) => ({
    user: null,
    token: null,
    refreshToken: null,

    logout: () => set({ user: null, token: null, refreshToken: null }),
    setSession: (sessionData) => set({ ...sessionData }),
    updateTokens: (updateTokensData) => set({ ...updateTokensData }),
    updatedUser: (updatedUserData) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...updatedUserData } : null
        }))
}), {
    name: "marketplace-auth",
    storage: createJSONStorage(() => AsyncStorage),
}))
```

Com a sessão persistida, proteger uma rota é ler a store no layout do grupo:

```tsx
// src/app/(private)/_layout.tsx
const { user, token } = useUserStore()

if (!user || !token) {
    return <Redirect href={"/(public)/login"} />
}
```

</details>

<details>
<summary><b>Acesso à store fora do React</b></summary>

O interceptor do Axios não é componente, mas precisa derrubar a sessão quando o refresh token falha. O Zustand expõe `getState()` para isso:

```ts
// src/shared/api/marketplace.ts
private async handleUnauthorized() {
    const { logout } = useUserStore.getState()

    delete this.instance.defaults.headers.common["Authorization"]
    logout()
}
```

O mesmo interceptor renova o token expirado e repete a requisição original de forma transparente para as telas.

</details>

<details>
<summary><b>Store magra: cálculo no service</b></summary>

```ts
// src/shared/store/cart-store.ts
addProduct: (newProduct) => set((state) =>
    cartService.addProductToCart(state.products, newProduct)
),
updateQuantity: ({ productId, quantity }) => set((state) =>
    cartService.updateProductQuantity({ productId, productList: state.products, quantity })
),
```

</details>

<details>
<summary><b>Filtros: rascunho separado do aplicado</b></summary>

O `use-filter-store` mantém dois estados: o que o usuário está mexendo no bottom sheet (`FilterState`) e o que de fato foi aplicado à listagem (`appliedFilterState`). Só o segundo entra na `queryKey`, então arrastar um slider não dispara requisição — a busca só acontece quando o usuário confirma.

</details>

<details>
<summary><b>Modal e BottomSheet globais</b></summary>

Ambos são renderizados uma única vez na árvore (`src/app/_layout.tsx` e `src/app/(private)/_layout.tsx`) e recebem conteúdo por store:

```ts
// src/viewModels/Cart/useCart.viewModel.ts
const { open: openCard } = useBottomSheetStore()

const openCartBottomSheet = () => {
    openCard({
        content: createElement(CardBottomSheet),
        config: { snapPoints: ["83%", "90%"] }
    })
}
```

</details>

<details>
<summary><b>Invalidação de cache e ponte com o Zustand</b></summary>

Finalizar um pedido invalida a listagem de pedidos, que se refaz sozinha ao entrar na aba:

```ts
// src/shared/queries/orders/use-submit-orders.mutation.ts
const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-orders"] })
    },
    onError: (error) => Toast.error(error.message ?? "Falha ao realizar pedido", "top")
})
```

E as mutations de autenticação são a fronteira entre React Query e Zustand — a resposta do servidor entra na store persistida:

```ts
// src/shared/queries/auth/use-login.mutation.ts
const mutation = useMutation({
    mutationFn: (userData: LoginHTTPParams) => authService.login(userData),
    onSuccess: (response) => setSession(response),
    onError: (error) => Toast.error(error.message ?? "Senha inválida", "top")
})
```

</details>

<details>
<summary><b>Hooks compartilhados e estilo</b></summary>

| Hook | Descrição |
|------|-----------|
| `useDebounce` | Atrasa a propagação de um valor (usado na busca) |
| `useImage` | Orquestra a escolha entre câmera e galeria |
| `useCamera` / `useGallery` | Captura e seleção de imagem com `expo-image-picker` |
| `useModal` | Atalhos para modais de seleção e sucesso |
| `useSkeletonAnimation` | Animação de pulso dos skeletons |

Os estilos usam NativeWind. A paleta fica em [colors.ts](src/styles/colors.ts) e é importada pelo `tailwind.config.js`, mantendo uma fonte única de verdade tanto para as classes utilitárias quanto para as props nativas que exigem cor em JavaScript (ícones, `RefreshControl`, tab bar). As variantes de `Button` e `Input` usam `tailwind-variants`, e o alias `@/*` aponta para `src/`.

</details>

## Estrutura do Projeto

```
src/
├── app/            # Rotas do Expo Router: grupos (public) e (private), tabs e layouts
├── viewModels/     # Telas em MVVM: Home, Product, Cart, Orders, Profile, Login, Register
├── components/     # Componentes reutilizáveis: Button, Input, Modal, BottomSheet, Skeleton…
├── shared/
│   ├── api/        # Cliente Axios, interceptors e refresh token
│   ├── queries/    # Hooks do React Query, agrupados por domínio
│   ├── services/   # Chamadas à API e regras puras
│   ├── store/      # Stores Zustand
│   ├── hooks/      # Hooks compartilhados
│   ├── interface/  # Tipagens de domínio e de HTTP
│   └── utils/      # Funções utilitárias
└── styles/         # Paleta e CSS global
```

## Funcionalidades

- **Autenticação** com validação por schema e sessão persistida em AsyncStorage
- **Refresh token automático** no interceptor, que repete a requisição original e encerra a sessão se o refresh falhar
- **Rotas protegidas** com grupos `(public)` e `(private)` e redirecionamento pela store
- **Catálogo** com scroll infinito de 10 itens por página e pull-to-refresh
- **Busca com debounce** e **filtros** por categoria e faixa de preço
- **Skeleton loading** com pulso animado durante a primeira carga
- **Detalhes do produto** com avaliação média e comentários paginados
- **Avaliações**: criar e editar a própria, com nota em estrelas
- **Carrinho persistido**, sobrevivendo ao fechamento do app
- **Cartão de crédito** com pré-visualização em tempo real e flip 3D ao focar o CVV
- **Pedidos** com invalidação automática do histórico após o checkout
- **Perfil** com troca de senha, máscara de telefone e avatar pela câmera ou galeria

## Próximos Passos

Lacunas conhecidas, na ordem em que pretendo resolvê-las:

- **Testes** — o desenho já isola a lógica em hooks e funções puras; falta a suíte. Começaria por `cart.service`, pelos ViewModels de formatação e pelo fluxo de filtros.
- **CI** — GitHub Actions rodando type-check e testes a cada push.
- **Build distribuível** — EAS Build gerando um APK para download direto, dispensando clonar o repositório e subir o backend só para ver o app rodando.

## Autor

**Enzo Felix** — Mobile Developer

[GitHub](https://github.com/EnzoFelyx) · [LinkedIn](https://www.linkedin.com/in/enzofelyx/) · [enzofelyx@gmail.com](mailto:enzofelyx@gmail.com)

---

Desenvolvido a partir de um desafio da [Rocketseat](https://www.rocketseat.com.br/).
