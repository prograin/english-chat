```css
[Frontend] --> [API Gateway] --> [Auth Service] --> [User Service]
                                  │
                                  └--> [Order Service] --> [Inventory Service]
                                         │
                                         └--> [Payment Service]
[Notification Service] <-- Pub/Sub <-- [Order Service Events]
[Analytics Service]    <-- Pub/Sub <-- [All Services Events]
[Search Service]       <-- Sync/Async <-- [Product Service]
[File/Media Service]   <-- API <-- [Frontend, User Service, etc.]
```

# Scalable App Services Overview

This document outlines the common services in a large, scalable application and their communication patterns.

---

## 1. Authentication & Identity Service

- Handles login, signup, token issuance, OAuth, and user management.
- Communicates with all other services to verify user identity.

---

## 2. User Profile / Account Service

- Manages user data: profile, preferences, settings.
- Often queried by frontend service, notification service, analytics service.

---

## 3. API Gateway / Gateway Service

- Acts as the entry point for clients.
- Routes requests to internal services.
- Handles authentication, rate limiting, and caching.

---

## 4. Core Domain Services

**Depends on your app domain.**

### Example: E-commerce

- **Product / Inventory Service** – manages products, stock levels.
- **Order Service** – handles orders, payments, and fulfillment.
- **Payment Service** – talks to third-party payment providers.
- **Shipping Service** – calculates shipping, updates order status.

### Example: Social Media

- **Post / Feed Service**
- **Comment / Interaction Service**
- **Messaging / Chat Service**

---

## 5. Notification Service

- Sends emails, push notifications, SMS, or in-app notifications.
- Usually subscribes to events from Order Service, Chat Service, or Analytics Service via pub/sub.

---

## 6. Analytics & Reporting Service

- Collects events from multiple services (via Kafka, RabbitMQ, or Kinesis).
- Generates dashboards or aggregates metrics.

---

## 7. Search Service

- Handles full-text search or complex filtering.
- Indexes data from multiple services like Product Service, Order Service, or User Service.

---

## 8. Logging, Monitoring & Observability Services

- Centralized logging service (e.g., ELK stack).
- Metrics & monitoring service (Prometheus/Grafana).
- Alerting service for failures across all services.

---

## 9. Job & Scheduler Service

- Executes background jobs, cron tasks, or periodic processing.
- Can trigger workflows in other services via pub/sub.

---

## 10. File / Media Service

- Handles uploads, storage, and retrieval of files or media.
- Often communicates with frontend, notification, and analytics services.

---

## Communication Patterns

### Synchronous

- HTTP REST, gRPC for direct calls.

### Asynchronous

- Pub/Sub (e.g., Kafka, NATS) for events like `order_created` or `user_registered`.
- Queues (RabbitMQ, SQS) for tasks or retries.
