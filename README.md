# 🏥 BMI Calculator - Professional Health Tool

A comprehensive Body Mass Index (BMI) calculator with both modern React frontend and Node.js backend implementations. Calculate your BMI, get health insights, and track your progress with a beautiful, responsive interface.

![BMI Calculator Screenshot](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWMGrvO3rT8jMBotUxa1jgAn1XrcU3wnOoA&s)

## ✨ Features

- 🎯 **Accurate BMI Calculation** - Support for both Metric (kg/cm) and Imperial (lbs/in) units  
- 📊 **Health Categories** - Underweight, Normal, Overweight, Obesity classifications  
- 💡 **Personalized Insights** - Health risk assessments and recommendations  
- 📈 **Calculation History** - Track your BMI progress over time  
- 💾 **Data Persistence** - Local storage and file-based data saving  
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
- 🎨 **Modern UI/UX** - Beautiful gradients, animations, and professional design  
- ⚡ **Fast Performance** - Optimized React components and efficient calculations  

## 🚀 Live Demo

🌐 [Live Demo on Render](https://body-mass-index-calculator-gfsq.onrender.com/)

## 🛠️ Technologies Used

### Frontend (React Version)
- **React 18** - Modern React with hooks  
- **TypeScript** - Type-safe development  
- **Tailwind CSS** - Utility-first CSS framework  
- **Lucide React** - Beautiful icons  
- **Vite** - Fast build tool and dev server  

### Backend (Node.js Version)
- **Node.js** - JavaScript runtime  
- **Express.js** - Web application framework  
- **CORS** - Cross-origin resource sharing  
- **File System** - Data persistence  

### Frontend (Vanilla Version)
- **HTML5** - Semantic markup  
- **CSS3** - Modern styling with gradients and animations  
- **JavaScript ES6+** - Modern JavaScript features  

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)  
- npm or yarn package manager  

### Clone the Repository
```bash
git clone https://github.com/yourusername/bmi-calculator.git
cd bmi-calculator
```

### Option 1: React Frontend (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Option 2: Node.js Backend + Vanilla Frontend
```bash
# Install dependencies
npm install

# Start the server
npm start
# or
node server.js

# Access at http://localhost:3000
```

## 🏗️ Project Structure

```
bmi-calculator/
├── 📁 src/                    # React source files
│   ├── App.tsx               # Main React component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── 📁 public/                # Static assets & vanilla frontend
│   ├── index.html            # Vanilla HTML interface
│   ├── styles.css            # Vanilla CSS styles
│   └── script.js             # Vanilla JavaScript logic
├── 📄 server.js              # Node.js/Express backend
├── 📄 package.json           # Dependencies and scripts
├── 📄 tailwind.config.js     # Tailwind configuration
├── 📄 vite.config.ts         # Vite configuration
└── 📄 bmi_data.txt           # Data storage file
```

## 🎯 Usage

### Basic BMI Calculation
1. Select your preferred unit system (Metric or Imperial)  
2. Enter your weight and height  
3. Click "Calculate BMI" to get instant results  
4. View your BMI category and health recommendations  

### Advanced Features
- **History Tracking**: View all your previous calculations  
- **Health Insights**: Get personalized health risk assessments  
- **Ideal Weight**: See your recommended weight range  
- **Data Export**: Download your calculation history  

## 📊 BMI Categories

| BMI Range      | Category      | Health Status              |
|----------------|---------------|----------------------------|
| < 18.5         | Underweight   | May indicate malnutrition |
| 18.5 - 24.9    | Normal weight | Healthy weight range      |
| 25.0 - 29.9    | Overweight    | Increased health risks    |
| ≥ 30.0         | Obesity       | High health risks         |

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom configuration:
```env
PORT=3000
NODE_ENV=development
```

### Tailwind Customization
Modify `tailwind.config.js` to customize the design:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2'
      }
    }
  }
}
```

## 🚀 Deployment (Render)

1. Push your backend to GitHub  
2. Visit [Render](https://render.com) → Create New Web Service  
3. Link your GitHub repo and choose your backend folder  
4. Set build command to `npm install` and start command to `node server.js`  
5. Copy the live backend URL (e.g., `https://body-mass-index-calculator-gfsq.onrender.com`)  
6. In your frontend, set:  
   ```env
   VITE_API_BASE=https://body-mass-index-calculator-gfsq.onrender.com
   ```
7. Rebuild and deploy your frontend (e.g., Netlify or Render Static Site)

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📝 API Documentation

### Calculate BMI
```http
POST /api/calculate-bmi
Content-Type: application/json

{
  "weight": 70,
  "height": 175,
  "isMetric": true
}
```

### Get History
```http
GET /api/bmi-history
```

## 🔮 Future Enhancements

- [ ] User authentication and profiles  
- [ ] BMI trends and charts  
- [ ] Integration with fitness trackers  
- [ ] Multi-language support  
- [ ] Dark mode theme  
- [ ] Progressive Web App (PWA) features  

---

⭐ **Star this repository if you found it helpful!**  
*Made with ❤️ for better health awareness*
