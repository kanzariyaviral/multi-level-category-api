## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/kanzariyaviral/multi-level-category-api.git
cd multi-level-category-api
```

### **3. Install Dependencies**

```bash
npm install
```

### **4. Configure Environment Variables**
Create a .env file in the root directory with the following content:
```bash
PORT=3000
MONGO_URI=mongodb+srv://admin:rqQFgEKWJaYvRLRD@cluster0.cmnvt.mongodb.net/category
JWT_SECRET=jwt_secret_key
```

### **5. Start the Server**
```bash
npm start
```
The API will be available at http://localhost:5000.

### **Authentication**

#### 1. **Register User**

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "email": "testuser@gmail.com",
  "password": "password123"
}
```
**Response:**

```json
{
  "message": "User registered successfully"
}
```

#### 2. **Login User**

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "testuser@gmail.com",
  "password": "password123"
}
```
**Response:**

```json
{
  "token": "your_jwt_token_here"
}
```

### **Category Management**

#### 1. **Create a New Category**

**POST** `/api/category (Authentication Required)`

**Request Headers:**

```plaintext
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "name": "Electronics",
  "status": "active",
  "parent": "parent_category_id" // optional
}
```
**Response:**

```json
{
  "_id": "category_id",
  "name": "Electronics",
  "status": "active",
  "parent": null
}
```

#### 2. **Get All Categories (Tree Structure)**

**GET** `/api/category (Authentication Required)`

**Response:**

```json
[
  {
    "_id": "parent_category_id",
    "name": "Electronics",
    "status": "active",
    "children": [
      {
        "_id": "child_category_id",
        "name": "Mobile Phones",
        "status": "active",
        "children": []
      }
    ]
  }
]
```

#### 3. **Update Category**

**PUT** `/api/category/:id (Authentication Required)`

**Request Headers:**

```plaintext
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "name": "Updated Category Name"
}

```
**Response:**

```json
{
  "_id": "category_id",
  "name": "Updated Category Name",
  "status": "active"
}
```

#### 4. **Chaneg status**

**PATCH** `/api/category/:id?status (Authentication Required)`

**Request Headers:**

```plaintext
Authorization: Bearer <your_jwt_token>
```

**Response:**

```json
{
    "message": "Category marked as active"
}
```

#### 5. **Delete Category**

**DELETE** `/api/category/:id (Authentication Required)`

**Response:**

```json
{
  "message": "Category deleted successfully"
}
```
