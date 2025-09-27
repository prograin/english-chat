# ✅ Essential HTTP Status Codes

## 1. Success Codes (2xx)

| Code | Meaning    | When to Use                                                                                           |
| ---- | ---------- | ----------------------------------------------------------------------------------------------------- |
| 200  | OK         | ✅ Success — When a **GET**, **PUT**, or **PATCH** request works fine and returns data.               |
| 201  | Created    | 🆕 Resource Created — When a **new user**, **post**, or **record** is successfully created.           |
| 202  | Accepted   | ⏳ Request Accepted — When the request is **accepted** but **not yet processed** (e.g., async jobs).  |
| 204  | No Content | ✅ Success, No Data — When the request **succeeds** but there’s **nothing to return** (e.g., DELETE). |

---

## 2. Client Error Codes (4xx)

| Code | Meaning              | When to Use                                                                                                      |
| ---- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request          | ❌ Invalid Input — When **required data** is missing or wrong in the request body.                               |
| 401  | Unauthorized         | 🔐 Not Logged In — When **authentication token** is missing or invalid.                                          |
| 403  | Forbidden            | 🚫 No Permission — When the **user is authenticated** but not allowed to access a resource.                      |
| 404  | Not Found            | ❓ Resource Missing — When the **requested user, post, or file** does not exist.                                 |
| 409  | Conflict             | ♻️ Resource Exists — When trying to **create something** that **already exists** (e.g., user exists).            |
| 422  | Unprocessable Entity | 📌 Validation Error — When the request is **well-formed** but **data is invalid** (common with form validation). |
