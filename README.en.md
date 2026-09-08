# Marketplace App

A React Native marketplace app built on MVVM architecture, Zustand, and TanStack React Query.

[Português](README.md) · **English**

![Expo](https://img.shields.io/badge/Expo-57-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0-2B2B2B)
![React Query](https://img.shields.io/badge/React_Query-5.101-FF4154?logo=reactquery&logoColor=white)

## Demo

[![Marketplace App demo](https://img.youtube.com/vi/aeXJ4LkxXUM/maxresdefault.jpg)](https://youtu.be/aeXJ4LkxXUM)

The video walks through the full flow: login, catalog with infinite scroll, search and filters, skeleton loading, product details and reviews, cart, the 3D credit card flip at checkout, and order history.

## About the Project

A mobile marketplace covering the complete purchase cycle — catalog, product, cart, payment, and orders — consuming a REST API with JWT authentication and refresh tokens.

- **Catalog** paginated with infinite scroll, debounced search, and filters by category and price range
- **Product** with average rating, paginated comments, and creating/editing your own review
- **Cart** persisted on the device, with credit card checkout
- **Account** with sign-up, login, order history, and profile editing with a photo

The project was a deliberate architecture exercise: separating presentation from logic with MVVM, splitting client state and server state between two specialized libraries, and keeping animations off the JavaScript thread.

## Stack

| Technology | Version | Role in the project |
|------------|---------|---------------------|
| React Native | 0.86.0 | Application foundation |
| Expo | ~57.0.7 | Platform and build |
| Expo Router | ~57.0.7 | File-based routing, with public and private routes |
| TypeScript | ~6.0.3 | Static typing, including the View/ViewModel contract |
| Zustand | ^5.0.14 | Client state (session, cart, filters, UI) |
| TanStack React Query | ^5.101.4 | Server state: caching, revalidation, and pagination |
| Reanimated | ^4.5.2 | Animations running on the UI thread |
| NativeWind | ^4.2.6 | Utility styling with Tailwind |
| React Hook Form + Yup | ^7.83.0 / ^1.7.1 | Forms and schema validation |

## Technical Decisions

### Why MVVM

The React Native ecosystem doesn't push any particular architecture, and the usual result is a screen that becomes a 400-line file mixing JSX, requests, state, and formatting. Here every screen is a triad: a container, a View with no logic, and a ViewModel that holds everything else.

What enforces the pattern isn't discipline, it's the compiler: the View is typed as `FC<ReturnType<typeof useXViewModel>>`, so any field added to or removed from the ViewModel breaks the View's build. The convention stops depending on code review.

In practice the View imports neither Zustand, React Query, nor Axios — it receives ready-made data and functions. Changing the data source never touches a line of JSX, and the logic stays isolated in pure hooks, testable without rendering a tree.

### Why Zustand *and* React Query

These are two different problems usually treated as one. **Client state** is what the app owns: session, cart, selected filters, which modal is open. **Server state** is a local copy of data that belongs to the API: products, orders, comments.

Server state brings caching, invalidation, revalidation, pagination, and loading/error/refetch states along with it. Keeping products in a manual store would mean reimplementing all of that by hand — which is exactly what React Query already solves. Session and cart have none of those needs: they require synchronous reads, simple writes, and local persistence, which is where Zustand wins on ceremony.

The boundary between the two is explicit in the auth mutations, where the server response is handed to the persisted store.

### Business rules outside the store

`cart-store` holds state and delegates calculations to [cart.service.ts](src/shared/services/cart.service.ts), a set of pure functions taking a list and returning a list. The store stays thin and the cart rules are verifiable without instantiating anything.

### Animations off the JavaScript thread

Animations driven by React state compete with JS work and stutter under load. With Reanimated the animated value lives on the UI thread and stays smooth even while the list renders. Consistent with MVVM, the `animatedStyle` is born in the ViewModel — the View only applies it.

### A trade-off taken on purpose

Modal and BottomSheet are globals driven by a store: any ViewModel opens any content with no prop drilling and no local state. The price is losing type safety on that content's props, since what travels is a `ReactNode`. At this app's size the trade paid off, but on a larger project I'd type the possible contents through a discriminated union instead of accepting any node.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) 18 or higher
- [Yarn](https://yarnpkg.com/) or npm
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) (iOS on macOS only)

### Backend

The app consumes the official challenge REST API, maintained by Rocketseat:

**[rocketseat-education/marketplace-backend](https://github.com/rocketseat-education/marketplace-backend)**

Start the backend before the app, following the instructions in that repository. By default the API runs on port `3001`.

### Installation

```bash
git clone https://github.com/EnzoFelyx/marketplace-app.git
cd marketplace-app
yarn
cp .env.example .env.local
```

`.env.local` defines the API address:

```bash
# API on the same machine
EXPO_PUBLIC_API_URL=http://localhost:3001

# Physical device or API on another machine in the network
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3001
```

The variable is required — without it, [marketplace.ts](src/shared/api/marketplace.ts) fails on startup with a message explaining what to configure.

### Running

```bash
yarn start     # development server
yarn android   # run on Android
yarn ios       # run on iOS (macOS only)
yarn web       # run on the web
```

## Architecture in Detail

### The MVVM triad

Every screen in `src/viewModels/` follows the same split. The `src/app/` folder is reserved for routing.

| File | Role |
|------|------|
| `index.tsx` | Container — instantiates the ViewModel and forwards its return to the View |
| `*.view.tsx` | Pure View — only JSX and NativeWind classes |
| `use*.viewModel.ts` | ViewModel — state, queries, stores, handlers, and formatting |

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
}) => { /* presentation only */ }
```

Expo Router routes are shells wiring the pair together — including when there's a param:

```tsx
// src/app/(private)/product/[id].tsx
export default function Product() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const viewModel = useProductViewModel(Number(id))

    return <ProductView {...viewModel} />
}
```

The pattern also applies to shared components carrying their own logic, such as `PriceText` (currency formatting) and `Input` (password visibility and focus).

### Infinite scroll with filters in the query key

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

Because `filters` is part of the query key, changing the search term or a filter creates a new cache entry automatically — and going back to a previous filter reuses what was already fetched, with no new request. The `flatMap` over `data.pages` yields a flat list for the `FlatList`.

### The three pillars together

The Home ViewModel combines client state, debouncing, and the infinite query, returning only ready-to-render props:

```ts
// src/viewModels/Home/useHome.viewModel.ts
export const useHomeViewModel = () => {
    const { appliedFilterState } = useFilterStore()          // Zustand
    const [searchInputText, setSearchInputText] = useState("")
    const currentSearchText = useDebounce(searchInputText)   // shared hook

    const { products, fetchNextPage, hasNextPage, isFetchingNextPage,
            isLoading, isRefetching, refetch } = useProductInfiniteQuery({
        filters: { ...appliedFilterState, searchText: currentSearchText }
    })                                                       // React Query

    const isInitialLoading = isLoading && !isRefetching

    return { products, handleEndReached, handleRefresh, isInitialLoading, /* ... */ }
}
```

### Credit card with 3D flip

The card flips when the user focuses the CVV field and flips back on blur. The ViewModel derives the trigger from a single boolean (`isFlipped = focusedField === "cvv"`) and returns both animated styles:

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

Both faces are overlapping `Animated.View`s in `position: "absolute"` with `backfaceVisibility: "hidden"`, rotating through ranges offset by 180° from the same shared value — hence the illusion of a single card spinning on the Y axis. Front and back are filled in real time by react-hook-form's `watch()`, and the focused field is highlighted while the user types.

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

The hook powers a generic `Skeleton` component that animates whatever is passed as children. `ProductCardSkeleton` only describes the card silhouette, and Home swaps the list for the placeholder grid while loading:

```tsx
// src/viewModels/Home/Home.view.tsx
ListEmptyComponent={isInitialLoading ? <ProductCardSkeletonList /> : null}
```

Since `isInitialLoading` is `isLoading && !isRefetching`, the skeleton only shows on the first load — pull-to-refresh uses the native `RefreshControl` and keeps the list visible.

<details>
<summary><b>Persisted session and route protection</b></summary>

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

With the session persisted, protecting a route is a store read in the group layout:

```tsx
// src/app/(private)/_layout.tsx
const { user, token } = useUserStore()

if (!user || !token) {
    return <Redirect href={"/(public)/login"} />
}
```

</details>

<details>
<summary><b>Store access outside React</b></summary>

The Axios interceptor is not a component, yet it needs to drop the session when the refresh token fails. Zustand exposes `getState()` for that:

```ts
// src/shared/api/marketplace.ts
private async handleUnauthorized() {
    const { logout } = useUserStore.getState()

    delete this.instance.defaults.headers.common["Authorization"]
    logout()
}
```

The same interceptor renews the expired token and retries the original request transparently to the screens.

</details>

<details>
<summary><b>Thin store: calculations in the service</b></summary>

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
<summary><b>Filters: draft separate from applied</b></summary>

`use-filter-store` keeps two states: what the user is editing in the bottom sheet (`FilterState`) and what was actually applied to the list (`appliedFilterState`). Only the latter goes into the query key, so dragging a slider never triggers a request — the search only happens when the user confirms.

</details>

<details>
<summary><b>Global Modal and BottomSheet</b></summary>

Both are rendered once in the tree (`src/app/_layout.tsx` and `src/app/(private)/_layout.tsx`) and receive their content through a store:

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
<summary><b>Cache invalidation and the bridge to Zustand</b></summary>

Submitting an order invalidates the order list, which refetches by itself when the tab is opened:

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

And the auth mutations are the boundary between React Query and Zustand — the server response goes into the persisted store:

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
<summary><b>Shared hooks and styling</b></summary>

| Hook | Description |
|------|-------------|
| `useDebounce` | Delays the propagation of a value (used in search) |
| `useImage` | Orchestrates the choice between camera and gallery |
| `useCamera` / `useGallery` | Capture and selection with `expo-image-picker` |
| `useModal` | Shortcuts for selection and success modals |
| `useSkeletonAnimation` | Pulse animation for skeletons |

Styling uses NativeWind. The palette lives in [colors.ts](src/styles/colors.ts) and is imported by `tailwind.config.js`, keeping a single source of truth for both utility classes and the native props that require a color in JavaScript (icons, `RefreshControl`, tab bar). `Button` and `Input` variants use `tailwind-variants`, and the `@/*` alias points to `src/`.

</details>

## Project Structure

```
src/
├── app/            # Expo Router routes: (public) and (private) groups, tabs and layouts
├── viewModels/     # MVVM screens: Home, Product, Cart, Orders, Profile, Login, Register
├── components/     # Reusable components: Button, Input, Modal, BottomSheet, Skeleton…
├── shared/
│   ├── api/        # Axios client, interceptors, and refresh token
│   ├── queries/    # React Query hooks, grouped by domain
│   ├── services/   # API calls and pure rules
│   ├── store/      # Zustand stores
│   ├── hooks/      # Shared hooks
│   ├── interface/  # Domain and HTTP typings
│   └── utils/      # Utility functions
└── styles/         # Palette and global CSS
```

## Features

- **Authentication** with schema validation and a session persisted in AsyncStorage
- **Automatic refresh token** in the interceptor, retrying the original request and ending the session if the refresh fails
- **Protected routes** with `(public)` and `(private)` groups and store-driven redirects
- **Catalog** with infinite scroll of 10 items per page and pull-to-refresh
- **Debounced search** and **filters** by category and price range
- **Skeleton loading** with an animated pulse during the first load
- **Product details** with average rating and paginated comments
- **Reviews**: create and edit your own, with a star rating
- **Persisted cart**, surviving app restarts
- **Credit card** with a live preview and a 3D flip when the CVV field is focused
- **Orders** with automatic history invalidation after checkout
- **Profile** with password change, phone mask, and avatar from camera or gallery

## Roadmap

Known gaps, in the order I intend to address them:

- **Tests** — the design already isolates logic in hooks and pure functions; the suite is missing. I'd start with `cart.service`, the formatting ViewModels, and the filter flow.
- **CI** — GitHub Actions running type-check and tests on every push.
- **Distributable build** — EAS Build producing an APK for direct download, so nobody has to clone the repo and start a backend just to see the app running.

## Author

**Enzo Felix** — Mobile Developer

[GitHub](https://github.com/EnzoFelyx) · [LinkedIn](https://www.linkedin.com/in/enzofelyx/) · [enzofelyx@gmail.com](mailto:enzofelyx@gmail.com)

---

Developed from a [Rocketseat](https://www.rocketseat.com.br/) challenge.
