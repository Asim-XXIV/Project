# Project Structure

## Frontend (React + TypeScript)

```
frontend/
├── public/
│   ├── assets/
│   │   └── images/
├── src/
│   ├── api/
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   ├── messages.ts
│   │   └── ai.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ...
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ...
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── CustomizationForm.tsx
│   │   │   └── ...
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── ...
│   │   ├── orders/
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   ├── TrackingInfo.tsx
│   │   │   └── ...
│   │   ├── profile/
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── MeasurementForm.tsx
│   │   │   └── ...
│   │   ├── messaging/
│   │   │   ├── ChatBox.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── ...
│   │   ├── admin/
│   │   │   ├── UserManagement.tsx
│   │   │   ├── ProductManagement.tsx
│   │   │   ├── OrderManagement.tsx
│   │   │   └── ...
│   │   └── ai/
│   │       ├── MeasurementAssistant.tsx
│   │       ├── ProductRecommendation.tsx
│   │       ├── TutorialGuide.tsx
│   │       └── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── MessageContext.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useWebSocket.ts
│   │   ├── useAI.ts
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Products/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── Customize.tsx
│   │   ├── Cart/
│   │   │   ├── Cart.tsx
│   │   │   └── Checkout.tsx
│   │   ├── Orders/
│   │   │   ├── OrderHistory.tsx
│   │   │   └── OrderDetail.tsx
│   │   ├── Profile/
│   │   │   ├── UserProfile.tsx
│   │   │   └── Measurements.tsx
│   │   ├── Messages/
│   │   │   └── Chat.tsx
│   │   └── Admin/
│   │       ├── Dashboard.tsx
│   │       ├── Users.tsx
│   │       ├── Products.tsx
│   │       ├── Orders.tsx
│   │       └── Messages.tsx
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   ├── message.service.ts
│   │   ├── ai.service.ts
│   │   └── ...
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── product.types.ts
│   │   ├── order.types.ts
│   │   ├── message.types.ts
│   │   └── ...
│   ├── utils/
│   │   ├── api.ts
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── ...
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .eslintrc.js
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Backend (NestJS + TypeScript)

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── ...
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── middleware/
│   │   ├── pipes/
│   │   └── utils/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── ...
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   ├── roles.guard.ts
│   │   │   │   └── ...
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── ...
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── schemas/
│   │   │   │   └── user.schema.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── ...
│   │   │   └── interfaces/
│   │   │       └── user.interface.ts
│   │   ├── products/
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   ├── schemas/
│   │   │   │   └── product.schema.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-product.dto.ts
│   │   │   │   ├── update-product.dto.ts
│   │   │   │   └── ...
│   │   │   └── interfaces/
│   │   │       └── product.interface.ts
│   │   ├── orders/
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   ├── schemas/
│   │   │   │   └── order.schema.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-order.dto.ts
│   │   │   │   ├── update-order.dto.ts
│   │   │   │   └── ...
│   │   │   └── interfaces/
│   │   │       └── order.interface.ts
│   │   ├── messages/
│   │   │   ├── messages.module.ts
│   │   │   ├── messages.controller.ts
│   │   │   ├── messages.service.ts
│   │   │   ├── messages.gateway.ts
│   │   │   ├── schemas/
│   │   │   │   └── message.schema.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-message.dto.ts
│   │   │   │   └── ...
│   │   │   └── interfaces/
│   │   │       └── message.interface.ts
│   │   └── ai/
│   │       ├── ai.module.ts
│   │       ├── ai.controller.ts
│   │       ├── ai.service.ts
│   │       ├── dto/
│   │       │   ├── measurement-analysis.dto.ts
│   │       │   ├── product-recommendation.dto.ts
│   │       │   └── ...
│   │       └── interfaces/
│   │           └── ai.interface.ts
│   └── database/
│       ├── database.module.ts
│       └── database.service.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```