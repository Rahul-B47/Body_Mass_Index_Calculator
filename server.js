import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Java-style BMI Calculator class translated to JavaScript
class BMICalculator {
    static calculateBMI(weight, height, isMetric) {
        let bmi;
        
        if (isMetric) {
            // If using metric system (weight in kg, height in cm)
            bmi = weight / Math.pow(height / 100, 2);
        } else {
            // If using imperial system (weight in pounds, height in inches)
            bmi = (weight * 703) / Math.pow(height, 2);
        }
        
        return bmi;
    }

    static calculateIdealWeight(height, isMetric) {
        let heightInMeters;
        
        if (isMetric) {
            // Height is in centimeters, convert to meters
            heightInMeters = height / 100.0;
        } else {
            // Height is in inches, convert to meters
            heightInMeters = height * 0.0254;
        }
        
        // Formula for ideal weight for medium frame: 22 * (height in meters)^2
        return 22 * Math.pow(heightInMeters, 2);
    }

    static getBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 25) {
            return "Normal weight";
        } else if (bmi < 30) {
            return "Overweight";
        } else {
            return "Obesity";
        }
    }

    static getHealthRisks(bmi) {
        if (bmi < 18.5) {
            return "Your BMI indicates that you are underweight. Health risks may include malnutrition and weakened immune system.";
        } else if (bmi < 25) {
            return "Your BMI indicates that you are within a healthy weight range. Keep up the good work!";
        } else if (bmi < 30) {
            return "Your BMI indicates that you are overweight. Health risks may include high blood pressure, heart disease, and type 2 diabetes.";
        } else {
            return "Your BMI indicates that you are obese. Health risks may include coronary artery disease, stroke, and sleep apnea.";
        }
    }

    static getSuggestion(bmi) {
        if (bmi < 18.5) {
            return "Consider consulting with a healthcare professional to ensure you are getting adequate nutrition.";
        } else if (bmi < 25) {
            return "Continue maintaining a balanced diet and regular exercise routine to stay within a healthy weight range.";
        } else if (bmi < 30) {
            return "Focus on adopting healthier eating habits and increasing physical activity to manage your weight.";
        } else {
            return "It's important to seek medical advice and develop a comprehensive plan to address your weight and overall health.";
        }
    }

    static saveDataToFile(weight, height, bmi, isMetric) {
        const fileName = "bmi_data.txt";
        const weightUnit = isMetric ? "kg" : "lbs";
        const heightUnit = isMetric ? "cm" : "in";
        const timestamp = new Date().toISOString();
        
        const data = `${timestamp} - Weight: ${weight.toFixed(2)} ${weightUnit}, Height: ${height.toFixed(2)} ${heightUnit}, BMI: ${bmi.toFixed(2)}\n`;
        
        try {
            fs.appendFileSync(fileName, data);
            return { success: true, message: `Data saved successfully to ${fileName}` };
        } catch (error) {
            return { success: false, message: `Failed to save data to file: ${error.message}` };
        }
    }
}

// API Routes
app.post('/api/calculate-bmi', (req, res) => {
    try {
        const { weight, height, isMetric } = req.body;

        // Validate input
        if (!weight || !height || weight <= 0 || height <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid weight and height values.'
            });
        }

        // Calculate BMI using Java-style methods
        const bmi = BMICalculator.calculateBMI(weight, height, isMetric);
        const category = BMICalculator.getBMICategory(bmi);
        const idealWeight = BMICalculator.calculateIdealWeight(height, isMetric);
        const healthRisks = BMICalculator.getHealthRisks(bmi);
        const suggestion = BMICalculator.getSuggestion(bmi);

        // Save data to file (like Java version)
        const saveResult = BMICalculator.saveDataToFile(weight, height, bmi, isMetric);

        res.json({
            success: true,
            data: {
                bmi: parseFloat(bmi.toFixed(1)),
                category,
                idealWeight: parseFloat(idealWeight.toFixed(1)),
                healthRisks,
                suggestion,
                saveResult
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error occurred while calculating BMI.'
        });
    }
});

// Get BMI history
app.get('/api/bmi-history', (req, res) => {
    try {
        if (fs.existsSync('bmi_data.txt')) {
            const data = fs.readFileSync('bmi_data.txt', 'utf8');
            const lines = data.trim().split('\n').filter(line => line.length > 0);
            res.json({
                success: true,
                history: lines.reverse() // Show most recent first
            });
        } else {
            res.json({
                success: true,
                history: []
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error reading BMI history.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`BMI Calculator Server running on http://localhost:${PORT}`);
});